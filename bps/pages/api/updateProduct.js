import Product from "@/models/Product"
import connectDb from "@/middleware/mongoose"

const handler = async (req, res) => {
    if (req.method == 'POST') {
        try {
            let p = await Product.findOneAndUpdate({ id: req.body.prodId }, {
                title: req.body.data.title,
                slug: req.body.data.slug,
                img: req.body.data.img,
                category1: req.body.data.category1,
                category2: req.body.data.category2,
                topCategory: req.body.data.topCategory,
                size: req.body.data.size,
                availableOty: req.body.data.availableOty,
                price: req.body.data.price,
                desc: req.body.data.desc
            })
        }
        catch (error) {
            res.status(400).json({error: error.message})
        }
        res.status(200).json({ success: "success" })
    }
    else {
        res.status(400).json({ error: "This method is not allowed" })
    }
}

export default connectDb(handler);