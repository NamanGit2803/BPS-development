import Order from "@/models/Order"
import connectDb from "@/middleware/mongoose"
import Product from "@/models/Product";
const Razorpay = require("razorpay");

const handler = async (req, res) => {
    if (req.method == 'POST') {

        // order id generate
        let oid = Math.floor(Math.random() * Date.now())

        // check details are valid
        if (req.body.phone.length !== 10) {
            res.status(200).json({ success: false, "error": "Please enter valid phone number." })
            return
        }

        // server.on('connection', (socket) => {
        //     console.log('connected')
        //     console.log(socket)
        //     socket.emit('order', 'hi2')
        //     // if (orderCreate && orderCreate == true) {
        //     //     socket.emit('order-create', 'hi')
        //     // }
        // })


        //Check if the cart is tempored
        // let cart = req.body.cart;
        // let product, sumTotal = 0;
        // if (req.body.subTotal <= 0) {
        //     res.status(200).json({ success: false, "error": "Your cart is empty. Please build your cart and try again." })
        //     return
        // }

        // for (let item in cart) {
        //     product = await Product.findOne({ id: item })
        //     if (!product) {
        //         product = await Product.findOne({ id2: item })
        //     }
        //     sumTotal += cart[item].price * cart[item].qty
        //     if (product.price != cart[item].price && product.price2 != cart[item].price) {
        //         res.status(200).json({ success: false, "error": "The price of some items in your cart have changed. Please try again." })
        //         return
        //     }
        // }

        // if (sumTotal !== req.body.subTotal) {
        //     res.status(200).json({ success: false, "error": "The price of some items in your cart have changed. Please try again." })
        //     return
        // }


        if (req.body.payMode == 'cod') {
            let order = new Order({
                name: req.body.name,
                email: req.body.email,
                orderId: oid,
                paymentMode: 'Cash On Delivery',
                address: req.body.address,
                amount: req.body.subTotal,
                products: req.body.cart,
                orderDate: req.body.orderdate
            })
            await order.save();

            res.status(200).json({ success: 'COD order placed', oid })
        }
        else {

            // online payment mode
            const razorpay = new Razorpay({
                key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
                key_secret: process.env.RAZORPAY_SECRET,
            });


            const amount = req.body.subTotal;
            const currency = "INR";
            const options = {
                amount: (amount * 100).toString(),
                currency,
                receipt: oid
            };

            try {
                const response = await razorpay.orders.create(options);

                let order = new Order({
                    name: req.body.name,
                    email: req.body.email,
                    orderId: oid,
                    paymentMode: 'Online',
                    address: req.body.address,
                    amount: req.body.subTotal,
                    products: req.body.cart,
                    orderDate: req.body.orderdate
                })
                await order.save();

                res.status(200).json({
                    success: true,
                    id: response.id,
                    currency: response.currency,
                    amount: response.amount,
                });
            } catch (err) {
                console.log(err);
                res.status(400).json(err);
            }

        }

    }
}

export default connectDb(handler);