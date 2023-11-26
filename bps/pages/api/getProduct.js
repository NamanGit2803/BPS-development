import Product from "@/models/Product"
import connectDb from "@/middleware/mongoose"

const handler = async (req, res) => {

    let products = await Product.findOne({ id: req.body.prodId })
    if (products) {
        res.status(200).json({ success: true, products })
    }
    else {
        res.status(400).json({ error: "Product Not Found" })
    }
}

export default connectDb(handler);