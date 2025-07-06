import express from 'express'
import { createPost, showPosts } from '../controllers/postController.js'
import { authMiddleware } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.post('/add', authMiddleware, createPost)    // complete api: [/api/posts/]-app.js
router.get('/show', showPosts)

export default router