import React from 'react'
import styles from '@/styles/footer.module.css'
import Image from 'next/image'
import Link from 'next/link'

const Footer = () => {
  return (
    <>
      {/* footer section */}
      <footer footer id={styles.footer}>
        {/* footer 1 */}
        <div className={styles.footer1}>
          {/* logo */}
          <div className={styles.namelogo}>
            <div className={styles.nameContent}>
              <Link href={''}><h1>Baba Provision Store</h1></Link>
              <div className={styles.nameDesc}>Lets began a new jaurney with us and continue your shopping from home.</div>
            </div>
          </div>

          {/* all links  */}
          <div className={styles.infoContainer}>
            {/* product */}
            <div className={styles.product}>
              <div className={styles.linkDesc}>
                <h2>PRODUCTS
                  <i className={styles.productI}></i>
                </h2>
                <ul>
                  <li><Link href={''}>Biscuits & Snacks</Link></li>
                  <li><Link href={''}>Dryfruits</Link></li>
                  <li><Link href={''}>Tea & Coffee</Link></li>
                  <li><Link href={''}>Masala</Link></li>
                  <li><Link href={''}>Oils & Ghee</Link></li>
                  <li><Link href={''}>Personal Care</Link></li>
                  <li><Link href={''}>Cleaning & Household</Link></li>
                  <li><Link href={''}>Dal & Rice</Link></li>
                </ul>
              </div>
            </div>

            {/* link  */}
            <div className={styles.quickLinks}>
              <div className={styles.linkDesc}>
                <h2>CUSTOMER SERVICE
                  <i className={styles.linkI}></i>
                </h2>
                <ul>
                  <li><Link href={'/'}>Home</Link></li>
                  <li><Link href={'/aboutUs'}>About Us</Link></li>
                  <li><Link href={'/contactUs'}>Contact Us</Link></li>
                </ul>
              </div>
            </div>

            {/* policy */}
            <div className={styles.policy}>
              <div className={styles.linkDesc}>
                <h2>POLICY
                  <i className={styles.ploicyI}></i>
                </h2>
                <ul>
                  <li><Link href={'/privacyPolicy'}>Privacy Policy</Link></li>
                  <li><Link href={'/returnPolicy'}>Return Policy</Link></li>
                  <li><Link href={'/TandC'}>Terms & Condition</Link></li>
                </ul>
              </div>
            </div>
          </div>


        </div>

        {/* footer 2 */}
        <div className={styles.footer2}>
          Copyright &copy;
        </div>
      </footer >

    </>
  )
}

export default Footer