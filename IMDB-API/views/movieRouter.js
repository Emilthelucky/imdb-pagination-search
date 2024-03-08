import express from 'express'
import { createMovie, SortingMovies } from '../controllers/movieController.js'

const movieRouter = express.Router()

movieRouter.post("/create", createMovie)
movieRouter.get("/sort", SortingMovies)

export default movieRouter