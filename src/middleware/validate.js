import Joi from 'joi'
import ApiError from '../utils/ApiError.js'

const registerSchema = Joi.object({
  username: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required()
    .error(new ApiError(400, 'Username must be 3-30 alphanumeric characters')),

  email: Joi.string()
    .email()
    .required()
    .error(new ApiError(400, 'Valid email is required')),

  password: Joi.string()
    .min(6)
    .pattern(new RegExp('^[a-zA-Z0-9]{6,30}$'))
    .required()
    .error(new ApiError(400, 'Password must be 6-30 characters')),

  phoneNumber: Joi.string()
      .pattern(new RegExp('^\\+?[0-9]{10,15}$'))
      .required()
      .error(new ApiError(400, 'Invalid phone number format')),
})

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
})

export const validateRegistration = (req, res, next) => {
  const { error } = registerSchema.validate(req.body)
  if (error) return next(error)
  next()
}

export const validateLogin = (req, res, next) => {
  const { error } = loginSchema.validate(req.body)
  if (error) return next(error)
  next()
}

const motorcycleSchema = {
  description: Joi.string().required(),
  price: Joi.number().required(),
  brand: Joi.string().required(),
  model: Joi.string().required(),
  year: Joi.number().integer().min(1900).max(new Date().getFullYear()).required(),
  engineVolume: Joi.number().required(),
  mileage: Joi.number().required(),
  images: Joi.array().items(Joi.string().uri()).required(),
  city: Joi.string().required(),
  isSold: Joi.boolean()
}

const createMotorcycleSchema = Joi.object(motorcycleSchema)

const updateMotorcycleSchema = Joi.object({
  _id: Joi.any().strip(),
  __v: Joi.any().strip(),
  owner: Joi.any().strip(),
  favorites: Joi.any().strip(),
  createdAt: Joi.any().strip(),
  updatedAt: Joi.any().strip(),
  ...motorcycleSchema,
}).fork(Object.keys(motorcycleSchema), field => field.optional())

export const validateCreateMotorcycle = (req, res, next) => {
  const { error } = createMotorcycleSchema.validate(req.body)
  if (error) return next(new ApiError(400, error.message))
  next()
}

export const validateUpdateMotorcycle = (req, res, next) => {
  const { error } = updateMotorcycleSchema.validate(req.body)
  if (error) return next(new ApiError(400, error.message))
  next()
}

const brandSchema = Joi.object({
  name: Joi.string().min(1).max(50).required()
})

const modelSchema = Joi.object({
  name: Joi.string().min(1).max(50).required(),
  brand: Joi.string().required()
})

export const validateBrand = (req, res, next) => {
  const { error } = brandSchema.validate(req.body)
  if (error) return next(new ApiError(400, error.message))
  next()
}

export const validateModel = (req, res, next) => {
  const { error } = modelSchema.validate(req.body)
  if (error) return next(new ApiError(400, error.message))
  next()
}

