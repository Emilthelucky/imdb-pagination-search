import Movie from '../models/Movie.js'
import fs from 'fs'

const SortingMovies = async (req, res) => {
    try {
        const page = parseInt(req.query.page) - 1 || 0
        const limit = req.query.limit || 5
        const search = req.query.search || ""
        
        const total = await Movie.countDocuments({
            name: { $regex: search, $options: "i" },
        })
        
        let totalPages = total / limit
        if(!(totalPages === Math.floor(totalPages))){
            totalPages = Math.floor(totalPages)
            totalPages = totalPages + 1
        }

        const movies = await Movie.find({ name: {$regex: search, $options: "i"} })
            .skip(page * limit)
            .limit(limit)
        if(!movies){
            return res.status(400).json({
                message: "Movies could not find"
            })
        }else{
            return res.status(200).json({
                message: "Success",
                movies,
                totalPages: totalPages
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: error
        })
    }
}

const createMovie = async (req, res) => {
    try {
        console.log(req.body)
        const movie = await Movie.findOne(req.body)
        if(!movie){
            const newMovie = await Movie.create(req.body)
            return res.status(200).json({
                message: "Success",
                newMovie
            })
        }else{
            return res.status(400).json({
                message: "This movie is already exsist"
            })
        } 
    } catch (error) {
        return res.status(500).json({
            message: error
        })
    }
    
}

const rawData = fs.readFileSync('./config/movies.json')
const movies = JSON.parse(rawData)

// INSERT ALL MOVIES FROM MOVIES.JSON

// const insertMovies = async () => {
//     try {
//         const docs = await Movie.insertMany(movies)
//         return Promise.resolve(docs)
//     } catch (err) {
//         return Promise.reject(err)
//     }
// }

// insertMovies()
//     .then((docs) => console.log(docs))
//     .catch((err) => console.log(err))

//DELETE MOVIES

// const deleteMovies = async () => {
//     try {
//         const docs = await Movie.deleteMany({})
//             return Promise.resolve(docs)
//     } catch (err) {
//         return Promise.reject(err)
//     }
// }

// deleteMovies()
//     .then((docs) => console.log(docs))
//     .catch((err) => console.log(err))

export { createMovie, SortingMovies }