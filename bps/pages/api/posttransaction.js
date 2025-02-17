import Order from "@/models/Order"
import connectDb from "@/middleware/mongoose"


const handler = async (req, res) => {

  // validate paytm checksum


  let order;

  // update status into order table after checking the transaction status
  if (req.body.STATUS == 'TXN_SUCCESS') {
    order = await Order.findOneAndUpdate({ orderId: req.body.ORDERID }, { payStatus: 'Paid', paymentInfo: JSON.stringify(req.body) })
  }
  else if (req.body.STATUS == 'PENDING') {
    order = await Order.findOneAndUpdate({ orderId: req.body.ORDERID }, { payStatus: 'Pending', paymentInfo: JSON.stringify(req.body) })
  }

  //Redirect user to the order confirmation page
  res.redirect('/order?id=' + order._id, 200)


  res.status(200).json({ body: req.body })
}


export default connectDb(handler);