import ApiError from '../utils/ApiError.js'

const errorHandler = (err, req, res, next) => {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    })
  }

  console.error('⚠️ Unexpected error:', err)
  res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  })
}

export default errorHandler
