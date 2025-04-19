import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import User from "../models/User.model.js";
import jwt from "jsonwebtoken";

export const updateAvatar = asyncHandler(async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) throw new ApiError(401, 'Access token required')

    try {
        const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
        const user = await User.findById(decoded.userId)
        if (!user) throw new ApiError(404, 'User not found')

        const { avatarUrl } = req.body
        if (!avatarUrl) throw new ApiError(400, 'No avatar URL provided')

        user.avatarUrl = avatarUrl
        await user.save()

        res.json({ message: 'Avatar updated successfully', avatarUrl: user.avatarUrl })
    } catch (error) {
        throw new ApiError(error.statusCode, error.message)
    }
})

export const deleteAvatar = asyncHandler(async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) throw new ApiError(401, 'Access token required')

    try {
        const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
        const user = await User.findById(decoded.userId)
        if (!user) throw new ApiError(404, 'User not found')

        user.avatarUrl = null
        await user.save()

        res.json({ message: 'Avatar removed successfully' })
    } catch (error) {
        throw new ApiError(error.statusCode, error.message)
    }
})