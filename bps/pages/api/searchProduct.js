import Product from "@/models/Product"
import connectDb from "@/middleware/mongoose"

const handler = async (req, res) => {
    if (req.body.search1) {
        let products = await Product.find({ category2: {$regex: req.body.search1, $options: "i"} })
        if(products.length != 0){
            res.status(200).json({ success: true, products, category2: products[0].category2 })
        }
        if (products.length == 0) {
            products = await Product.find({ title: { $regex: req.body.search1, $options: "i" } })
            res.status(200).json({ success: true, products })
        }
    }
    else if(req.body.search2){
        let products = await Product.find({ category2: {$regex: `^${req.body.search2}`, $options: "i"} })

        if (products.length == 0) {
            products = await Product.find({ title: { $regex: `^${req.body.search2}`, $options: "iu" } })
        }
        res.status(200).json({ success: true, products })
    }
    else{
        let products = null
        res.status(200).json({ success: true, products})
    }
}

export default connectDb(handler);