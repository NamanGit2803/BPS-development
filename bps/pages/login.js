import React from 'react'
import styles from '@/styles/login.module.css'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import Image from 'next/image'


const Login = () => {

  const router = useRouter()
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const emailreq = useRef(0)
  const emailreq2 = useRef(0)
  const passwordreq = useRef(0)
  const passwordreq2 = useRef(0)
  const inp1 = useRef(0)
  const inp2 = useRef(0)
  const [passIcon2, setPassIcon2] = useState('/visible.png')

  useEffect(() => {
    if (localStorage.getItem('token')) {
      router.push('/')
    }
  }, [])

  // password show function 
  const showPass2 = () => {
    if (passIcon2 == '/hide.png') {
      setPassIcon2('/visible.png')
      inp2.current.type = 'password'
    }
    else {
      setPassIcon2('/hide.png')
      inp2.current.type = 'text'
    }
  }


  // onchange function 
  const handleChange = (e) => {
    if (e.target.name == 'email') {
      setemail(e.target.value)
      emailreq.current.style.display = "none"
      emailreq2.current.style.display = "none"
    }
    else if (e.target.name == 'password') {
      setpassword(e.target.value)
      passwordreq.current.style.display = "none"
      passwordreq2.current.style.display = "none"
    }
  }

  // on submit function 
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (inp1.current.value != "" && inp2.current.value != "") {

      const data = { email, password }
      const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/login`, {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      });

      let response = await res.json()

      if (response.success) {

        if (response.userType == 'admin') {
          localStorage.setItem('token', response.token)

          toast.success('Your are successfully logged in as admin', {
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
            window.location.replace(`${process.env.NEXT_PUBLIC_ADMIN_HOST}`)
          }, 1500);

          setemail("")
          setpassword("")
        }
        else {
          localStorage.setItem('token', response.token)
          localStorage.setItem('name', response.name)

          toast.success('Your are successfully logged in', {
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
            window.location.replace(`${process.env.NEXT_PUBLIC_HOST}`)
          }, 1500);

          setemail("")
          setpassword("")
        }
      }
      else {
        if (response.error === "Invalid credentials") {
          passwordreq2.current.style.display = "flex"
        }
        if (response.error === "User not found") {
          emailreq2.current.style.display = "flex"
        }
      }
    }
    else {
      if (inp1.current.value === "") {
        emailreq.current.style.display = "flex"
      }
      if (inp2.current.value === "") {
        passwordreq.current.style.display = "flex"
      }
    }

  }

  return (
    <>
      <div className={styles.login}>
        <div className={styles.leftPart}>
          <div className={styles.heading}>
            <h1 className={styles.loginHeding}>Sign in to Your Account</h1>
            <p className={styles.loginPara}>Hello there! Sign in and continue your shopping</p>
          </div>

          <div className={styles.loginForm}>
            <form onSubmit={handleSubmit} method='POST' className={styles.loginF}>
              {/* email  */}
              <div className={styles.divInp}>
                <label htmlFor="email"></label>
                <input value={email} ref={inp1} onChange={handleChange} type="email" className={styles.inp} id='email' name='email' placeholder='Email' />
                {/* error messages  */}
                <div ref={emailreq} className={styles.errorMsg}><Image src={'/alert.png'} width={15} height={15} />Email is required!</div>
                <div ref={emailreq2} className={styles.errorMsg}><Image src={'/alert.png'} width={15} height={15} />User not found!</div>
              </div>
              {/* password */}
              <div className={styles.divInp}>
                <label htmlFor="password" ></label>
                <input value={password} ref={inp2} onChange={handleChange} type="password" className={styles.inp} id='password' name='password' placeholder='Password' />
                {/* show password  */}
                <div className={styles.showPass2}><Image src={passIcon2} onClick={showPass2} height={20} width={20} /></div>

                {/* error messages  */}
                <span ref={passwordreq} className={styles.errorMsg}><Image src={'/alert.png'} width={15} height={15} />Password is required!</span>
                <span ref={passwordreq2} className={styles.errorMsg}><Image src={'/alert.png'} width={15} height={15} />Invalid password!</span>
              </div>

              {/* forgot password  */}
              <div className={styles.forgot}>
                <Link href={'/forgot'} legacyBehavior><a className={styles.forgotA}>Forgot password?</a></Link>
              </div>

              {/* button  */}
              <div className={styles.loginBtn}>
                <button type='submit'>Sign in</button>
              </div>
            </form>
          </div>
          <div className={styles.signUpLink}>New here? <Link href={'/signup'}>Sign Up</Link> instead</div>
        </div>

        <div className={styles.rightPart}>
          <h1 className={styles.rightHeading}>New Here?</h1>
          <p className={styles.rightPara}>Sign up and join with us for great groceries!</p>
          <div className={styles.siginBtn}>
            <Link href={'/signup'}><button>Sign up</button></Link>
          </div>
        </div>
      </div>
    </>
  )
}



export default Login