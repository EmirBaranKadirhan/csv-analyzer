import express from "express"
import authMiddleware from "../middleware/authMiddleware"
const router = express.Router()
import { uploadCSV, getHistory, deleteHistory } from "../controllers/csvController"
import upload from "../config/multer"


router.post('/upload', authMiddleware, upload.single('file'), uploadCSV) // upload.single ==> dosyayi al, req.file'a koy, controller'da da bunu kullan

router.get('/history', authMiddleware, getHistory)

router.delete('/history/:id', authMiddleware, deleteHistory)

export default router