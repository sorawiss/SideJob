import multer from "multer"
import express from 'express'
import { storage } from '../utils/cloudinary.js'


const router = express.Router()
const upload = multer({ storage })

// Multer Upload
router.post('/upload', upload.array('images', 10), async (req, res) => {
    try {
      const files = req.files
      const fileName = files.map((file) => file.path)
      res.status(200).json(fileName)
    }
    catch (err) {
      res.status(500).json({ message: 'Error in /upload', error: err.message })
    }
  })


export default router;