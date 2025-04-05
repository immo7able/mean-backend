import express from 'express'
import {
    createPost,
    getAllPosts,
    getMyPosts,
    updatePost,
    deletePost,
    toggleLike,
} from '../controllers/post.controller.js'
import { protect } from '../middleware/auth.middleware.js'
import {validateCreatePost, validateUpdatePost} from "../middleware/validate.js";

const router = express.Router()

router.post('/', protect, validateCreatePost, createPost) // Создать пост
router.get('/', getAllPosts) // Получить все посты
router.get('/my', protect, getMyPosts) // Получить посты текущего юзера
router.patch('/:id', protect, validateUpdatePost, updatePost) // Обновить пост (только автор)
router.delete('/:id', protect, deletePost) // Удалить пост (только автор)
router.post('/:id/like', protect, toggleLike) // Лайк/дизлайк

export default router
