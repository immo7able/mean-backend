import User from '../models/user.model.js'
import { generateAccessToken, generateRefreshToken } from '../config/jwt.js'
import ApiError from '../utils/ApiError.js'
import asyncHandler from '../utils/asyncHandler.js'
import jwt from "jsonwebtoken";

export const register = asyncHandler(async (req, res) => {
  const { username, email, password, phoneNumber} = req.body

  const existingUser = await User.findOne({ $or: [{ email }, { username }] })
  if (existingUser) {
    throw new ApiError(400, 'User already exists')
  }

  const user = await User.create({
    username,
    email,
    password,
    phoneNumber,
    role: 'user',
  })

  const accessToken = generateAccessToken(user._id)
  const refreshToken = generateRefreshToken(user._id)

  user.refreshToken = refreshToken
  await user.save()

  res.status(201).json({
    _id: user._id,
    username: user.username,
    email: user.email,
    phoneNumber: user.phoneNumber,
    role: user.role,
    accessToken,
    refreshToken,
  })
})

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })
  if (!user || !(await user.comparePassword(password))) {
    throw new ApiError(401, 'Invalid credentials')
  }

  const accessToken = generateAccessToken(user._id)
  const refreshToken = generateRefreshToken(user._id)

  user.refreshToken = refreshToken
  await user.save()

  res.json({
    _id: user._id,
    username: user.username,
    email: user.email,
    accessToken,
    refreshToken,
  })
})


export const refreshToken = asyncHandler(async (req, res) => {
  const { refreshToken } = req.body
  if (!refreshToken) throw new ApiError(401, 'Refresh token required')

  const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET)
  const user = await User.findById(decoded.userId)

  if (!user || user.refreshToken !== refreshToken) {
    throw new ApiError(401, 'Invalid refresh token')
  }

  const newAccessToken = generateAccessToken(user._id)
  res.json({ accessToken: newAccessToken })
})

export const profile = asyncHandler(async (req, res) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1]

  if (!token) {
    throw new ApiError(401, 'Access token required')
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET)

    const user = await User.findById(decoded.userId)
    if (!user) {
      throw new ApiError(404, 'User not found')
    }

    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      avatarUrl: user.avatarUrl,
    })

  } catch (error) {
    throw new ApiError(error.statusCode, error.message)
  }
})