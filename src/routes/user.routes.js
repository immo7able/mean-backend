import express from "express";
import {deleteAvatar, updateAvatar} from "../controllers/user.controller.js";

const router = express.Router()

router.post('/avatar', updateAvatar)
router.delete('/avatar', deleteAvatar)

export default router