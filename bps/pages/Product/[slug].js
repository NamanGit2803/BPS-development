import { useRouter } from 'next/router'
import React from 'react'
import styles from '@/styles/productPage.module.css'
import mongoose from "mongoose";
import Product from "@/models/Product"
import Error from 'next/error'
import { useEffect } from 'react';

const Post = ({ addToCart, product, error }) => {

  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {

  }, [])

  if (error == 404) {
    return <Error statusCode={404} />
  }


  return (
    <>
      <section className={styles.productPage}>
        {/* image-section  */}
        <div className={styles.productImgSection}>
          {/* image */}
          <div className={styles.productImg}><img src={product.img} alt='img' height={100} width={100} /></div>
        </div>

        {/* product-detail-section  */}
        <div className={styles.detailsConatiner}>
          <div className={styles.productDetails}>
            {/* item-title  */}
            <h1>{product.title}</h1>
            <div className={styles.centerLine}></div>
            <div className={styles.itemContainer}>
              <div className={styles.priceAndSize}>
                {/* item-price  */}
                <div className={styles.productInfo}>
                  Price : ₹{product.price}
                </div>
                {/* item-size  */}
                <div className={styles.productInfo}>
                  Size : {product.size}
                </div>
              </div>
              {/* button for mobile  */}
              <div className={styles.addtoCartBtnM}>
                <button onClick={(e) => {
                  e.preventDefault()
                  addToCart(product.id, 1, product.title, product.price, product.size, product.img)
                }}>ADD</button>
              </div>
            </div>

            {/* item-description  */}
            <div className={styles.productDesc}>
              <h4>Description :</h4>
              {product.desc && <div>{product.desc}</div>}
            </div>

            {/* add-to-cart button for laptop  */}
            <div className={styles.addtoCartBtn}>
              <button onClick={(e) => {
                e.preventDefault()
                addToCart(product.id, 1, product.title, product.price, product.size, product.img)
              }}>ADD</button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export async function getServerSideProps(context) {
  let error = null;
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONG0_URI)
  }

  let product = await Product.findOne({ slug: context.query.slug })

  if (product == null) {
    return {
      props: { error: 404 }
    }
  }
  return {
    props: { error: error, product: JSON.parse(JSON.stringify(product)) }
  }
}

export default Post

