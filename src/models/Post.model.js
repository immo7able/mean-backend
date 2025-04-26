import mongoose from 'mongoose'

const postSchema = new mongoose.Schema(
    {
        content: {
            type: String,
            required: true,
            minlength: 1,
            trim: true,
            maxlength: 1000
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        imageUrl: {
            type: String,
            default: null,
        },
        likes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
    },
    {
        timestamps: true, // Автоматически добавит createdAt и updatedAt
    }
)

const Post = mongoose.model('Post', postSchema)
export default Post
