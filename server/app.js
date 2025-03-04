// Libraries Import
import express from "express"
import "dotenv/config"
import cors from "cors"
import cookieParser from "cookie-parser"




// Essential Variable Declaration
var app = express()
app.use(express.json())
app.use(cors())
app.use(cookieParser())


// Routes Import
import authRoute from './routes/auth.js'


// Routes Activation
app.use(authRoute)







app.listen(3333, function () {
  console.log('CORS-enabled web server listening on port 3333')
})