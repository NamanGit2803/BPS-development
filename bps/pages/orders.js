import React from 'react'
import styles from '@/styles/orders.module.css'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'


const Orders = () => {

  const router = useRouter()
  const [orders, setOrders] = useState([])

  useEffect(() => {

    const fetchOrder = async () => {

      if (!localStorage.getItem('token')) {
        router.push('/login')
      }
      else {
        let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/myOrder`, {
          method: "POST", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token: localStorage.getItem('token') })
        });

        let res = await a.json()
        setOrders(res.orders.reverse())
      }
    }

    if (!localStorage.getItem('token')) {
      router.push('/login')
    }
    else {
      fetchOrder()
    }
  }, [router.query])



  return (
    <section className={styles.ordersSection}>
      {/* heading  */}
      <div className={styles.heading}>
        <h1>My Orders</h1>
      </div>

      {/* order does not exist */}
      {orders.length == 0 && <div className={styles.orderNotContainer}>
        <h2>You have not yet placed any order with <span>BPS!</span></h2>
        <button onClick={()=>{router.push('/')}} className={styles.button}>Start Shopping</button>
        </div>}

      {/* container  */}
      {orders.length != 0 && <div className={styles.ordersContainer}>
        {/* orders Title  */}
        <div className={styles.ordersHeading}>
          <div className={styles.headingTitle}>Order Id</div>
          <div className={styles.headingTitle}>Amount</div>
          <div className={styles.headingTitle}>Status</div>
          <div className={styles.headingTitle}>Date</div>
        </div>

        {/* orders display  */}
        <div className={styles.ordersTable}>
          {Object.keys(orders).map((k) => {
            return <Link href={'/order?id=' + orders[k].orderId}>
              <div className={styles.ordersInfo}>
                <div className={styles.orderId}>{orders[k].orderId}</div>
                <div className={styles.orderAmount}>₹{orders[k].amount}</div>
                <div className={styles.orderStatus}>{orders[k].status}</div>
                <div className={styles.allDetails}>{orders[k].orderDate}</div>
              </div>
            </Link>
          })
          }
        </div>
      </div>}
    </section>
  )
}


export default Orders