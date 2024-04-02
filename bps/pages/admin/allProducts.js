import React from 'react'
import styles from '@/styles/allProduct.module.css'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import AdminSideNav from '@/components/AdminSideNav'
import Link from 'next/link'

const AllProduct = () => {

  const router = useRouter()
  const [products, setProducts] = useState([])
  const [search, setSearch] = useState('')
  const [placeholder, setPlaceholder] = useState('Title')
  const [searchBy, setSearchBy] = useState('')

  const searchInp = useRef()
  const searchOption = useRef()

  useEffect(() => {
    // verify admin 
    const verifyAdmin = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/adminVerify`, {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: localStorage.getItem('token') })
      });

      let response = await res.json()

      if (response.success == true) {
        // fetch all product 
        const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getAllProducts`, {
          method: "POST", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify()
        });

        let resp = await res.json()
        setProducts(resp.products)
        return
      }
      else {
        window.location.replace(`${process.env.NEXT_PUBLIC_HOST}`)
      }
    }

    if (localStorage.getItem('token')) {
      verifyAdmin()
    }
    else {
      router.push('/')
    }
  }, [router.query])

  // on change 
  const handleChange = async (e) => {
    e.preventDefault()

    if (e.target.name == 'search') {
      setSearch(e.target.value)
    }
    else if (e.target.name == 'searchBy') {
      if (e.target.value == 'all') {
        setPlaceholder('Title')
        const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getAllProducts`, {
          method: "POST", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify()
        });

        let resp = await res.json()
        setProducts(resp.products)
        return
      }
      else if (e.target.value == 'Top-Category') {
        // fetch api 
        let topCat = 'yes'
        let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getAllProducts`, {
          method: "POST", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ topCat })
        });

        let res = await a.json()
        setProducts(res.products)
        topCat = 'no'
        return
      }
      else {
        setPlaceholder(e.target.value)
        setSearchBy(e.target.value)
      }
    }
  }

  // search product 
  const searchProd = async (e) => {
    e.preventDefault()

    if (searchOption.current.value == 'Title') {
      // fetch api 
      const title = searchInp.current.value
      let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getAllProducts`, {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title })
      });

      let res = await a.json()
      setProducts(res.products)
      return
    }
    else if (searchOption.current.value == 'Category-1') {
      // fetch api 
      const cat1 = searchInp.current.value
      let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getAllProducts`, {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cat1 })
      });

      let res = await a.json()
      setProducts(res.products)
      return
    }
    else if (searchOption.current.value == 'Category-2') {
      // fetch api 
      const cat2 = searchInp.current.value
      let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getAllProducts`, {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cat2 })
      });

      let res = await a.json()
      setProducts(res.products)
      return
    }
  }


  return (
    <section className={styles.section}>
      {/* side nav  */}
      <div>
        <AdminSideNav></AdminSideNav>
      </div>

      {/* main page  */}
      <div className={styles.div}>
        <div className={styles.container}>
          {/* heading  */}
          <h1>Products</h1>

          {/* feature  */}
          <div className={styles.findFeature}>
            {/* filter  */}
            <div className={styles.inpDiv}>
              <label htmlFor="category1">Search By:</label>
              <select ref={searchOption} onChange={handleChange} id='searchBy' name='searchBy' className={styles.category}>
                <option defaultValue value="all">All</option>
                <option value="Title">Title</option>
                <option value="Category-1">Category-1</option>
                <option value="Category-2">Category-2</option>
                <option value="Top-Category">Top Catecogy</option>
              </select>
            </div>

            {/* search  */}
            <div className={styles.search}>
              <label htmlFor="search"></label>
              <input ref={searchInp} spellCheck={false} onChange={handleChange} className={styles.inpSearch} value={search} type="search" name='search' placeholder={`Enter Product ${placeholder}`} id='search' />

              {/* button  */}
              <button onClick={searchProd} >Search</button>
            </div>
          </div>

          {/* product count  */}
          <div className={styles.productCount}>Total Product: {products.length}</div>

          {/* table  */}
          <div className={styles.table}>
            {/* table titles  */}
            <div className={styles.tableTitles}>
              <div className={styles.title}>Image</div>
              <div className={styles.title}>Title</div>
              <div className={styles.title}>Id</div>
              <div className={styles.title}>Size</div>
              <div className={styles.title}>Price</div>
            </div>

            {/* table data  */}
            {products.map((prod) => {
              return <Link className={styles.tableDataLink} href={`/admin/Product/${prod.slug}`}><div className={styles.tableData}>
                <div className={styles.data}><Image alt='' src={'/Maggi.jpg'} height={50} width={50} /></div>
                <div className={styles.dataName}>{prod.title}</div>
                <div className={styles.data}>{prod.id}</div>
                <div className={styles.data}>{prod.size} {prod.size2 && ','} {prod.size2 &&  prod.size2}</div>
                <div className={styles.data}>₹{prod.price} {prod.price2 && ',  ₹'}{prod.price2 &&  prod.price2}</div>
              </div></Link>
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default AllProduct