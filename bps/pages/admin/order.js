import React from 'react'
import styles from '@/styles/order.module.css'
import Order from '@/models/Order'
import { useRouter } from 'next/router'
import mongoose from 'mongoose'
import Error from 'next/error'

const MyOrder = ({ cart, addToCart, removeFromCart, subTotal, DeliveryCharge, order, error }) => {

  if (error == 404) {
    return <Error statusCode={404} />
  }


  return (
    <section className={styles.orderSection}>
      <div className={styles.container}>
        {/* heading  */}
        <div className={styles.heading}>
          <h1>Order Id: {order.orderId}</h1>
        </div>
        {/* order palced message with date  */}
        <div className={styles.placedOrderMsg}>Order has been successfully placed.</div>

        <div className={styles.payStatus}>
          <div>Payment status is: <span className={styles.status}>{order.payStatus}</span></div>
          <div>Order Date: <span>{order.orderDate}</span></div>
        </div>

        {/* order-detail-container  */}
        <div className={styles.orderDetailsContainer}>
          <div className={styles.orderTableHead}>
            <div>Item Description</div>
            <div>Price</div>
            <div>Quantity</div>
            <div>Total</div>
          </div>

          {/* items details  */}
          {Object.keys(order.products).map((k) => {
            return <div className={styles.itemListContainer}>
              {/* image  */}
              <div className={styles.itemImage}>
                <img src={order.products[k].img} alt='' height={40} width={40} />
              </div>

              {/* name and weight */}
              <div className={styles.itemName}>
                <div className={styles.name}>{order.products[k].name}</div>
                <div className={styles.weight}>{order.products[k].size}</div>
              </div>

              {/* price  */}
              <div className={styles.itemQty}>₹{order.products[k].price}</div>

              {/* quantity  */}
              <div className={styles.itemQty}>{order.products[k].qty}</div>

              {/* item-total-price  */}
              <div className={styles.itemTotal}>₹{order.products[k].price * order.products[k].qty}</div>
            </div>
          })}
        </div>

        {/* subtotal  */}
        <div className={styles.totalAmount}>
          {/* info container  */}
          <div className={styles.infoContainer}>
            {/* name  */}
            <div className={styles.email}>
              <h3>Name:</h3>
              <span>{order.name}</span>
            </div>
            {/* email  */}
            <div className={styles.email}>
              <h3>Email:</h3>
              <span>{order.email}</span>
            </div>
            {/* payment mode  */}
            <div className={styles.payMode}>
              <h3>Payment Mode:</h3>
              <span>{order.paymentMode}</span>
            </div>
            {/* address  */}
            <div className={styles.addressContainer}>
              <h3>Delivery Address:</h3>
              <span>{order.address}</span>
            </div>
            {/* delivery status  */}
            <div className={styles.addressContainer}>
              <h3>Delivery Status:</h3>
              <span>{order.status}</span>
            </div>
          </div>

          {/* total amount  */}
          <div className={styles.subtotalContainer}>
            <div className={styles.priceContainer}>
              <div className={styles.price}>SubTotal: <span>₹{order.amount - DeliveryCharge}</span></div>
              <div className={styles.price}>Delivery Charge: <span>₹{DeliveryCharge}</span></div>
            </div>
            <div className={styles.total}>Total: <span>₹{order.amount}</span></div>
          </div>

        </div>
      </div>
    </section>
  )
}


export async function getServerSideProps(context) {
  let error = null;
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONG0_URI)
  }

  let order = await Order.findOne({ orderId: context.query.id })

  if (order == null) {
    return {
      props: { error: 404 }
    }
  }

  return {
    props: { error: error, order: JSON.parse(JSON.stringify(order)) }
  }
}

export default MyOrder