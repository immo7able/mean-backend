import express from 'express'
import {login, profile, refreshToken, register,} from '../controllers/auth.controller.js'
import {protect} from '../middleware/auth.middleware.js'
import {validateLogin, validateRegistration} from '../middleware/validate.js'

const router = express.Router()

router.post('/register', validateRegistration, register)
router.post('/login', validateLogin, login)
router.post('/refresh-token', refreshToken)
router.get('/profile', profile)
router.get('/protected', protect, (req, res) => {
    res.json({message: 'Protected route accessed successfully'})
})

export default router
