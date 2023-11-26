import Order from "@/models/Order"
import connectDb from "@/middleware/mongoose"
import Product from "@/models/Product";

const https = require('https');
const PaytmChecksum = require('paytmchecksum');


const handler = async (req, res) => {
    if (req.method == 'POST') {

        // check details are valid
        if (req.body.phone.length !== 10) {
            res.status(200).json({ success: false, "error": "Please enter valid phone number." })
            return
        }


        //Check if the cart is tempored
        let cart = req.body.cart;
        let product, topProduct, sumTotal = 0;
        if (req.body.subTotal <= 0) {
            res.status(200).json({ success: false, "error": "Your cart is empty. Please build your cart and try again." })
            return
        }

        for (let item in cart) {
            // product = await Product.findOne({ id: item })
            topProduct = await Product.findOne({ id: item })
            sumTotal += cart[item].price * cart[item].qty
            if (topProduct.price != cart[item].price) {
                res.status(200).json({ success: false, "error": "The price of some items in your cart have changed. Please try again." })
                return
            }
            // if(product.price != cart[item].price){
            //     res.status(200).json({success: false, "error": "The price of some items in your cart have changed. Please try again."})
            //     return
            // }
        }
        if (sumTotal !== req.body.subTotal) {
            res.status(200).json({ success: false, "error": "The price of some items in your cart have changed. Please try again." })
            return
        }

        if(req.body.payMode == 'cod'){
            let order = new Order({
                name: req.body.name,
                email: req.body.email,
                orderId: req.body.oid,
                paymentMode: 'Cash On Delivery',
                address: req.body.address,
                amount: req.body.subTotal,
                products: req.body.cart,
                orderDate: req.body.orderdate,
                status: 'Pending'
            })
    
            await order.save();

            res.status(200).json({success: 'COD order placed', oid: req.body.oid})
        }



        // initiate an order corresponding to this order id 
        let order = new Order({
            name: req.body.name,
            email: req.body.email,
            orderId: req.body.oid,
            address: req.body.address,
            amount: req.body.subTotal,
            products: req.body.cart,
            orderDate: req.body.orderdate
        })

        await order.save();


        var paytmParams = {};

        paytmParams.body = {
            "requestType": "Payment",
            "mid": process.env.NEXT_PUBLIC_PAYTM_MID,
            "websiteName": "Baba Provision Store",
            "orderId": req.body.oid,
            "callbackUrl": `${process.env.NEXT_PUBLIC_HOST}/api/posttransaction`,
            "txnAmount": {
                "value": req.body.subTotal,
                "currency": "INR",
            },
            "userInfo": {
                "custId": req.body.email,
            },
        };

        /*
        * Generate checksum by parameters we have in body
        * Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys 
        */
        const checksum = await PaytmChecksum.generateSignature(JSON.stringify(paytmParams.body), process.env.PAYTM_MKEY)

        paytmParams.head = {
            "signature": checksum
        };

        let post_data = JSON.stringify(paytmParams);

        const requestAsync = () => {
            return new Promise((resolve, reject) => {
                let options = {

                    /* for Staging */
                    // hostname: 'securegw-stage.paytm.in',

                    /* for Production */
                    hostname: 'securegw.paytm.in',

                    port: 443,
                    path: `/theia/api/v1/initiateTransaction?mid=${process.env.NEXT_PUBLIC_PAYTM_MID}&orderId=${req.body.oid}`,
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Content-Length': post_data.length
                    }
                };

                let response = "";
                let post_req = https.request(options, function (post_res) {
                    post_res.on('data', function (chunk) {
                        response += chunk;
                    });

                    post_res.on('end', function () {
                        // console.log('Response: ', response);
                        let ress = JSON.parse(response).body
                        ress.success = true
                        resolve(ress)
                    });
                });

                post_req.write(post_data);
                post_req.end();
            })
        }

        let myr = await requestAsync()
        res.status(200).json(myr, {oid: req.body.oid})



    }
}

export default connectDb(handler);