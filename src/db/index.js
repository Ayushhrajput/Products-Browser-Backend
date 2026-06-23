import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config({ path: "./.env" })

const connectDB = async () => {
    try {
        await mongoose.connect(`${ process.env.MONGODB_URI }`)

        console.log("db connected")
    } catch (e) {
        console.log(e)
        process.exit(1)
    }

}

export {
    connectDB
}