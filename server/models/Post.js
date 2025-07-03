import mongoose from 'mongoose'

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    content: {
        type: String,
        required: true,
        unique: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    cover: {
        type: String,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model('Post', postSchema)