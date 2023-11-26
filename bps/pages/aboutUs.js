import React from 'react'
import styles from '@/styles/aboutUs.module.css'

const AboutUs = () => {
  return (
    <section className={styles.aboutSection}>
      {/* heading  */}
      <div className={styles.heading}>
        <h1>About Us</h1>
      </div>

      {/* image  */}
      <div className={styles.image}>
        <p className={styles.slogan}><span>BABA PROVISION STORE</span></p>
        <p className={styles.slogan}>Where Value Meets Variety.</p>
      </div>

      {/* information  */}
      <div className={styles.informationContainer}>
        <div className={styles.infoContainer2}>
          <h3>About Baba Provision Store</h3>
          <p><span className={styles.storeName}>Baba Provision Store</span> is providing services <span>since 2005</span>. We are providing best quality at best price and made your trust on us.</p>
          <p><span>BPS</span> is an online grocery supermarket aiming to simplify your daily shopping experience. We bring you the same products you get in your regular supermarket and more with wholesale price at your fingertips.</p>
          <p><span>BPS</span> is an e-commerce, phone-commerce specializing in grocery home deliveries. With a promise of trust and sincerity, we deliver every product you need to maintain your home, through our extensive and wholesome online market. Customers can refill their monthly stores, through an easy onsite shopping or by placing a telephonic order, reducing their efforts and multiplying their choices.</p>
          <p>We believes in providing the highest level of customer service and is continuously innovating to meet customer expectations. Our On-time Delivery is guaranteed for all your order values.Imagine needing something when you are at home and getting it before you have tied your shoelaces to step out. We are revolutionizing e-commerce by making the stuff most important to you.Spare more with BPS! We give you the best quality on the entirety of your grocery needs.</p>
          <p></p>

          <h3>Best quality products for our quality-conscious customers.</h3>
          <p>When it comes to payment, we have made it easy for our customers can pay through payment channel like Paytm or pay Cash on Delivery (COD).The convenience of shopping for home and daily needs, while not compromising on quality, has made BPS.com the online supermarket of choice for our happy customers.</p>
          <p>From grocery to household cleaning products, Apnikirana.com has everything you need for your daily needs. Apnikirana.com is convenience personified. We have taken away all the stress associated with shopping for daily essentials, and you can now order all your household products and even buy groceries online without travelling long distances or standing in serpentine queues.</p>
          <p>you can now shop smarter, faster and more seamlessly within a few clicks. We are sit here for your solution. We are not selling grocery, we are providing services for our customer.</p>
        </div>

        {/* shop info  */}
        <div className={styles.shopInfo}>
          {/* timing  */}
          <div className={styles.shopTiming}>
            <h3>Shop Openning Time</h3>
            <span>Open : 8:30 AM</span>
            <span>Close : 8:30 PM</span>

            <h3>Delivery Time</h3>
            <span>Open : 10:00 AM</span>
            <span>Close : 8:00 PM</span>
          </div>

          {/* address  */}
          <div className={styles.address}>
            <h3>Address</h3>
            <span>Sabji Mandi Road, Pratap Chowk,</span>
            <span>Baran(Rajasthan)</span>
          </div>
        </div>
      </div>



    </section>
  )
}

export default AboutUs