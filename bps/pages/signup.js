import React, { use } from 'react'
import styles from '@/styles/signup.module.css'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import Image from 'next/image';

const Signup = ({ SecretKey }) => {

  const router = useRouter()
  const [name, setname] = useState('')
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const [admin, setAdmin] = useState(false)
  const [secKey, setSecKey] = useState('')
  const [passIcon2, setPassIcon2] = useState('/visible.png')

  const inp1 = useRef(0)
  const inp2 = useRef(0)
  const inp3 = useRef(0)
  const namereq = useRef(0)
  const emailreq = useRef(0)
  const passwordreq = useRef(0)
  const emailreq2 = useRef(0)
  const secretKey = useRef(0)
  const invSecKey = useRef(0)
  const checkBox = useRef(0)

  useEffect(() => {
    if (localStorage.getItem('token')) {
      router.push('/')
    }
    console.log(checkBox.current.checked)
  }, [])

  // password show function 
  const showPass2 = () => {
    if (passIcon2 == '/hide.png') {
      setPassIcon2('/visible.png')
      inp3.current.type = 'password'
    }
    else {
      setPassIcon2('/hide.png')
      inp3.current.type = 'text'
    }
  }

  // on changing input 
  const handleChange = (e) => {
    if (e.target.name == 'name') {
      setname(e.target.value)
      namereq.current.style.display = "none"
    }
    else if (e.target.name == 'email') {
      setemail(e.target.value)
      emailreq.current.style.display = "none"
      emailreq2.current.style.display = "none"
    }
    else if (e.target.name == 'password') {
      setpassword(e.target.value)
      passwordreq.current.style.display = "none"
    }
    else if (e.target.name == 'secKey') {
      setSecKey(e.target.value)
      secretKey.current.style.display = "none"
      invSecKey.current.style.display = 'none'
    }
  }


  const handleSubmit = async (e) => {
    e.preventDefault()

    if (admin == true && secKey === '') {
      secretKey.current.style.display = 'flex'
    }

    if (inp1.current.value != "" && inp2.current.value != "" && inp3.current.value != "" && admin == false) {

      if(checkBox.current.checked == false){
        toast.info('Please checked the checkbox!', {
          position: "top-left",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
        return
      }
      // fetch api 
      const data = { name, email, password }
      const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/signup`, {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      });

      let response = await res.json()
      if (response.success) {

        localStorage.setItem('token', response.token)
        localStorage.setItem('name', response.name)

        toast.success('Your account has been created', {
          position: "top-left",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        })

        setTimeout(() => {
          window.location.replace(`${process.env.NEXT_PUBLIC_HOST}`)
        }, 1500);

        setname("")
        setemail("")
        setpassword("")
      }
      else {
        emailreq2.current.style.display = "flex"
        return
      }
    }
    else if (inp1.current.value != "" && inp2.current.value != "" && inp3.current.value != "" && admin == true && secKey !== '') {
      if (secKey == SecretKey) {
        const data = { name, email, password, secKey }
        const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/signup`, {
          method: "POST", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data)
        });

        let response = await res.json()
        if (response.success) {
          toast.success('Your Admin account has been created', {
            position: "top-left",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
          })

          setTimeout(() => {
            window.location.replace(`${process.env.NEXT_PUBLIC_HOST}/login`)
          }, 1500);

          setname("")
          setemail("")
          setpassword("")
          setSecKey("")
        }
        else {
          emailreq2.current.style.display = "flex"
          return
        }
      }
      else {
        invSecKey.current.style.display = 'flex'
        return
      }
    }
    else {
      if (inp1.current.value === "") {
        namereq.current.style.display = "flex"
      }
      if (inp2.current.value === "") {
        emailreq.current.style.display = "flex"
      }
      if (inp3.current.value === "") {
        passwordreq.current.style.display = "flex"
      }
      return
    }
  }

  // choose userType 
  const userType = (e) => {
    if (e.target.id == 'admin') {
      setAdmin(true)
    }
    else {
      setAdmin(false)
    }
  }

  return (
    <>
      <div className={styles.signup}>
        <div className={styles.leftPart}>
          <div className={styles.heading}>
            <h1 className={styles.signupHeding}>Create Free Account</h1>
            <p className={styles.signupPara}>Hello there! Sign up to be part of great quality!</p>
          </div>

          <div className={styles.signupForm}>
            <form onSubmit={handleSubmit} method='POST' className={styles.signupF}>
              {/* name  */}
              <div className={styles.divInp}>
                <label htmlFor="name"></label>
                <input ref={inp1} value={name} onChange={handleChange} type="text" className={styles.inp} id='name' name='name' placeholder='Name' />
                {/* error messages  */}
                <div ref={namereq} spellCheck={false} className={styles.errorMsg}><Image src={'/alert.png'} alt='' width={15} height={15} />Name is required!</div>
              </div>
              {/* email  */}
              <div className={styles.divInp}>
                <label htmlFor="email"></label>
                <input ref={inp2} value={email} onChange={handleChange} type="email" spellCheck={false} className={styles.inp} id='email' name='email' placeholder='Email' />
                {/* error messages  */}
                <span ref={emailreq} className={styles.errorMsg}><Image src={'/alert.png'} width={15} alt='' height={15} /> Email is required!</span>
                <span ref={emailreq2} className={styles.errorMsg}><Image src={'/alert.png'} width={15} height={15} alt='' /> Email has been already use!</span>
              </div>
              {/* password  */}
              <div className={styles.divInp}>
                <label htmlFor="password" ></label>
                <input ref={inp3} value={password} onChange={handleChange} type="password" className={styles.inp} id='password' name='password' placeholder='Password' />
                {/* show password  */}
                <div className={styles.showPass2}><Image src={passIcon2} onClick={showPass2} height={20} width={20} /></div>

                {/* error messages  */}
                <div ref={passwordreq} className={styles.errorMsg}><Image src={'/alert.png'} width={15} alt='' height={15} />Password is required!</div>
              </div>
              {/* usertype  */}
              <div className={styles.userType}>
                <span>Select Usertype:</span>
                <div>
                  <input defaultChecked onClick={userType} type="radio" id='user' name='userType' />
                  <label htmlFor="user">User</label>
                </div>

                <div>
                  <input type="radio" onClick={userType} id="admin" name='userType' />
                  <label htmlFor="admin">Admin</label>
                </div>
              </div>

              {/* secret key  */}
              {admin == true && <div className={styles.divInp}>
                <label htmlFor="secKry"></label>
                <input type="text" autoComplete='off' aut placeholder='Secret Key' value={secKey} onChange={handleChange} className={styles.inp} id='secKey' name='secKey' />
                {/* error messages  */}
                <div ref={secretKey} className={styles.errorMsg}><Image src={'/alert.png'} width={15} alt='' height={15} />Secret Key is required!</div>
                <div ref={invSecKey} className={styles.errorMsg}><Image src={'/alert.png'} width={15} alt='' height={15} />Invalid Secret Key!</div>
              </div>}

              {/* checkbox  */}
              <div className={styles.checkBox}>
                <label htmlFor="check"></label>
                <input type="checkbox" name='check' ref={checkBox} id='check' className={styles.checkB} />
                <span className={styles.termsC}>I have read the Terms & Conditions</span>
              </div>
              <div className={styles.signupBtn}>
                <button type='submit'>Sign up</button>
              </div>
            </form>
          </div>

        </div>

        {/* right part */}
        <div className={styles.rightPart}>
          <h1 className={styles.rightHeading}>One Of Us?</h1>
          <p className={styles.rightPara}>Just sign in. We've missed you!</p>
          <div className={styles.loginBtn}>
            <Link href={'/login'}><button>Sign in</button></Link>
          </div>
        </div>
      </div>
    </>
  )
}

export async function getServerSideProps(context) {

  const SecretKey = process.env.SECRET_KEY
  return {
    props: { SecretKey: SecretKey }
  }
}

export default Signup