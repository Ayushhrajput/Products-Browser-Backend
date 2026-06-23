import express from "express"
import cors from "cors"

const app = express()

app.use(cors())
app.use(express.json())

import productRoutes from "./routes/product.routes.js"
app.use("/api/products", productRoutes)

export default app