import React from 'react'
import styles from '@/styles/forgot.module.css'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { toast } from 'react-toastify'

const Forgot = () => {

  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const [passIcon2, setPassIcon2] = useState('/hide.png')
  const [passIcon3, setPassIcon3] = useState('/hide.png')
  const [disabled, setDisabled] = useState(true)


  const newPass = useRef(0)
  const reEnterPass = useRef(0)
  const mismatch = useRef(0)
  const emailInp = useRef(0)

  // useEffect 
  useEffect(() => {
    if (localStorage.getItem('token')) {
      router.push(process.env.NEXT_PUBLIC_HOST)
    }

  }, [router.query])


  // send email for reset password
  const sendMail = async (e) => {
    e.preventDefault()

    let user = {
      email: email,
      sendMail: true
    }

    let data = { user }
    let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/forgot`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data })
    });

    let res = await a.json()
    if (res.success) {
      toast.success('Password reset instruction has been send to on your email', {
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    else {
      console.log("error")
    }
  }

  // change password 
  const changePassword = async (e) => {
    e.preventDefault()

    let user = {
      password: password2,
      token: router.query.token,
      sendMail: false
    }

    if (password == password2) {
      const data = { user }
      let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/forgot`, {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data })
      });
      let res = await a.json()

      if (res.success) {
        toast.success('Your password has been successfully changed', {
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
          router.push('/')
        }, 2000);
      }
      else {
        console.log(res)
        toast.error('User not found', {
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
          router.push('/')
        }, 2000);
      }
    }
    else {
      mismatch.current.style.visibility = 'visible'
      return
    }
  }

  // on input chnage 
  const handleChange = (e) => {
    if (e.target.name == 'forgot') {
      setEmail(e.target.value)
      if (e.target.value !== "") {
        setDisabled(false)
      }
      else {
        setDisabled(true)
      }
    }
    if (e.target.name == 'newPass') {
      setPassword(e.target.value)
      if (e.target.value !== "" && reEnterPass.current.value !== "") {
        setDisabled(false)
      }
      else {
        setDisabled(true)
      }
      mismatch.current.style.visibility = 'hidden'
    }
    if (e.target.name == 'new2Pass') {
      setPassword2(e.target.value)
      if (e.target.value !== "" && newPass.current.value !== "") {
        setDisabled(false)
      }
      else {
        setDisabled(true)
      }
      mismatch.current.style.visibility = 'hidden'
    }
  }

  // on password inp change 
  const showPass2 = () => {
    if (passIcon2 == '/hide.png') {
      setPassIcon2('/visible.png')
      newPass.current.type = 'text'
    }
    else {
      setPassIcon2('/hide.png')
      newPass.current.type = 'password'
    }
  }

  const showPass3 = () => {
    if (passIcon3 == '/hide.png') {
      setPassIcon3('/visible.png')
      reEnterPass.current.type = 'text'
    }
    else {
      setPassIcon3('/hide.png')
      reEnterPass.current.type = 'password'
    }
  }



  return (
    <section className={styles.forgotContainer}>
      {/* title */}
      <div className={styles.forgotHeading}>
        <h1>Forgot Password</h1>
        <div>Or <Link href={'/login'}>Signin</Link></div>
      </div>

      {/* forgot password input  */}
      <div >
        {/* if token  */}
        {router.query.token && <form action="" className={styles.forgotPassword}>
          <div>
            <input className={styles.userInput} type="password" ref={newPass} onChange={handleChange} autoComplete={false} name='newPass' value={password} id='newPass' placeholder='New Password' />
            {/* show pass  */}
            <span onClick={showPass2} className={styles.showPass2}><Image src={passIcon2} alt='' height={20} width={20} /></span>
          </div>

          {/* password-2  */}
          <div>
            <input className={styles.userInput} type="password" ref={reEnterPass} value={password2} onChange={handleChange} name='new2Pass' id='new2Pass' autoComplete={false} placeholder='Confirm New Password' />
            {/* show pass  */}
            <span onClick={showPass3} className={styles.showPass2}><Image src={passIcon3} alt='' height={20} width={20} /></span>
          </div>
          {/* not match password  */}
          <div ref={mismatch} className={styles.mismatchPass}>Both Password does not match</div>

          {/* button */}
          <button type='submit' disabled={disabled} onClick={changePassword} className={styles.button2}>Change Password</button>
        </form>}

        {/* if token not  */}
        {!router.query.token && <form action="" className={styles.forgotPassword}>
          <input onChange={handleChange} ref={emailInp} spellCheck={false} className={styles.userInput} autoComplete={false} placeholder='Email' value={email} type="email" name="forgot" id="forgot" />

          {/* button */}
          <button type='submit' disabled={disabled} onClick={sendMail} className={styles.button}>Continue</button>
        </form>}
      </div>
    </section>
  )
}

export default Forgot