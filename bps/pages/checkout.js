import React from 'react'
import styles from '@/styles/checkout.module.css'
import Link from 'next/link'
import Image from 'next/image'
import Head from 'next/head'
import Script from 'next/script'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'



const Checkout = ({ cart, removeFromCart, subTotal, DeliveryCharge }) => {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [disabled, setDisabled] = useState(true)
  const [disabled2, setDisabled2] = useState(true)
  const [city, setcity] = useState('')
  const [changeName, setChangeName] = useState('Change Name')
  const [changePhone, setChangePhone] = useState('')
  const [changeAddress, setChangeAddress] = useState('')
  const [OTP, setOTP] = useState('')
  // const [payMode, setPayMode] = useState('')

  const userName = useRef(0)
  const userMobile = useRef()
  const userAddress = useRef(0)
  const box1 = useRef(0)
  const box2 = useRef(0)
  const box3 = useRef(0)
  const box4 = useRef(0)
  const otpContainer = useRef(0)
  const cod = useRef(0)
  const codButton = useRef(0)

  const router = useRouter()


  // useEffect 
  useEffect(() => {

    const fetchUser = async () => {

      let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getUser`, {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: localStorage.getItem('token') })
      });

      let res = await a.json()
      setEmail(res.user.email)
      setName(res.user.name)
      setPhone(res.user.mobile)
      setAddress(res.user.address)

      if (res.user.address) {
        setChangeAddress('Change Address')
      }
      else {
        setChangeAddress('Add Address')
      }


      if (res.user.mobile) {
        setChangePhone('Change Number')
      }
      else {
        setChangePhone('Add Number')
      }


      if (res.user.address && res.user.mobile) {
        setDisabled(false)
        setDisabled2(false)
      }
      else {
        setDisabled(true)
        setDisabled2(true)
      }
    }


    if (localStorage.getItem('token')) {
      fetchUser()
    }
    else {
      router.push('/login')
    }
  }, [router.query])


  // On change
  const handleChange = (e) => {
    if (e.target.name == 'name') {
      setName(e.target.value)
    }
    else if (e.target.name == 'email') {
      setEmail(e.target.value)
    }
    else if (e.target.name == 'mobile') {
      setPhone(e.target.value)
    }
    else if (e.target.name == 'address') {
      setAddress(e.target.value)
    }
  }

  // load razorpay 
  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      // document.body.appendChild(script);

      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };


  // payment initiate function 
  const initiatePayment = async (e) => {

    e.preventDefault()

    // date generate 
    const month = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const date = new Date();
    const orderdate = date.getDate() + " " + month[date.getMonth()] + " " + date.getFullYear()

    const res = await loadRazorpay();
    if (!res) {
      alert("Razorpay SDK Failed to load");
      toast.error('Razorpay SDK Failed to load!', {
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
        router.push(`${process.env.NEXT_PUBLIC_HOST}order?id=${txnRes.oid}`)
      }, 2000);
      return;
    }


    const data = { cart, subTotal, email: email, name, address, phone, city, orderdate, payMode: e.target.value }
    // get a transaction token 
    let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pretransaction`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    });
    let txnRes = await a.json()


    if (txnRes.success == 'COD order placed') {
      toast.success('Your order has been placed successfully', {
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
        router.push(`${process.env.NEXT_PUBLIC_HOST}order?id=${txnRes.oid}`)
      }, 2000);
    }
    else if (txnRes.success == true) {

      var options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY, // Enter the Key ID generated from the Dashboard
        name: "Baba Provision Store",
        currency: a.currency,
        amount: a.amount,
        order_id: a.id,
        description: "Thankyou for pay",
        image: "https://manuarora.in/logo.png",
        handler: function (response) {
          // Validate payment at server - using webhooks is a better idea.
          alert(response.razorpay_payment_id);
          alert(response.razorpay_order_id);
          alert(response.razorpay_signature);
        },
        prefill: {
          name: "Baba Provision Store",
          email: "njain4282@gmail.com",
          contact: "6350250055",
        },
      }

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();

      // toast.success('Your order has been placed seccessfully', {
      //   position: "top-left",
      //   autoClose: 2000,
      //   hideProgressBar: true,
      //   closeOnClick: true,
      //   pauseOnHover: false,
      //   draggable: true,
      //   progress: undefined,
      //   theme: "light",
      // });
      // setTimeout(() => {
      //   router.push(`${process.env.NEXT_PUBLIC_HOST}order?id=${txnRes.oid}`)
      // }, 2000);
    }
    else {
      console.log(txnRes.error)
      toast.error('Your order has not been placed seccessfully! because you changed cart value.', {
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      // setTimeout(() => {
      //   window.location.reload()
      // }, 2000);
    }
  }

  // update user name 
  const updateName = async () => {

    if (changeName == "Change Name") {
      setChangeName('Update')
      userName.current.style.border = "1px solid #43a047ed"
      userName.current.readOnly = false
    }

    if (changeName == "Update") {
      // fetch update user api  
      const data = userName.current.defaultValue
      let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updateUser`, {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: localStorage.getItem('token'), data })
      });

      toast.success('Your Name has been successfully changed', {
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
      }, 2000);
      setChangeName('Change Name')
      userName.current.style.border = "0px"
      userName.current.readOnly = true
    }
  }

  // update address 
  const updateAddress = async () => {
    if (changeAddress == "Change Address" || changeAddress == "Add Address") {
      setChangeAddress('Update')
      userAddress.current.style.border = "1px solid #43a047ed"
      userAddress.current.readOnly = false
    }
    if (changeAddress == "Update") {
      // fetch update user api  
      const newAddress = userAddress.current.defaultValue
      let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updateUser`, {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: localStorage.getItem('token'), newAddress })
      });

      let response2 = await a.json()

      toast.success('Your address has been successfully changed', {
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
      }, 2000);
      setChangeAddress('Change Address')
      userAddress.current.style.border = "0px"
      userAddress.current.readOnly = true
    }
  }

  // Update mobile number
  const updateMobile = async () => {
    if (changePhone == "Change Number" || changePhone == "Add Number") {
      setChangePhone('Update')
      userMobile.current.style.border = "1px solid #43a047ed"
      userMobile.current.readOnly = false
    }
    if (changePhone == "Update") {
      // otp generate 
      let number = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
      let otp = ''
      for (let i = 0; i < 4; i++) {
        otp = otp + number[Math.floor(Math.random() * 10)]
      }
      setOTP(otp)
      otpContainer.current.style.display = "flex"
      box1.current.select()
    }
  }

  const editPhone = () => {
    otpContainer.current.style.display = "none"
    setChangePhone('Update')
    userMobile.current.style.border = "1px solid #43a047ed"
    userMobile.current.readOnly = false
    userMobile.current.focus()
  }

  // otp function 
  const otpFunct = (e) => {
    if (e.target.value == '') {
      return
    }
    if (e.target.name != 'otpbox4') {
      e.target.nextSibling.select()
    }
  }

  const keyDown = (e) => {
    if (e.key == 'Backspace') {
      e.target.value = ""
      console.log(e)
      if (e.target.previousSibling) {
        e.target.previousSibling.select()
      }
      return
    }
  }

  // otp verify function 
  const otpVerify = async (e) => {

    e.preventDefault()
    // user enter otp 
    const userOtp = box1.current.value + "" + box2.current.value + "" + box3.current.value + "" + box4.current.value

    if (userOtp === OTP) {

      // fetch update user api  
      const newMobile = userMobile.current.defaultValue
      let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updateUser`, {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: localStorage.getItem('token'), newMobile, OTP })
      });

      let response = await a.json()

      if (response.success) {
        toast.success('Your mobile number has been changed successfully', {
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
        }, 2000);
        setChangeAddress('Change Address')
        userMobile.current.style.border = "0px"
        userMobile.current.readOnly = true
      }
      else {
        toast.error('Your mobile number has not been changed', {
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
        }, 1000);
      }
    }
    else {
      toast.error('OTP does not match', {
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      box1.current.value = ""
      box2.current.value = ""
      box3.current.value = ""
      box4.current.value = ""

      box1.current.select()
    }
  }

  const closeOtpConatiner = () => {
    toast.info('Your mobile number has not been changed', {
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
    }, 1000);
  }


  // cash on delivery 
  const codPay = () => {
    if (cod.current.checked == true) {
      codButton.current.style.visibility = 'visible'
    }
    else {
      codButton.current.style.visibility = 'hidden'
    }
  }



  return (
    <section className={styles.checkout}>
      <Head>
        <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0" />
      </Head>

      <Script type="application/javascript" src={`${process.env.NEXT_PUBLIC_PAYTM_HOST}/merchantpgpui/checkoutjs/merchants/${process.env.NEXT_PUBLIC_PAYTM_MID}.js`} crossorigin="anonymous" />

      {/* heading  */}
      <div className={styles.heading}>
        <h1>Checkout</h1>
      </div>

      <div className={styles.container}>
        <div className={styles.userDetailsContainer}>
          <div className={styles.formHeading}><h3>Delivery Details</h3></div>
          <form action="#" method='POST' required className={styles.userDetailForm} spellCheck={false} autoComplete='on' >
            {/* user name  */}
            <div className={`${styles.inpDiv} ${styles.Fname}`}>
              <label htmlFor="name">Name</label>
              <input ref={userName} onChange={handleChange} value={name} type="text" readOnly name="name" id="name" className={styles.userInput} required autoComplete='on' />
              <span onClick={updateName} className={styles.editInfo}>{changeName}</span>
            </div>

            {/* user-email  */}
            <div className={`${styles.userEmail} ${styles.inpDiv}`}>
              <label htmlFor="email">Email</label>
              <input onChange={handleChange} value={email} type="email" name='email' readOnly className={styles.userInput} id='email' required />
            </div>

            {/* phone-number  */}
            <div className={`${styles.userMobile} ${styles.inpDiv}`}>
              <label htmlFor="mobile">Phone</label>
              <input ref={userMobile} onChange={handleChange} value={phone} type="tel" name='mobile' className={styles.userInput} id='mobile' required autoComplete='on' readOnly maxLength={10} minLength={10} />
              <span onClick={updateMobile} className={styles.editInfo}>{changePhone}</span>
            </div>

            {/* address  */}
            <div className={`${styles.inpDiv}`}>
              <label htmlFor="address">Address</label>
              <textarea ref={userAddress} cols={3} rows={3} onChange={handleChange} value={address} type="text" name='address' className={styles.userAddress} autoComplete='on' readOnly required id='address' />
              <span onClick={updateAddress} className={styles.editInfo}>{changeAddress}</span>
            </div>

            {/* city  */}
            <div className={`${styles.userCity} ${styles.inpDiv}`}>
              <label htmlFor="city">City</label>
              <input type="text" name='city' id='city' className={styles.userInput} value={'Baran'} readOnly />
            </div>

            {/*  pay-btn  */}
            <button disabled={disabled} value='online' className={styles.payBtnContainer} onClick={initiatePayment}>
              ₹{DeliveryCharge + subTotal} Pay
            </button>

            {/* otp varification  */}
            <div ref={otpContainer} className={styles.otpVerifyContainer}>
              <div onClick={closeOtpConatiner} className={styles.close}><Image src={'/close.png'} height={13} alt='' width={13} /></div>
              <h4>Otp has been send to on <span>{phone}</span> mobile number.</h4>
              <div className={styles.otpInpContainer}>
                <input onChange={otpFunct} ref={box1} autoFocus onKeyDown={keyDown} className={styles.otpInp} type="text" id='box1' name="otpbox1" maxLength={1} />
                <input onChange={otpFunct} onKeyDown={keyDown} ref={box2} className={styles.otpInp} type="text" id='box2' name="otpbox2" maxLength={1} />
                <input onChange={otpFunct} onKeyDown={keyDown} ref={box3} className={styles.otpInp} type="text" id='box3' name="otpbox3" maxLength={1} />
                <input onChange={otpFunct} onKeyDown={keyDown} ref={box4} className={styles.otpInp} type="text" id='box4' name="otpbox4" maxLength={1} />
              </div>

              <div onClick={editPhone} className={styles.editNumber}>Edit number</div>

              {/* button  */}
              <button onClick={otpVerify}>Submit</button>
            </div>
          </form>

          {/* cash on delivery  */}
          <div className={styles.codContainer}>
            <div className={styles.cod}>
              <label htmlFor="cod">Cash On Delivery</label>
              <input ref={cod} onClick={codPay} type="checkbox" name="cod" id="cod" />
            </div>
            {/* button  */}
            <button disabled={disabled2} value='cod' ref={codButton} onClick={initiatePayment} className={styles.codBtn}>Checkout</button>
          </div>
        </div>

        {/* product-detail  */}
        {/* summary  */}
        <div className={styles.summary}>
          <div className={styles.summaryConatiner}>
            {/* heading  */}
            <div className={styles.summarryHeading}>
              <h2>Products Detail</h2>
              <span>{Object.keys(cart).length} items</span>
            </div>

            {/* products-list  */}
            <div className={styles.itemsList}>
              {Object.keys(cart).map((k) => {
                return <div className={styles.itemsContainer}>
                  <div className={styles.itemDetail}>
                    <img src={cart[k].img} alt='' width={50} height={50} /><span><div className={styles.productName}>{cart[k].name}</div><div className={styles
                      .itemWeight}>{cart[k].size}</div></span>
                  </div>
                  <div className={styles.itemQty}>{cart[k].qty}</div>
                  <div className={styles.itemPrice}>₹{cart[k].price * cart[k].qty}</div>
                </div>
              })}
            </div>


            {/* price-total  */}
            <div className={styles.subtotalContainer}>
              <div className={styles.calculateContainer}>
                <div className={styles.calPrice}>
                  <span>Subtotal</span>
                  <span>₹{subTotal}</span>
                </div>

                <div className={styles.calPrice}>
                  <span>Delivery Charge</span>
                  <span>₹{DeliveryCharge}</span>
                </div>
              </div>

              <div className={styles.grandTotal}>
                <span>Grand Total</span>
                <span>₹{DeliveryCharge + subTotal}</span>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Checkout