import dbConnect from "./db.js"
import { config } from 'dotenv'
import express from 'express'
import cors from 'cors'
import movieRouter from './views/movieRouter.js'

// const corsConfig = {
//     origin: "*",
//     credential: true,
//     methods: ["GET", "POST"]
// }

const app = express()

const PORT = 3000

config()
dbConnect()

//middlewares
// app.options("", cors(corsConfig))
app.use(cors())
app.use(express.json())
app.use("/movies", movieRouter)
app.use("/", (req, res) => {
    return res.status(200).json({
        message: "Hello"
    })
})

app.listen(PORT, console.log("PORT 3000"))