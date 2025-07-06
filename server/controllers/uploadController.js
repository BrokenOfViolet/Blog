import multer from 'multer'
import path from 'path'
import fs from 'fs'

const uploadDir = 'uploads'
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir)
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir)
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname) // 提取文件扩展名
        const filename = Date.now() + ext
        cb(null, filename)
    }
})

export const upload = multer({storage})

export const uploadHandler = (req, res) => {
    if (!req.file) {
        return res.status(400).json({message: 'No file uploaded'})
    }

    const url = `/uploads/${req.file.filename}`
    res.status(200).json({url})
}