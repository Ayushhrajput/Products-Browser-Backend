import { connectDB } from "./src/db/index.js";
import app from "./src/app.js";
import dotenv from "dotenv"

dotenv.config({ path: "./.env" })

const PORT = process.env.PORT || 8000

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`server is running on port ${ PORT }`)
    })
})