import Product from "@/models/Product"
import connectDb from "@/middleware/mongoose"

const handler = async (req, res) => {

    // generated product id 
    function productId(title1, category2) {
        const date = new Date()

        let splitName = title1.split(' ')
        let first = splitName[0].substr(0, 3)
        let second = splitName[1].substr(0, 3)
        let third = category2.substr(0, 2)

        // time in millisecond
        let entryTime = date.getMilliseconds()
        entryTime = '' + entryTime
        // time in hours
        let entryHours = date.getHours()
        entryHours = '' + entryHours
        // month
        let entryMonth = date.getMonth()
        entryMonth = '' + entryMonth
        // year
        let entryYear = date.getFullYear()
        entryYear = '' + entryYear
        entryYear = entryYear.substr(2)

        let fourth = entryTime + entryHours + entryYear + entryMonth

        let prodID = first + second + third + fourth
        return prodID
    }

    if (req.method == 'POST') {
        try {
            let p = new Product({
                id: productId(req.body.data.title, req.body.data.category2),
                title: req.body.data.title,
                slug: req.body.data.slug,
                img: req.body.data.img,
                category1: req.body.data.category1,
                category2: req.body.data.category2,
                topCategory: req.body.data.topCategory,
                size: req.body.data.size,
                availableQty: req.body.data.availableQty,
                price: req.body.data.price,
                desc: req.body.data.desc
            })
            await p.save();
            res.status(200).json({ success: true })
        }
        catch (error) {
            res.status(400).json({ error: error.message })
        }
    }
    else {
        res.status(400).json({ error: "This method is not allowed" })
    }
}

export default connectDb(handler);