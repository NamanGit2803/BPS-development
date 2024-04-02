import { useRouter } from 'next/router'
import React from 'react'
import styles from '@/styles/productPage.module.css'
import mongoose from "mongoose";
import Product from "@/models/Product"
import Error from 'next/error'
import { useEffect } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

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
          <div className={styles.productImg}>

            {/* slider  */}
            <Carousel>
              <div>
                <img src={product.img} alt='img' height={10} width={10} />
              </div>
              <div>
                <img src={product.img} alt='img' height={10} width={10} />
              </div>
              <div>
                <img src={product.img} alt='img' height={10} width={10} />
              </div>
            </Carousel>
          </div>
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
                  <div>Price : ₹{product.price}</div>
                  {product.size2 && <div>Price2 : ₹{product.price2}</div>}
                </div>
                {/* item-size  */}
                <div className={styles.productInfo}>
                  <div>Size : {product.size}</div>
                  {product.size2 && <div>Size2 : {product.size2}</div>}
                </div>
              </div>
            </div>

            {/* item-description  */}
            <div className={styles.productDesc}>
              <h4>Description :</h4>
              {product.desc && <div>{product.desc}</div>}
            </div>

            {/* add-to-cart button for laptop  */}
            <div className={styles.addtoCartBtn}>
              {/* for single size  */}
              <button disabled onClick={(e) => {
                e.preventDefault()
                addToCart(product.id, 1, product.title, product.price, product.size, product.img)
              }}>ADD {product.size2 && product.size}</button>
              {/* for multiple size  */}
              {product.size2 && <button  disabled onClick={(e) => {
                e.preventDefault()
                addToCart(product.id, 1, product.title, 0, 0, product.img, product.price2, product.size2, product.id2)
              }}>ADD {product.size2}</button>}
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
