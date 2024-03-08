import { config } from 'dotenv'
import mongoose from "mongoose"
config()

const URI = process.env.MONGO_DB_URI

const dbConnect = () => {
  mongoose.connect(URI, {
    dbName: "mern-app"
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log(err))
}

export default dbConnect