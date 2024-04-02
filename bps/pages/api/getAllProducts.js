import Product from "@/models/Product"
import connectDb from "@/middleware/mongoose"

const handler = async (req, res) => {

    if (req.body.title) {
        let products = await Product.find({ title: { $regex: req.body.title, $options: "i" } })
        res.status(200).json({ success: true, products })
    }
    else if (req.body.cat1) {
        let products = await Product.find({ category1: { $regex: req.body.cat1, $options: "i" } })
        res.status(200).json({ success: true, products })
    }
    else if (req.body.cat2) {
        let products = await Product.find({ category2: { $regex: req.body.cat2, $options: "i" } })
        res.status(200).json({ success: true, products })
    }
    else if (req.body.topCat) {
        let products = await Product.find({ topCategory: { $regex: req.body.topCat, $options: "i" } })
        res.status(200).json({ success: true, products })
    }
    else {
        let products = await Product.find()
        res.status(200).json({ success: true, products })
    }
}

export default connectDb(handler);