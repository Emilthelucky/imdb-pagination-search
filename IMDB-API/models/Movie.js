import { Schema } from 'mongoose'
import { model } from 'mongoose'

const movieSchema = Schema({
    name: {
        required: true,
        type: String
    },
    img: {
        required: true,
        type: String
    },
    year: {
        required: true,
        type: Number
    },
    rating: {
        required: true,
        type: Number
    },
    genre: {
        required: true,
        type: [String]
    }
})

const Movie = model("Movies", movieSchema)

export default Movie