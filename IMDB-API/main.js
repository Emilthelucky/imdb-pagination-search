import dbConnect from "./db.js"
import { config } from 'dotenv'
import express from 'express'
import cors from 'cors'
import movieRouter from './views/movieRouter.js'

const app = express()

const PORT = 3000

config()
dbConnect()

//middlewares
app.use(cors())
app.use(express.json())
app.use("/https://imdb-api-alpha.vercel.app/", movieRouter)

app.listen(PORT, console.log("PORT 8080"))