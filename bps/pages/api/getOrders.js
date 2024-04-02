import Order from "@/models/Order"
import connectDb from "@/middleware/mongoose"

const handler = async (req, res) => {

    if (req.body.delivered) {
        let orders = await Order.find({ status: { $regex: req.body.delivered, $options: "i" } })
        res.status(200).json({ success: true, orders })
    }
    else if(req.body.current){
        let orders = await Order.find({status: 'Initiated'})
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
        let orders = await Order.find({ status: { $regex: req.body.unshipped, $options: "i" }})
        res.status(200).json({ success: true, orders })
    }
    else if (req.body.orderId){
        let orders = await Order.findOneAndUpdate({orderId: req.body.orderId},{status: 'Processing'})
        res.status(200).json({ success: true, orders })
    }
    else if (req.body.orderId2){
        let orders = await Order.findOneAndUpdate({orderId: req.body.orderId2},{status: 'Shipped'})
        res.status(200).json({ success: true, orders })
    }
    else {
        let orders = await Order.find()
        res.status(200).json({ success: true, orders })
    }
}


export default connectDb(handler);