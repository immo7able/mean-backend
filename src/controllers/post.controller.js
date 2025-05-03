import Post from '../models/post.model.js'
import ApiError from '../utils/ApiError.js'

// Создание поста (только авторизованные)
export const createPost = async (req, res, next) => {
    try {
        const {content, imageUrl} = req.body
        const post = await Post.create({
            content,
            imageUrl: imageUrl || null,
            author: req.user._id
        })
        res.status(201).json(post)
    } catch (error) {
        next(error)
    }
}

// Получение всех постов (публичный)
export const getAllPosts = async (req, res, next) => {
    try {
        const posts = await Post.find().sort({createdAt: -1}).populate('author', 'username email')
        res.json(posts)
    } catch (error) {
        next(error)
    }
}

// Получение постов текущего пользователя (только авторизованные)
export const getMyPosts = async (req, res, next) => {
    try {
        const posts = await Post.find({author: req.user._id}).sort({createdAt: -1})
        res.json(posts)
    } catch (error) {
        next(error)
    }
}

export const getPost = async (req, res, next) => {
    try {
        const {id} = req.params
        const post = await Post.findById(id)
        if (!post) throw new ApiError(404, 'Post not found')
        res.json(post)
    } catch (error) {
        next(error)
    }
}

// Редактирование поста (только автор)
export const updatePost = async (req, res, next) => {
    try {
        const {id} = req.params
        const {content, imageUrl} = req.body

        const post = await Post.findById(id)
        if (!post) throw new ApiError(404, 'Post not found')

        if (!post.author.equals(req.user._id)) throw new ApiError(403, 'Access denied')

        post.content = content
        if (imageUrl !== undefined) {
            post.imageUrl = imageUrl
        }
        await post.save()

        res.json(post)
    } catch (error) {
        next(error)
    }
}

// Удаление поста (только автор)
export const deletePost = async (req, res, next) => {
    try {
        const {id} = req.params
        const post = await Post.findById(id)
        if (!post) throw new ApiError(404, 'Post not found')

        if (!post.author.equals(req.user._id)) throw new ApiError(403, 'Access denied')

        await post.deleteOne()
        res.json({message: 'Post deleted successfully'})
    } catch (error) {
        next(error)
    }
}

// Переключение лайка (только авторизованные)
export const toggleLike = async (req, res, next) => {
    try {
        const {id} = req.params
        const post = await Post.findById(id)
        if (!post) throw new ApiError(404, 'Post not found')

        const index = post.likes.indexOf(req.user._id)
        if (index === -1) {
            post.likes.push(req.user._id) // Лайк добавляется
        } else {
            post.likes.splice(index, 1) // Лайк удаляется
        }

        await post.save()
        res.json(post)
    } catch (error) {
        next(error)
    }
}
