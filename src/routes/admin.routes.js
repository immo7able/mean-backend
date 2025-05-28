import express from 'express';
import {
    getAllModels, createModel, updateModel, deleteModel,
    getAllBrands, createBrand, updateBrand, deleteBrand, getModelsByBrand
} from '../controllers/admin.controller.js';
import { adminOnly } from '../middleware/auth.middleware.js';
import {validateBrand, validateModel} from "../middleware/validate.js";

const router = express.Router();

router.get('/models', getAllModels);
router.post('/models', adminOnly, validateModel, createModel);
router.patch('/models/:id', adminOnly, validateModel, updateModel);
router.delete('/models/:id', adminOnly, deleteModel);

router.get('/brands', getAllBrands);
router.post('/brands', adminOnly, validateBrand, createBrand);
router.patch('/brands/:id', adminOnly, validateBrand, updateBrand);
router.delete('/brands/:id', adminOnly, deleteBrand);
router.get('/brands/:brandId/models', getModelsByBrand)

export default router;
