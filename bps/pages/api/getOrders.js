import Order from "@/models/Order"
import connectDb from "@/middleware/mongoose"
import jsonwebtoken from "jsonwebtoken"

const handler = async (req, res) => {

    if (req.body.pending) {
        let orders = await Order.find({ status: { $regex: req.body.pending, $options: "i" } })
        res.status(200).json({ success: true, orders })
    }
    else if (req.body.Id) {
        let orders = await Order.find({ orderId: req.body.Id })
        res.status(200).json({ success: true, orders })
    }
    else if (req.body.email) {
        let orders = await Order.find({ email: { $regex: req.body.email, $options: "i" } })
        res.status(200).json({ success: true, orders })
    }
    else if (req.body.unshipped) {
        let orders = await Order.find({ deliveryStatus: { $regex: req.body.unshipped, $options: "i" }})
        res.status(200).json({ success: true, orders })
    }
    else {
        let orders = await Order.find()
        res.status(200).json({ success: true, orders })
    }
}


export default connectDb(handler);