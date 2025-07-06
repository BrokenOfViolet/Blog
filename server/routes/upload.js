import express from 'express'
import {uploadHandler, upload} from '../controllers/uploadController.js'

const router = express.Router()

router.post('/', upload.single('file'), uploadHandler)

export default router