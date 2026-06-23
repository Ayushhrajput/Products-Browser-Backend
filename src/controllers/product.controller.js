import Product from "../models/product.model.js";

const getProducts = async (req, res) => {
    try {
        const {
            category,
            limit = 10,
            lastUpdatedAt,
            lastId      
        } = req.query

        const query = { }

        if(category) query.category = category
        
        if(lastUpdatedAt && lastId) {
            query.$or = [
                {
                    updatedAt: {
                        $lt: new Date(lastUpdatedAt)
                    }
                },
                {
                    updatedAt: new Date(lastUpdatedAt),
                    _id: {
                        $lt: lastId
                    }
                }
            ]
        }
        const products = await Product.find(query)
            .sort({
                updatedAt: -1,
                _id: -1
            })
            .limit(Number(limit))

        let nextCursor = null

        if(products.length > 0) {
            const lastProduct = products[products.length-1]

            nextCursor = {
                lastUpdatedAt:lastProduct.updatedAt,
                lastId: lastProduct._id
            }
        }
        return res.json({
            products,
            nextCursor
        })

    } catch (e) {
        throw new Error(e)
    }
}
export { getProducts }