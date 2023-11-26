import { useState, useEffect } from 'react'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import AdminNavbar from '@/components/AdminNavbar'
import '@/styles/globals.css'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify'
import LoadingBar from 'react-top-loading-bar'
import Head from 'next/head'

export default function App({ Component, pageProps }) {

  const [cart, setcart] = useState({})
  const [subTotal, setsubTotal] = useState(0)
  const [user, setuser] = useState({ value: null })
  const [key, setkey] = useState(0)
  const [progress, setProgress] = useState(0)
  const router = useRouter()

  // Delivery charge
  const DeliveryCharge = 10;

  useEffect(() => {
    router.events.on('routeChangeStart', () => {
      setProgress(40)
    })

    router.events.on('routeChangeComplete', () => {
      setProgress(100)
    })

    if (router.pathname !== "/catProducts/[slug]") {
      sessionStorage.clear()
    }


    try {
      if (localStorage.getItem("cart")) {
        setcart(JSON.parse(localStorage.getItem("cart")));
        saveCart(JSON.parse(localStorage.getItem("cart")))
      }
      // if(localStorage.getItem("total")){
      //   setsubTotal(JSON.parse(localStorage.getItem("total")))
      // }
    } catch (error) {
      console.error(error);
      localStorage.clear();
    }

    const token = localStorage.getItem('token')
    if (token) {
      setuser({ value: token })
    }

    setkey(Math.random())
  }, [router.query])


  // logout function
  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('name')
    setuser({ value: null })
    setkey(Math.random())
    toast.info(' You have been logout !', {
      position: "top-left",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

    setTimeout(() => {
      router.push('/')
    }, 1500);
  }

  // save item into localstorage method
  const saveCart = (myCart) => {

    localStorage.setItem("cart", JSON.stringify(myCart))

    let subt = 0;
    let keys = Object.keys(myCart);
    for (let i = 0; i < keys.length; i++) {
      subt = subt + myCart[keys[i]].price * myCart[keys[i]].qty;
    }

    setsubTotal(subt);
    // localStorage.setItem("total", subt)
  }


  // add to cart method
  const addToCart = async (itemCode, qty, name, price, size, img) => {
    let newCart = cart;
    if (itemCode in cart) {
      newCart[itemCode].qty = cart[itemCode].qty + qty;
    }
    else {
      newCart[itemCode] = { qty: 1, name, price, size, img };
    }

    setcart(newCart);
    saveCart(newCart);
    toast.success('Item added successfully!', {
      position: "top-left",
      autoClose: 1200,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }

  // remove from cart method 
  const removeFromCart = (itemCode, qty) => {

    let newCart = cart;
    if (itemCode in cart) {
      newCart[itemCode].qty = cart[itemCode].qty - qty;
    }
    if (newCart[itemCode].qty <= 0) {
      delete newCart[itemCode];
    }

    setcart(newCart);
    saveCart(newCart);
  }

  // clear cart function 
  const clearCart = () => {
    setcart({})
    saveCart(setcart)
    setsubTotal(0)
  }


  return <>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1" />
    </Head>
    <LoadingBar
      color='#66bb6a'
      progress={progress}
      waitingTime={300}
      onLoaderFinished={() => setProgress(0)}
    />
    <ToastContainer />

    {/* for user  */}
    {!router.asPath.includes('/admin') && <Navbar user={user} logout={logout} cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} subTotal={subTotal} DeliveryCharge={DeliveryCharge} clearCart={clearCart} />}

    {/* for admin  */}
    {router.asPath.includes('/admin') && <AdminNavbar></AdminNavbar>}

    <Component logout={logout} subTotal={subTotal} cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} DeliveryCharge={DeliveryCharge}  {...pageProps} />

    {/* footer  */}
    <Footer />
  </>
}
