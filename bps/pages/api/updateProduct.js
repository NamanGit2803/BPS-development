import Product from "@/models/Product"
import connectDb from "@/middleware/mongoose"

const handler = async (req, res) => {
    if (req.method == 'POST') {
        if (req.body.data.size2) {
            try {
                let p = await Product.findOneAndUpdate({ id: req.body.prodId }, {
                    title: req.body.data.title,
                    slug: req.body.data.slug,
                    img: req.body.data.url,
                    category1: req.body.data.category1,
                    category2: req.body.data.category2,
                    topCategory: req.body.data.topCategory,
                    size: req.body.data.size,
                    size2: req.body.data.size2,
                    availableOty: req.body.data.availableOty,
                    price: req.body.data.price,
                    price2: req.body.data.price2,
                    desc: req.body.data.desc
                })
                if (p != null) {
                    res.status(200).json({ success: true })
                }
                else {
                    res.status(200).json({ success: false })
                }
            }
            catch (error) {
                res.status(400).json({ error: error.message })
            }

        } else {
            try {
                let p = await Product.findOneAndUpdate({ id: req.body.prodId }, {
                    title: req.body.data.title,
                    slug: req.body.data.slug,
                    img: req.body.data.url,
                    category1: req.body.data.category1,
                    category2: req.body.data.category2,
                    topCategory: req.body.data.topCategory,
                    size: req.body.data.size,
                    availableOty: req.body.data.availableOty,
                    price: req.body.data.price,
                    desc: req.body.data.desc
                })
                if (p != null) {
                    res.status(200).json({ success: true })
                }
                else {
                    res.status(200).json({ success: false })
                }
            }
            catch (error) {
                res.status(400).json({ error: error.message })
            }
        }
    }
    else {
        res.status(400).json({ error: "This method is not allowed" })
    }
}

export default connectDb(handler);