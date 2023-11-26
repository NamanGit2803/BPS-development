import React from 'react'
import styles from '@/styles/catProducts.module.css'
import Image from 'next/image'
import { useRouter } from 'next/router'
import mongoose from "mongoose";
import Product from "@/models/Product"
import { useState, useEffect, useRef } from 'react';

const Products = ({ addToCart, catproduct }) => {

  const router = useRouter();

  const arr = catproduct.map((cat) => { return cat.category2 })
  const subCat = [...new Set(arr)]

  const [productArray, setproductArray] = useState([])
  const [active1, setActive1] = useState(false)
  const [active2, setActive2] = useState(false)
  const [active3, setActive3] = useState(false)
  const [active4, setActive4] = useState(false)
  const [active5, setActive5] = useState(false)
  const [active6, setActive6] = useState(false)
  const [active7, setActive7] = useState(false)
  const [active8, setActive8] = useState(false)
  const [cat2, setCat2] = useState('')

  // useEffect
  useEffect(() => {

    const currntActive = sessionStorage.getItem("location")

    if (currntActive) {
      if (currntActive == "0") {
        const choice = subCat[0]
        setActive1(true)
        setActive2(false)
        setActive3(false)
        setActive4(false)
        setActive5(false)
        setActive6(false)
        setActive7(false)
        setActive8(false)

        async function autoChoose() {
          const data = choice
          const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getCatproduct`, {
            method: "POST", // or 'PUT'
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
          });

          let response = await res.json()
          const subArray = Object.values(response)
          const subArray2 = subArray[0]

          setproductArray(subArray2)
        }
        autoChoose()
      }
      if (currntActive == "1") {
        const choice = subCat[1]
        setActive1(false)
        setActive2(true)
        setActive3(false)
        setActive4(false)
        setActive5(false)
        setActive6(false)
        setActive7(false)
        setActive8(false)

        async function autoChoose() {
          const data = choice
          const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getCatproduct`, {
            method: "POST", // or 'PUT'
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
          });

          let response = await res.json()
          const subArray = Object.values(response)
          const subArray2 = subArray[0]

          setproductArray(subArray2)
        }
        autoChoose()
      }
      if (currntActive == "2") {
        const choice = subCat[2]
        setActive1(false)
        setActive2(false)
        setActive3(true)
        setActive4(false)
        setActive5(false)
        setActive6(false)
        setActive7(false)
        setActive8(false)

        async function autoChoose() {
          const data = choice
          const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getCatproduct`, {
            method: "POST", // or 'PUT'
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
          });

          let response = await res.json()
          const subArray = Object.values(response)
          const subArray2 = subArray[0]

          setproductArray(subArray2)
        }
        autoChoose()
      }
      if (currntActive == "3") {
        setActive1(false)
        setActive2(false)
        setActive3(false)
        setActive4(true)
        setActive5(false)
        setActive6(false)
        setActive7(false)
        setActive8(false)

        async function autoChoose() {
          const data = choice
          const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getCatproduct`, {
            method: "POST", // or 'PUT'
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
          });

          let response = await res.json()
          const subArray = Object.values(response)
          const subArray2 = subArray[0]

          setproductArray(subArray2)
        }
        autoChoose()
      }
      if (currntActive == "4") {
        setActive1(false)
        setActive2(false)
        setActive3(false)
        setActive4(false)
        setActive5(true)
        setActive6(false)
        setActive7(false)
        setActive8(false)

        async function autoChoose() {
          const data = choice
          const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getCatproduct`, {
            method: "POST", // or 'PUT'
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
          });

          let response = await res.json()
          const subArray = Object.values(response)
          const subArray2 = subArray[0]

          setproductArray(subArray2)
        }
        autoChoose()
      }
      if (currntActive == "5") {
        setActive1(false)
        setActive2(false)
        setActive3(false)
        setActive4(false)
        setActive5(false)
        setActive6(true)
        setActive7(false)
        setActive8(false)

        async function autoChoose() {
          const data = choice
          const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getCatproduct`, {
            method: "POST", // or 'PUT'
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
          });

          let response = await res.json()
          const subArray = Object.values(response)
          const subArray2 = subArray[0]

          setproductArray(subArray2)
        }
        autoChoose()
      }
      if (currntActive == "6") {
        setActive1(false)
        setActive2(false)
        setActive3(false)
        setActive4(false)
        setActive5(false)
        setActive6(false)
        setActive7(true)
        setActive8(false)

        async function autoChoose() {
          const data = choice
          const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getCatproduct`, {
            method: "POST", // or 'PUT'
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
          });

          let response = await res.json()
          const subArray = Object.values(response)
          const subArray2 = subArray[0]

          setproductArray(subArray2)
        }
        autoChoose()
      }
      if (currntActive == "7") {
        setActive1(false)
        setActive2(false)
        setActive3(false)
        setActive4(false)
        setActive5(false)
        setActive6(false)
        setActive7(false)
        setActive8(true)

        async function autoChoose() {
          const data = choice
          const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getCatproduct`, {
            method: "POST", // or 'PUT'
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
          });

          let response = await res.json()
          const subArray = Object.values(response)
          const subArray2 = subArray[0]

          setproductArray(subArray2)
        }
        autoChoose()
      }
    }
    else {
      const choice = subCat[0]

      setActive1(true)
      setActive2(false)
      setActive3(false)
      setActive4(false)
      setActive5(false)
      setActive6(false)
      setActive7(false)
      setActive8(false)

      async function autoChoose() {
        const data = choice
        const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getCatproduct`, {
          method: "POST", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data)
        });

        let response = await res.json()
        const subArray = Object.values(response)
        const subArray2 = subArray[0]

        setproductArray(subArray2)
        setCat2(subCat[0])
      }
      autoChoose()
    }
  }, [router.query])


  // change products
  const chooseCat = async (e) => {
    e.preventDefault()
    const choice = e.target.outerText;

    if (e.target.outerText == subCat[0]) {
      setActive1(true)
      setActive2(false)
      setActive3(false)
      setActive4(false)
      setActive5(false)
      setActive6(false)
      setActive7(false)
      setActive8(false)
      setCat2(subCat[0])
      sessionStorage.setItem("location", "0")
    }
    if (e.target.outerText == subCat[1]) {
      setActive1(false)
      setActive2(true)
      setActive3(false)
      setActive4(false)
      setActive5(false)
      setActive6(false)
      setActive7(false)
      setActive8(false)
      setCat2(subCat[1])
      sessionStorage.setItem("location", "1")
    }
    if (e.target.outerText == subCat[2]) {
      setActive1(false)
      setActive2(false)
      setActive3(true)
      setActive4(false)
      setActive5(false)
      setActive6(false)
      setActive7(false)
      setActive8(false)
      setCat2(subCat[2])
      sessionStorage.setItem("location", "2")
    }
    if (e.target.outerText == subCat[3]) {
      setActive1(false)
      setActive2(false)
      setActive3(false)
      setActive4(true)
      setActive5(false)
      setActive6(false)
      setActive7(false)
      setActive8(false)
      setCat2(subCat[3])
      sessionStorage.setItem("location", "3")
    }
    if (e.target.outerText == subCat[4]) {
      setActive1(false)
      setActive2(false)
      setActive3(false)
      setActive4(false)
      setActive5(true)
      setActive6(false)
      setActive7(false)
      setActive8(false)
      setCat2(subCat[4])
      sessionStorage.setItem("location", "4")
    }
    if (e.target.outerText == subCat[5]) {
      setActive1(false)
      setActive2(false)
      setActive3(false)
      setActive4(false)
      setActive5(false)
      setActive6(true)
      setActive7(false)
      setActive8(false)
      setCat2(subCat[5])
      sessionStorage.setItem("location", "5")
    }
    if (e.target.outerText == subCat[6]) {
      setActive1(false)
      setActive2(false)
      setActive3(false)
      setActive4(false)
      setActive5(false)
      setActive6(false)
      setActive7(true)
      setActive8(false)
      setCat2(subCat[6])
      sessionStorage.setItem("location", "6")
    }
    if (e.target.outerText == subCat[7]) {
      setActive1(false)
      setActive2(false)
      setActive3(false)
      setActive4(false)
      setActive5(false)
      setActive6(false)
      setActive7(false)
      setActive8(true)
      setCat2(subCat[7])
      sessionStorage.setItem("location", "7")
    }

    const data = choice;
    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getCatproduct`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    });

    let response = await res.json()
    const subArray = Object.values(response)
    const subArray2 = subArray[0]

    setproductArray(subArray2)
  }


  return (
    <section className={styles.catProductsPage}>
      {/* left part */}
      <div className={styles.catDetails}>
        {/*  subcategories  */}
        {subCat.length >= 1 && <button onClick={chooseCat} disabled={active1} className={styles.subCategory}>{subCat[0]}</button>}
        {subCat.length >= 2 && <button onClick={chooseCat} disabled={active2} className={styles.subCategory}>{subCat[1]}</button>}
        {subCat.length >= 3 && <button onClick={chooseCat} disabled={active3} className={styles.subCategory}>{subCat[2]}</button>}
        {subCat.length >= 4 && <button onClick={chooseCat} disabled={active4} className={styles.subCategory}>{subCat[3]}</button>}
        {subCat.length >= 5 && <button onClick={chooseCat} disabled={active5} className={styles.subCategory}>{subCat[4]}</button>}
        {subCat.length >= 6 && <button onClick={chooseCat} disabled={active6} className={styles.subCategory}>{subCat[5]}</button>}
        {subCat.length >= 7 && <button onClick={chooseCat} disabled={active7} className={styles.subCategory}>{subCat[6]}</button>}
        {subCat.length >= 8 && <button onClick={chooseCat} disabled={active8} className={styles.subCategory}>{subCat[7]}</button>}
      </div>

      {/* right part */}
      <div className={styles.products}>
        <div className={styles.heading}>{cat2}</div>

        {/* product card  */}
        <div className={styles.productCards}>
          {productArray.map((item) => {
            return <div className={styles.topCard}>
              <div className={styles.topCardImg}><img src={item.img} height={150} width={150} alt='Product-Image' /></div>

              <div className={styles.wishlist}><button><Image src={'/whiteheart.png'} height={20} width={20} alt='Heart' /></button></div>

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

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONG0_URI)
  }

  let catproduct = await Product.find({ category1: context.query.slug })
  return {
    props: { catproduct: JSON.parse(JSON.stringify(catproduct)) }
  }
}

export default Products