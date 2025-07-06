// 使用 ES Module 语法（注意需在 package.json 设置 "type": "module"）
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

// 引入路由模块
import postRoutes from './routes/post.js'
import userRoutes from './routes/user.js'
import uploadRoutes from './routes/upload.js'

// 加载 .env 文件中的变量（如 MONGO_URL, PORT）
// 只需要加载一次即可，整个Node项目中都可以用process.env了
dotenv.config()

// 创建 Express 应用
const app = express()

// 跨域中间件
app.use(cors())

// 自动解析 JSON 请求体
app.use(express.json())

// 静态资源托管（上传的封面图片）
app.use('/uploads', express.static('uploads'))

// 注册接口路由
app.use('/api/post', postRoutes)
app.use('/api/user', userRoutes)
app.use('/api/upload', uploadRoutes)

// 获取端口号，优先从 .env 中取
const PORT = process.env.PORT || 3000
const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/blog'

// 连接数据库
mongoose.connect(MONGO_URL)
  .then(() => {
    console.log(`[INFO] MongoDB Connected: ${MONGO_URL}`)

    // 启动服务
    app.listen(PORT, () => {
      console.log(`[INFO] Server running at: http://localhost:${PORT}`)
    })
  })
  .catch(err => {
    console.error('[ERROR] MongoDB Connection Failed', err)
  })
