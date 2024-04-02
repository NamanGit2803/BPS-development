import React from 'react'
import styles from '@/styles/myAccount.module.css'
import { useRouter } from 'next/router'
import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { toast } from 'react-toastify'


const MyAccount = ({ logout }) => {

    const router = useRouter()

    const [fName, setfName] = useState('')
    const [password, setPassword] = useState('')
    const [email, setemail] = useState('')
    const [phone, setphone] = useState('')
    const [address, setaddress] = useState('')
    const [changeName, setChangeName] = useState('Change Name')
    const [changeAddress, setChangeAddress] = useState('')
    const [passIcon1, setPassIcon1] = useState('/visible.png')
    const [passIcon2, setPassIcon2] = useState('/visible.png')
    const [passIcon3, setPassIcon3] = useState('/visible.png')
    const [changePhone, setChangePhone] = useState('')
    const [OTP, setOTP] = useState('')
    const [timer, setTimer] = useState(15)

    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [reenterPassword, setReenterPassword] = useState('')

    const name = useRef(0)
    const userAddress = useRef(0)
    const passChangeContainer = useRef(0)
    const currentPass = useRef(0)
    const newPass = useRef(0)
    const reEnterPass = useRef(0)
    const invalidPass = useRef(0)
    const mismatch = useRef(0)
    const userPhone = useRef(0)
    const box1 = useRef(0)
    const box2 = useRef(0)
    const box3 = useRef(0)
    const box4 = useRef(0)
    const otpContainer = useRef(0)

    // useEffect 
    useEffect(() => {

        const users = JSON.parse(JSON.stringify(localStorage.getItem('token')))

        const fetchUser = async () => {

            let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getUser`, {
                method: "POST", // or 'PUT'
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ token: localStorage.getItem('token') })
            });

            let res = await a.json()
            setfName(res.user.name)
            setemail(res.user.email)
            setphone(res.user.mobile)
            setaddress(res.user.address)
            setPassword(res.decryptedPass)


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
        }

        if (!users) {
            router.push('/login')
        }
        else {
            fetchUser()
        }

    }, [router.query])

    // onchange function 
    const handleChange = (e) => {
        if (e.target.name == 'Fname') {
            setfName(e.target.value)
        }
        if (e.target.name == 'address') {
            setaddress(e.target.value)
        }
        if (e.target.name == 'currentPass') {
            setCurrentPassword(e.target.value)
            invalidPass.current.style.visibility = 'hidden'
        }
        if (e.target.name == 'newPass') {
            setNewPassword(e.target.value)
        }
        if (e.target.name == 'new2Pass') {
            setReenterPassword(e.target.value)
            mismatch.current.style.visibility = 'hidden'
        }
        if (e.target.name == 'mobile') {
            setphone(e.target.value)
        }
    }

    // update user name 
    const updateName = async () => {

        if (changeName == "Change Name") {
            setChangeName('Update')
            name.current.style.border = "1px solid #43a047ed"
            name.current.readOnly = false
            name.current.focus()
        }

        if (changeName == "Update") {
            // fetch update user api  
            const data = name.current.defaultValue
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
            name.current.style.border = "0px"
            name.current.readOnly = true
        }
    }

    // update address 
    const updateAddress = async () => {
        if (changeAddress == "Change Address" || changeAddress == "Add Address") {
            setChangeAddress('Update')
            userAddress.current.style.border = "1px solid #43a047ed"
            userAddress.current.readOnly = false
            userAddress.current.focus()
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

    // Change Password display
    const passwordChangeDispaly = () => {
        if (!passChangeContainer.current.style.display || passChangeContainer.current.style.display == 'none') {
            passChangeContainer.current.style.display = 'flex'
        }
        else {
            passChangeContainer.current.style.display = 'none'
        }
    }

    // Change password
    const passwordChange = async () => {
        if (password == currentPassword && newPassword == reenterPassword) {
            const updatedPassword = newPassword
            let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updateUser`, {
                method: "POST", // or 'PUT'
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ token: localStorage.getItem('token'), updatedPassword })
            });

            let response3 = await a.json()
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
                window.location.reload()
            }, 2000);

        }
        else {
            if (password != currentPassword) {
                invalidPass.current.style.visibility = 'visible'
            }
            else {
                mismatch.current.style.visibility = 'visible'
            }
        }

    }

    // Show Password
    const showPass1 = () => {
        if (passIcon1 == '/hide.png') {
            setPassIcon1('/visible.png')
            currentPass.current.type = 'password'
        }
        else {
            setPassIcon1('/hide.png')
            currentPass.current.type = 'text'
        }
    }

    const showPass2 = () => {
        if (passIcon2 == '/hide.png') {
            setPassIcon2('/visible.png')
            newPass.current.type = 'password'
        }
        else {
            setPassIcon2('/hide.png')
            newPass.current.type = 'text'
        }
    }

    const showPass3 = () => {
        if (passIcon3 == '/hide.png') {
            setPassIcon3('/visible.png')
            reEnterPass.current.type = 'password'
        }
        else {
            setPassIcon3('/hide.png')
            reEnterPass.current.type = 'text'
        }
    }

    // Update Mobile Number 
    const updateMobile = async () => {
        if (changePhone == "Change Number" || changePhone == "Add Number") {
            setChangePhone('Update')
            userPhone.current.style.border = "1px solid #43a047ed"
            userPhone.current.readOnly = false
            userPhone.current.focus()
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

            // call otp api 
            const newMobile = userPhone.current.defaultValue
            let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updateUser`, {
                method: "POST", // or 'PUT'
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ token: localStorage.getItem('token'), otp })
            });

            // time generator 
            let i = 15
            const interval = setInterval(() => {
                setTimer(i-1)   
                i -= 1
                if(i < 0){
                    clearInterval(interval)
                }
            }, 1000);

            let response = await a.json()
        }
    }

    // resend otp 
    const resendOtp = async (e) => {
        e.preventDefault()

        let number = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
        let otp = ''
        for (let i = 0; i < 4; i++) {
            otp = otp + number[Math.floor(Math.random() * 10)]
        }

        setOTP(otp)
        otpContainer.current.style.display = "flex"
        box1.current.select()

        // call otp api 
        let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updateUser`, {
            method: "POST", // or 'PUT'
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ token: localStorage.getItem('token'), otp })
        });

        // time generator 
        let i = 15
        const interval = setInterval(() => {
            setTimer(i-1)   
            i -= 1
            if(i < 0){
                clearInterval(interval)
            }
        }, 1000);

        let response = await a.json()
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
            const newMobile = userPhone.current.defaultValue
            let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updateUser`, {
                method: "POST", // or 'PUT'
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ token: localStorage.getItem('token'), newMobile })
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
                userPhone.current.style.border = "0px"
                userPhone.current.readOnly = true
            }
            else {
                // fetch update user api  
                const newMobile = userPhone.current.defaultValue
                let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updateUser`, {
                    method: "POST", // or 'PUT'
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ token: localStorage.getItem('token'), newMobile, otp })
                });
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



    return (
        <section className={styles.MyAccountSec}>
            {/* title */}
            <div className={styles.sectionHeading}>
                <h1>My Account</h1>
            </div>

            {/* myAccount Conatiner  */}
            <div className={styles.userDetailsContainer}>

                {/* password change  */}
                <div ref={passChangeContainer} className={styles.changePassContainer}>
                    <form action="#" className={styles.newPassForm}>
                        <div className={styles.inpConatiner}>
                            <label htmlFor="currentPass"></label>
                            <input className={styles.userInput} type="password" onChange={handleChange} name='currentPass' ref={currentPass} value={currentPassword} id='currentPass' placeholder='Enter Current Password' />
                            {/* invalid message  */}
                            <div ref={invalidPass} className={styles.invalidPass}>Invalid Password</div>
                            {/* show password */}
                            <span onClick={showPass1} className={styles.showPass}><Image src={passIcon1} height={20} width={20} /></span>
                        </div>

                        {/* password-1  */}
                        <div className={styles.inpConatiner}>
                            <label htmlFor="newPass"></label>
                            <input className={styles.userInput} type="password" ref={newPass} onChange={handleChange} name='newPass' value={newPassword} id='newPass' placeholder='Enter New Password' />
                            {/* show pass  */}
                            <span onClick={showPass2} className={styles.showPass2}><Image src={passIcon2} height={20} width={20} /></span>
                        </div>

                        {/* password-2  */}
                        <div className={styles.inpConatiner}>
                            <label htmlFor="new2Pass"></label>
                            <input className={styles.userInput} type="password" ref={reEnterPass} value={reenterPassword} onChange={handleChange} name='new2Pass' id='new2Pass' placeholder='Re-Enter Password' />
                            {/* not match password  */}
                            <div ref={mismatch} className={styles.mismatchPass}>Re-enter password does not match</div>
                            {/* show pass  */}
                            <span onClick={showPass3} className={styles.showPass}><Image src={passIcon3} height={20} width={20} /></span>
                        </div>

                        <div className={styles.button} onClick={passwordChange}>Change Password</div>
                    </form>

                    {/* close button  */}
                    <div onClick={passwordChangeDispaly} className={styles.close}><Image src={'/close.png'} height={13} alt='' width={13} /></div>
                </div>


                <form action="#" method='POST' className={styles.userDetailForm} >
                    <div className={styles.formContainer}>
                        {/* user name  */}
                        <div className={`${styles.userName}`}>
                            <div className={`${styles.Fname}`}>
                                <label htmlFor="FName">Name</label>
                                <input onChange={handleChange} ref={name} readOnly value={fName} type="text" name="Fname" id="FName" className={styles.userInput} spellCheck={false} />
                                <span onClick={updateName}>{changeName}</span>
                            </div>

                            {/* user-email  */}
                            <div className={`${styles.Lname}`}>
                                <label htmlFor="email">Email</label>
                                <input value={email} type="text" name="email" id="email" className={styles.userInput} readOnly />
                            </div>
                        </div>

                        {/* passsword  */}
                        <div className={styles.inpDiv}>
                            <label htmlFor="password">Password</label>
                            <input value={password} type="password" name='password' className={styles.userInput} readOnly id='password' />

                            {/* change password  */}
                            <div onClick={passwordChangeDispaly} className={styles.changePassword}>Change Password</div>
                        </div>

                        {/* phone-number  */}
                        <div className={styles.inpDiv}>
                            <label htmlFor="mobile">Phone</label>
                            <input value={phone} ref={userPhone} type="tel" name='mobile' className={styles.userInput} onChange={handleChange} id='mobile' readOnly />
                            <span className={styles.updateAddress} onClick={updateMobile}>{changePhone}</span>
                        </div>

                        {/* address  */}
                        <div className={styles.inpDiv}>
                            <label htmlFor="address">Address</label>
                            <textarea cols={4} rows={4} className={styles.address} value={address} onChange={handleChange} spellCheck={false} ref={userAddress} type="text" name='address' readOnly id='address' />
                            <span className={styles.updateAddress} onClick={updateAddress}>{changeAddress}</span>
                        </div>

                        {/* city  */}
                        <div className={`${styles.userCity} ${styles.inpDiv}`}>
                            <label htmlFor="city">City</label>
                            <input type="text" name='city' id='city' className={styles.userInput} value={'Baran'} readOnly />
                        </div>

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

                            {/* timer  */}
                            {timer >= 0 && <div className={styles.editNumber}>{timer}</div>}

                            {/* resend otp  */}
                            {timer < 0 && <div onClick={resendOtp} className={styles.editNumber}>Resend OTP</div>}

                            {/* button  */}
                            <button onClick={otpVerify}>Submit</button>
                        </div>
                    </div>
                </form>

                {/* logout button for mobile  */}
                <div className={styles.logout}>
                    <button onClick={logout}>Logout</button>
                </div>
            </div>
        </section>
    )
}

export default MyAccount