import express from 'express'
import {
    createMotorcycle,
    deleteMotorcycle,
    getAllMotorcycles,
    getMotorcycle,
    getMyMotorcycles,
    toggleFavorite,
    updateMotorcycle
} from '../controllers/motorcycle.controller.js'
import {protect} from '../middleware/auth.middleware.js'
import {validateCreateMotorcycle, validateUpdateMotorcycle} from '../middleware/validate.js'

const router = express.Router()

router.post('/', protect, validateCreateMotorcycle, createMotorcycle)
router.get('/', getAllMotorcycles)
router.get('/my', protect, getMyMotorcycles)
router.get('/:id', getMotorcycle)
router.patch('/:id', protect, validateUpdateMotorcycle, updateMotorcycle)
router.delete('/:id', protect, deleteMotorcycle)
router.patch('/:id/favorite', protect, toggleFavorite)

export default router
