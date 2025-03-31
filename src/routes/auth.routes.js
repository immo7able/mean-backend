import express from 'express'
import {
  register,
  login,
  refreshToken,
} from '../controllers/auth.controller.js'
import { protect } from '../middleware/auth.middleware.js'

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.post('/refresh-token', refreshToken)
router.get('/protected', protect, (req, res) => {
  res.json({ message: 'Protected route accessed successfully' })
})

export default router
