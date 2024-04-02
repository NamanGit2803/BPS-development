import Product from "@/models/Product"
import connectDb from "@/middleware/mongoose"

const handler = async (req, res) => {
    if (req.body.data) {
        let products = await Product.find({ category2: req.body.data })
        res.status(200).json({ products })
    }
    else if(req.body.id){
        let products = await Product.find({ id: req.body.id })
        res.status(200).json({ products })
    }
    else{
        res.status(400).json({ error: "Product Not Found" })
    }
}

export default connectDb(handler);