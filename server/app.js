// Libraries Import
import express from "express"
import "dotenv/config"
import cors from "cors"
import cookieParser from "cookie-parser"
import multer from "multer"




// Essential Variable Declaration
var app = express()
app.use(express.json())
app.use(cookieParser())


// Cors
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));



// Routes Import
import authRoute from './routes/auth.js'
import postRoute from './routes/post.js'
import InPostRoute from './routes/inPost.js'
import profileRoute from './routes/profile.js'
import reviewRoute from './routes/review.js'





// Routes Activation
app.use(authRoute)
app.use(postRoute)
app.use(InPostRoute)
app.use(profileRoute)
app.use(reviewRoute)



// Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../frontend/public/upload')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname)
  }
})

const upload = multer({ storage: storage })

// Multer Upload
app.post('/upload', upload.array('images', 10), async (req, res) => {
  try {
    const files = req.files
    const fileName = files.map((file) => file.filename)
    res.status(200).json(fileName)
  }
  catch (err) {
    res.status(500).json({ message: 'Error in /upload', error: err.message })
  }
})




app.listen(3333, function () {
  console.log('CORS-enabled web server listening on port 3333')
})