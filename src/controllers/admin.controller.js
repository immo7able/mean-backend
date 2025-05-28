import Model from '../models/model.model.js'
import ApiError from '../utils/ApiError.js'
import Brand from '../models/brand.model.js'

export const getAllModels = async (req, res, next) => {
    try {
        const models = await Model.find().populate('brand')
        res.json(models)
    } catch (error) {
        next(error)
    }
}

export const createModel = async (req, res, next) => {
    try {
        const {name, brand} = req.body
        const existingModel = await Model.findOne({$and: [{name}, {brand}]})
        if (existingModel) {
            throw new ApiError(400, 'Model already exists')
        }
        console.log(name, brand)
        const model = await Model.create({name, brand: brand})
        res.status(201).json(model)
    } catch (error) {
        next(error)
    }
}

export const updateModel = async (req, res, next) => {
    try {
        const {name, brand} = req.body
        const existingModel = await Model.findOne({$and: [{name}, {brand}]})
        if (existingModel) {
            throw new ApiError(400, 'Model already exists')
        }
        const model = await Model.findByIdAndUpdate(req.params.id, {name, brand: brand}, {new: true})
        if (!model) throw new ApiError(404, 'Model not found')
        res.json(model)
    } catch (error) {
        next(error)
    }
}

export const deleteModel = async (req, res, next) => {
    try {
        const model = await Model.findByIdAndDelete(req.params.id)
        if (!model) throw new ApiError(404, 'Model not found')
        res.json({message: 'Model deleted successfully'})
    } catch (error) {
        next(error)
    }
}

export const getAllBrands = async (req, res, next) => {
    try {
        const brands = await Brand.find()
        res.json(brands)
    } catch (error) {
        next(error)
    }
}

export const createBrand = async (req, res, next) => {
    try {
        const {name} = req.body
        const existingBrand = await Brand.findOne({name})
        if (existingBrand) {
            throw new ApiError(400, 'Model already exists')
        }
        const brand = await Brand.create({name})
        res.status(201).json(brand)
    } catch (error) {
        next(error)
    }
}

export const updateBrand = async (req, res, next) => {
    try {
        const {name} = req.body
        const existingBrand = await Brand.findOne({name})
        if (existingBrand) {
            throw new ApiError(400, 'Model already exists')
        }
        const brand = await Brand.findByIdAndUpdate(req.params.id, {name}, {new: true})
        if (!brand) throw new ApiError(404, 'Brand not found')
        res.json(brand)
    } catch (error) {
        next(error)
    }
}

export const deleteBrand = async (req, res, next) => {
    try {
        const brand = await Brand.findByIdAndDelete(req.params.id)
        if (!brand) throw new ApiError(404, 'Brand not found')
        res.json({message: 'Brand deleted successfully'})
    } catch (error) {
        next(error)
    }
}

export const getModelsByBrand = async (req, res, next) => {
    try {
        const models = await Model.find({brand: req.params.brandId})
        res.json(models)
    } catch (err) {
        next(err)
    }
}

