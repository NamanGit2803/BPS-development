import React, { useRef, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from '@/styles/adminNav.module.css'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'

const Navbar = ({ user, logout, cart, addToCart, removeFromCart, subTotal, clearCart }) => {

    return (
        <>
            {/* Navbar-1 */}
            <nav id={styles.navbar1}>
                {/* company name  */}
                <div className={styles.logo}>
                    <Link href={'/'}><Image src="/BPS-LOGOv.png" width={363} height={106} alt="BPS Image" /></Link>
                </div>

                {/* search box  */}
                <div id={styles.searchbar}>
                    <input type="text" name="search1" id={styles.search1} placeholder="Search..." spellCheck="false" />
                    <button type="button"><Image className={styles.searchIcon} src="/searchicon.png" alt='' width={25} height={25}></Image></button>
                </div>
            </nav>
        </>
    )
}

export default Navbar