import React from 'react'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import styles from '@/styles/products.module.css'
import Image from 'next/image';

const Products = ({ addToCart, products }) => {

  const router = useRouter()

  const [productArray, setProductArray] = useState([])

  useEffect(() => {

    const getProduct = async () => {
      let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getCatproduct`, {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: JSON.parse(localStorage.getItem('search')) })
      });

      let res = await a.json()
      setProductArray(res.products)
    }

    getProduct()

  }, [router.query])


  return (
    <section className={styles.productsSec}>
      <div className={styles.products}>
        <div className={styles.heading}>Search for {router.query.products}</div>

        {/* product card  */}
        <div className={styles.productCards}>
            {/* when product length is zero  */}
            {productArray.length == 0 && <div className={styles.noData}>
              <img src={'/no-data.png'} width={100} height={100} />
              <h1>No Result Found</h1>
            </div>}

            {/* when product exist  */}
            {productArray.length != 0 && productArray.map((item) => { return <div className={styles.topCard}>
                <div className={styles.topCardImg}><img src={item.img} height={150} width={150} alt='Product-Image' /></div>

                {/* <div className={styles.wishlist}><button><Image src={'/whiteheart.png'} height={20} width={20} alt='Heart' /></button></div> */}

                <div className={styles.topProductDetail1}>
                  <div className={styles.topName}>{item.title}</div>
                  <div className={styles.topWeight}>{item.size}</div>
                </div>

                <div className={styles.topProductDetail2}>
                  <div className={styles.topPrice}><span>₹</span>{item.price}</div>
                  <div className={styles.topAdd}>
                    <button onClick={(e) => {
                      e.preventDefault()
                      addToCart(item.id, 1, item.title, item.price, item.size, item.img)
                    }}>ADD</button>
                  </div>
                </div>
              </div>
            })}
        </div>
      </div>
    </section>
  )
}


export default Products