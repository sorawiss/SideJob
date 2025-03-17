// Libraries Import
import express from "express"
import "dotenv/config"
import cors from "cors"
import cookieParser from "cookie-parser"




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


// Routes Activation
app.use(authRoute)







app.listen(3333, function () {
  console.log('CORS-enabled web server listening on port 3333')
})