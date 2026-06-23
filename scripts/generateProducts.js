import { connectDB } from "../src/db/index.js";
import Product from "../src/models/product.model.js";
import dotenv from "dotenv"

dotenv.config()

const categories = [
    "fashion",
    "sports",
    "books",
    "decorations"
]

const generateProducts = async () => {
    try {
        await connectDB()
          
        const BATCH_SIZE = 10000;

        for (let batch = 0; batch < 20; batch++) {
            const products = []

            for (let i = 0; i < BATCH_SIZE; i++) {
                products.push({
                    name: `Product ${i}`,
                    category:
                        categories[
                            Math.floor(Math.random() * categories.length)
                        ],
                    price: Math.floor(Math.random() * 10000)
                })
            }

            await Product.insertMany(products)
        }

        console.log("products inserted")

        process.exit(0)

    } catch (e) {
        console.log(e)
        process.exit(1)
    }
}
generateProducts()