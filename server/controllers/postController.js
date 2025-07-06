import Post from '../models/Post.js'

export const createPost = async(req, res) => {
    try {
        const {title, content, author, cover} = req.body

        if (!title || !content) {
            return res.status(400).json({message: '[WARNING]Title or content is NaN.'})
        }
        
        const newPost = new Post({
            title,
            content,
            cover,
            author: req.user.userId
        })
        
        const savedPost = await newPost.save()
        res.status(201).json(savedPost)
    } catch(err) {
        console.error('[ERROR]Create post failed', err)
        res.status(500).json({message: 'Server error, can not create post'})
    }
}

export const showPosts = async(req, res) => {
    try {
        const posts = await Post.find()
            .populate('author', 'username') // 联表查作者字段
            .sort({createdAt: -1}) // 时间倒序
        res.status(200).json(posts)
    } catch(err) {
        console.log('[ERROR] Get posts fail.', err)
        res.status(500).json({message:'Server Error, can not get posts'})
    }
}

export const editPost = async(req, res) => {

}

export const deletePost = async(req, res) => {

}