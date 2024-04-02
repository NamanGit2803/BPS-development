import React from 'react'
import styles from '@/styles/adminOrders.module.css'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import AdminSideNav from '@/components/AdminSideNav'
import Link from 'next/link'
import io from 'socket.io-client'

const socket = io()

const Orders = () => {

  const router = useRouter()
  const [orders, setOrders] = useState([])
  const [search, setSearch] = useState('')
  const [placeholder, setPlaceholder] = useState('Id')

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

        const currentOrdersSearch = localStorage.getItem("ordersSearch")

        if (currentOrdersSearch) {
          if (currentOrdersSearch == '0') {
            setPlaceholder('Id')
            searchOption.current.value = 'current'

            let current = 'current'
            const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getOrders`, {
              method: "POST", // or 'PUT'
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ current })
            });

            let resp = await res.json()
            setOrders(resp.orders)

            return
          }
          else if (currentOrdersSearch == '1') {
            setPlaceholder('Id')
            searchOption.current.value = 'all'

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
          else if (currentOrdersSearch == '2') {
            setPlaceholder('Id')
            searchOption.current.value = 'Delivered'

            const delivered = 'Delivered'
            const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getOrders`, {
              method: "POST", // or 'PUT'
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ delivered })
            });

            let resp = await res.json()
            setOrders(resp.orders.reverse())
            return
          }
          else if (currentOrdersSearch == '3') {
            setPlaceholder('Id')
            searchOption.current.value = 'unshipped'

            const unshipped = 'Processing'
            const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getOrders`, {
              method: "POST", // or 'PUT'
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ unshipped })
            });

            let resp = await res.json()
            setOrders(resp.orders)
            return
          }
          else if (currentOrdersSearch == '4') {
            setPlaceholder('Id')
            searchOption.current.value = 'Shipped'

            const unshipped = 'Shipped'
            const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getOrders`, {
              method: "POST", // or 'PUT'
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ unshipped })
            });

            let resp = await res.json()
            setOrders(resp.orders)
            return
          }
          else if (currentOrdersSearch == '5') {
            setPlaceholder('Id')
            searchOption.current.value = 'Id'

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
          else if (currentOrdersSearch == '6') {
            setPlaceholder('Email')
            searchOption.current.value = 'Email'

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

        } else {
          // fetch all orders
          setPlaceholder('Id')
          let current = 'current'
          const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getOrders`, {
            method: "POST", // or 'PUT'
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ current })
          });

          let resp = await res.json()
          setOrders(resp.orders)
          return
        }
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
      if (e.target.value == 'current') {

        // order call function 
        setPlaceholder('Id')
        setSearch('')

        let current = 'current'
        const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getOrders`, {
          method: "POST", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ current })
        });

        localStorage.setItem("ordersSearch", "0")

        let resp = await res.json()
        setOrders(resp.orders)
        return

      }
      else if (e.target.value == 'all' || e.target.value == 'Id' || e.target.value == 'Email') {
        setPlaceholder(e.target.value)
        setSearch('')

        const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getOrders`, {
          method: "POST", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify()
        });

        if (e.target.value == 'all') {
          localStorage.setItem("ordersSearch", "1")
        }
        else if (e.target.value == 'Id') {
          localStorage.setItem("ordersSearch", "5")
        } else {
          localStorage.setItem("ordersSearch", "6")
        }

        let resp = await res.json()
        setOrders(resp.orders.reverse())
        return
      }
      else if (e.target.value == 'Delivered') {
        setPlaceholder('Id')
        setSearch('')

        const delivered = 'Delivered'
        const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getOrders`, {
          method: "POST", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ delivered })
        });

        localStorage.setItem("ordersSearch", "2")

        let resp = await res.json()
        setOrders(resp.orders.reverse())
        return
      }
      else if (e.target.value == 'unshipped') {
        setPlaceholder('Id')
        setSearch('')

        const unshipped = 'Processing'
        const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getOrders`, {
          method: "POST", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ unshipped })
        });

        localStorage.setItem("ordersSearch", "3")

        let resp = await res.json()
        setOrders(resp.orders)
        return
      }
      else if (e.target.value == 'Shipped') {
        setPlaceholder('Id')
        setSearch('')

        const unshipped = 'Shipped'
        const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getOrders`, {
          method: "POST", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ unshipped })
        });

        localStorage.setItem("ordersSearch", "4")

        let resp = await res.json()
        setOrders(resp.orders)
        return
      }
      else {
        setPlaceholder(e.target.value)
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

  // accept order funct 
  const acceptOrder = (id) => async (e) => {
    e.preventDefault()
    let orderId = id

    // fetch all orders
    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getOrders`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ orderId })
    });

    toast.success('Order has been accepted', {
      position: "top-left",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    setTimeout(() => {
      window.location.reload()
    }, 1500);
  }

  // shipped order 
  const shippedOrder = (id) => async (e) => {
    e.preventDefault()
    let orderId2 = id

    // fetch all orders
    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getOrders`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ orderId2 })
    });

    toast.success('Order has been shipped', {
      position: "top-left",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    setTimeout(() => {
      window.location.reload()
    }, 1500);
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
                <option defaultValue value="current">Current</option>
                <option value="unshipped">Unshipped</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="all">All</option>
                <option value="Id">Id</option>
                <option value="Email">Email</option>
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
              // order id 
              return <div className={styles.tableData}>
                <Link href={'/admin/order?id=' + order.orderId}><div className={styles.data}>{order.orderId}</div></Link>
                {/* email  */}
                <Link href={'/admin/order?id=' + order.orderId}><div className={styles.data}>{order.email}</div></Link>

                {/* status  */}
                <div className={styles.data}>
                  {/* when order not accepted  */}
                  {order.status == 'Initiated' && <button onClick={acceptOrder(order.orderId)} className={styles.orderAcceptBtn}>Accept</button>}

                  {/* when order accepted  */}
                  {order.status != 'Initiated' && order.status != 'Processing' && order.status}

                  {/* when order status is unshipped  */}
                  {order.status == 'Processing' && <button onClick={shippedOrder(order.orderId)} className={styles.orderAcceptBtn}>Shipped</button>}
                </div>

                {/* amount  */}
                <Link href={'/admin/order?id=' + order.orderId}><div className={styles.data}>₹{order.amount}</div></Link>
                {/* date  */}
                <Link href={'/admin/order?id=' + order.orderId}><div className={styles.data}>{order.orderDate}</div></Link>
              </div>
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Orders