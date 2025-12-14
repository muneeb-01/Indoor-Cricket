import mongoose from "mongoose"
import { MONGO_URI } from "./env"

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Mongoose connected from app.js")
  })
  .catch((error) => {
    console.log(error)
    console.log("Mongoose connection error")
  })

export default mongoose.connection
