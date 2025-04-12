// Libraries Import
import express from "express"
import "dotenv/config"
import cors from "cors"
import cookieParser from "cookie-parser"
import path from 'path'



// Essential Variable Declaration
var app = express()
app.use(express.json())
app.use(cookieParser())


// Cors
const allowedOrigins = process.env.ORIGIN || "http://localhost:5173"
const corsOptions = {
  origin: allowedOrigins,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use('/upload', express.static(path.resolve('./upload')))



// Routes Import
import authRoute from './routes/auth.js'
import postRoute from './routes/post.js'
import InPostRoute from './routes/inPost.js'
import profileRoute from './routes/profile.js'
import reviewRoute from './routes/review.js'
import multerRoute from './routes/multer.js'




// Routes Activation
app.use(authRoute)
app.use(postRoute)
app.use(InPostRoute)
app.use(profileRoute)
app.use(reviewRoute)
app.use(multerRoute)




const port = process.env.PORT || 8080;

app.listen(port, function () {
  console.log('CORS-enabled web server listening on port 8080')
})