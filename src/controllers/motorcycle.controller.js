import Motorcycle from '../models/motorcycle.model.js'
import ApiError from '../utils/ApiError.js'

export const createMotorcycle = async (req, res, next) => {
    try {
        const motorcycle = await Motorcycle.create({ ...req.body, owner: req.user._id })
        res.status(201).json(motorcycle)
    } catch (error) {
        next(error)
    }
}

export const getAllMotorcycles = async (req, res, next) => {
    try {
        const filters = {}

        if (req.query.brand) filters.brand = req.query.brand
        if (req.query.model) filters.model = req.query.model

        if (req.query.yearMin || req.query.yearMax) {
            filters.year = {}
            if (req.query.yearMin) filters.year.$gte = Number(req.query.yearMin)
            if (req.query.yearMax) filters.year.$lte = Number(req.query.yearMax)
        }

        if (req.query.engineVolumeMin || req.query.engineVolumeMax) {
            filters.engineVolume = {}
            if (req.query.engineVolumeMin) filters.engineVolume.$gte = Number(req.query.engineVolumeMin)
            if (req.query.engineVolumeMax) filters.engineVolume.$lte = Number(req.query.engineVolumeMax)
        }

        if (req.query.mileageMin || req.query.mileageMax) {
            filters.mileage = {}
            if (req.query.mileageMin) filters.mileage.$gte = Number(req.query.mileageMin)
            if (req.query.mileageMax) filters.mileage.$lte = Number(req.query.mileageMax)
        }

        if (req.query.city) filters.city = new RegExp(req.query.city, 'i')

        const motorcycles = await Motorcycle.find(filters)
            .sort({ createdAt: -1 })
            .populate('owner', 'username email')
            .populate('brand')
            .populate('model')

        res.json(motorcycles)
    } catch (error) {
        next(error)
    }
}



export const getMyMotorcycles = async (req, res, next) => {
    try {
        const motorcycles = await Motorcycle.find({ owner: req.user._id }).sort({ createdAt: -1 })
            .populate('brand')
            .populate('model')
            .populate('owner', 'phoneNumber')
        res.json(motorcycles)
    } catch (error) {
        next(error)
    }
}

export const getMotorcycle = async (req, res, next) => {
    try {
        const motorcycle = await Motorcycle.findById(req.params.id)
            .populate('owner', 'phoneNumber')
            .populate('brand')
            .populate('model')
        if (!motorcycle) throw new ApiError(404, 'Motorcycle not found')
        res.json(motorcycle)
    } catch (error) {
        next(error)
    }
}

export const updateMotorcycle = async (req, res, next) => {
    try {
        const motorcycle = await Motorcycle.findById(req.params.id)
        if (!motorcycle) throw new ApiError(404, 'Motorcycle not found')
        if (!motorcycle.owner.equals(req.user._id)) throw new ApiError(403, 'Access denied')

        Object.assign(motorcycle, req.body)
        await motorcycle.save()
        res.json(motorcycle)
    } catch (error) {
        next(error)
    }
}

export const deleteMotorcycle = async (req, res, next) => {
    try {
        const motorcycle = await Motorcycle.findById(req.params.id)
        if (!motorcycle) throw new ApiError(404, 'Motorcycle not found')
        if (!motorcycle.owner.equals(req.user._id)) throw new ApiError(403, 'Access denied')

        await motorcycle.deleteOne()
        res.json({ message: 'Motorcycle deleted successfully' })
    } catch (error) {
        next(error)
    }
}

export const toggleFavorite = async (req, res, next) => {
    try {
        const motorcycle = await Motorcycle.findById(req.params.id)
        if (!motorcycle) throw new ApiError(404, 'Motorcycle not found')

        const userId = req.user._id
        const index = motorcycle.favorites.indexOf(userId)

        if (index === -1) {
            motorcycle.favorites.push(userId)
        } else {
            motorcycle.favorites.splice(index, 1)
        }

        await motorcycle.save()
        res.json(motorcycle)
    } catch (error) {
        next(error)
    }
}
