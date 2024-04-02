import React from 'react'
import styles from '@/styles/contactUs.module.css'

const AboutUs = () => {
  return (
    <section className={styles.aboutSection}>
      {/* heading  */}
      <div className={styles.heading}>
        <h1>Contact Us</h1>
      </div>

      {/* image  */}
      <div className={styles.image}>
        <p className={styles.slogan}><span>We are sit here for your help</span></p>
      </div>

      {/* information  */}
      <div className={styles.informationContainer}>
        {/* shop info  */}
        <div className={styles.shopInfo}>
          {/* timing  */}
          <div className={styles.shopTiming}>
            <h3>Customer Support</h3>
            <span>Call : 7728902902, 9351773617, 9461771531</span>
            <span>Email : 8:30 PM</span>
            <span>Timing : 10 Am - 8 pm</span>
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