import React from 'react'
import styles from '@/styles/allProduct.module.css'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import AdminSideNav from '@/components/AdminSideNav'

const Orders = () => {

  const router = useRouter()
  const [orders, setOrders] = useState([])
  const [search, setSearch] = useState('')
  const [placeholder, setPlaceholder] = useState('Id')
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
        // fetch all orders
        const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getOrders`, {
          method: "POST", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify()
        });

        let resp = await res.json()
        setOrders(resp.orders.reverse())
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

  // on search by change 
  const handleChange = async (e) => {
    e.preventDefault()

    if (e.target.name == 'search') {
      setSearch(e.target.value)
    }
    else if (e.target.name == 'searchBy') {
      if (e.target.value == 'all') {
        setPlaceholder('Id')
        const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getOrders`, {
          method: "POST", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify()
        });

        let resp = await res.json()
        setOrders(resp.orders.reverse())
        return
      }
      else if (e.target.value == 'Pending') {
        setPlaceholder('Id')
        const pending = 'Pending'
        const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getOrders`, {
          method: "POST", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ pending })
        });

        let resp = await res.json()
        setOrders(resp.orders.reverse())
        return
      }
      else if (e.target.value == 'unshipped') {
        setPlaceholder('Id')
        const unshipped = 'Unshipped'
        const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getOrders`, {
          method: "POST", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ unshipped })
        });

        let resp = await res.json()
        setOrders(resp.orders.reverse())
        return
      }
      else {
        setPlaceholder(e.target.value)
        setSearchBy(e.target.value)
      }
    }
  }

  // on search order
  const searchOrder = async (e) => {
    e.preventDefault()

    if (searchOption.current.value == 'Id') {
      // fetch api 
      const Id = searchInp.current.value
      let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getOrders`, {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Id })
      });

      let res = await a.json()
      setOrders(res.orders.reverse())
      return
    }
    else if (searchOption.current.value == 'Email') {
      // fetch api 
      const email = searchInp.current.value
      let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getOrders`, {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email })
      });

      let res = await a.json()
      setOrders(res.orders.reverse())
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
          <h1>Orders</h1>

          {/* feature  */}
          <div className={styles.findFeature}>
            {/* filter  */}
            <div className={styles.inpDiv}>
              <label htmlFor="category1">Search By:</label>
              <select ref={searchOption} onChange={handleChange} id='searchBy' name='searchBy' className={styles.category}>
                <option defaultValue value="all">All</option>
                <option value="Id">Id</option>
                <option value="Email">Email</option>
                <option value="Pending">Pending</option>
                <option value="unshipped">Unshipped</option>
              </select>
            </div>

            {/* search  */}
            <div className={styles.search}>
              <label htmlFor="search"></label>
              <input ref={searchInp} spellCheck={false} onChange={handleChange} className={styles.inpSearch} value={search} type="search" name='search' placeholder={`Enter Order ${placeholder}`} id='search' />

              {/* button  */}
              <button onClick={searchOrder} >Search</button>
            </div>
          </div>

          {/* Order count  */}
          <div className={styles.productCount}>Total Orders: {orders.length}</div>

          {/* table  */}
          <div className={styles.table}>
            {/* table titles  */}
            <div className={styles.tableTitles}>
              <div className={styles.title}>Id</div>
              <div className={styles.title}>Email</div>
              <div className={styles.title}>Status</div>
              <div className={styles.title}>Price</div>
              <div className={styles.title}>Date</div>
            </div>

            {/* table data  */}
            {orders.map((order) => {
              return <div className={styles.tableData}>
                <div className={styles.data}>{order.orderId}</div>
                <div className={styles.data}>{order.email}</div>
                <div className={styles.data}>{order.status}</div>
                <div className={styles.data}>₹{order.amount}</div>
                <div className={styles.data}>{order.orderDate}</div>
              </div>
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Orders