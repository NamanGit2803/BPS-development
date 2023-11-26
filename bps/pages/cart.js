import React from 'react'
import styles from '@/styles/cart.module.css'
import Image from 'next/image'
import Link from 'next/link'

const Cart = ({ cart, addToCart, removeFromCart, subTotal, DeliveryCharge }) => {

  // const DeliveryCharge = 10;
  // const grandTotal = subTotal + DeliveryCharge;


  return (
    <>
      <section className={styles.cartSection}>
        {/* heading  */}
        {Object.keys(cart).length != 0 && <div className={styles.heading}>
          <h1>Shopping Cart</h1>
        </div>}
        {/* show items number  */}
        {Object.keys(cart).length != 0 && <div className={styles.itemsNumber}>
          {Object.keys(cart).length} items in your cart
        </div>}

        {/* when cart is empty  */}
        {Object.keys(cart).length == 0 && <div className={styles.emptyCart}><Image src={'/empty-cart.png'} width={100} height={100} alt='Empty-cart' />
          <div className={styles.firstPara}>Your cart is Empty!</div>
          <div className={styles.secondPara}>Your favourite items are just a click away</div>
          <Link href={'/'}><button>Start Shopping</button></Link>
        </div>}

        {/* when cart is not empty  */}
        {/* container  */}
        {Object.keys(cart).length != 0 && <div className={styles.cartContainer}>
          {/* item-list  */}
          <div className={styles.itemsList}>

            <div className={styles.itemsHeading}>
              <div className={styles.itemHead}>Item</div>
              <div className={styles.itemHead}>Price</div>
              <div className={styles.itemHead}>Quantity</div>
              <div className={styles.itemHead}>Total</div>
            </div>


            {Object.keys(cart).map((k) => {
              return <div className={styles.itemDesc}>
                {/* item-img  */}
                <div className={`${styles.itemImg} ${styles.itemDetail}`}>
                  <img src={cart[k].img} alt='' height={70} width={70} />
                </div>

                <div className={styles.itemDetail1}>
                  {/* item-name  */}
                  <div className={styles.cartItemsName}>
                    {cart[k].name}
                  </div>

                  {/* item-weight */}
                  <div className={styles.cartItemsWeight}>{cart[k].size}
                  </div>
                </div>

                {/* item-price  */}
                <div className={`${styles.cartItemsPrice} ${styles.itemDetail}`}>₹{cart[k].price}
                </div>

                {/* item-qty  */}
                <div className={styles.itemDetail}>
                  <div className={styles.cartItemsQtybtn}>
                    <div onClick={() => { removeFromCart(k, 1) }}><Image src={'/minus2.png'} width={20} height={20} alt='' /></div>

                    <span>{cart[k].qty}</span>

                    <div onClick={() => { addToCart(k, 1, '2 Minute Maggi noodle noodle noodle', 15, 70) }}><Image src={'/plus2.png'} width={20} height={20} alt='' /></div>
                  </div></div>

                {/* item-total  */}
                <div className={`${styles.itemDetail} ${styles.cartItemsPrice}`}>₹{(cart[k].price) * (cart[k].qty)}</div>
              </div>
            })}
          </div>

          {/* summary  */}
          <div className={styles.summary}>
            {/* heading  */}
            <div className={styles.summarryHeading}>
              <h2>Summary</h2>
            </div>

            <div className={styles.subtotalContainer}>
              <div className={styles.calculateContainer}>
                <div className={styles.calPrice}>
                  <span>Subtotal</span>
                  <span>₹{subTotal}</span>
                </div>

                <div className={styles.calPrice}>
                  <span>Delivery Charge</span>
                  <span>₹{DeliveryCharge}</span>
                </div>
              </div>

              <div className={styles.grandTotal}>
                <span>Grand Total</span>
                <span>₹{DeliveryCharge + subTotal}</span>
              </div>

            </div>

            {/* btn  */}
            <div className={styles.checkoutBtn}>
              <Link href={'/checkout'}><button>
                <span className={styles.totalPrice}>
                  ₹{DeliveryCharge + subTotal}<span>Total</span>
                </span>
                <span className={styles.checkout}>Checkout <Image src={'/right-white.png'} height={10} width={10} alt='' /></span>
              </button></Link>
            </div>
          </div>
        </div>}
      </section>
    </>
  )
}

export default Cart