import express from 'express'
import { createPost, getAllPosts } from '../controllers/postController.js'

const router = express.Router()

router.post('/add', createPost)    // complete api: [/api/posts/]-app.js
router.get('/show', getAllPosts)

export default router