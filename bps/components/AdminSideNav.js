import React from 'react'
import Link from 'next/link'
import styles from '@/styles/adminSideNav.module.css'
import { useRouter } from 'next/router'
import { useState, useEffect, useRef } from 'react'

const AdminSideNav = () => {

    const router = useRouter()
    const [active1, setActive1] = useState(false)
    const [active2, setActive2] = useState(false)
    const [active3, setActive3] = useState(false)
    const [active4, setActive4] = useState(false)
    const [active5, setActive5] = useState(false)

    useEffect(() => {
        if (router.pathname == '/admin') {
            setActive1(true)
            setActive2(false)
            setActive3(false)
            setActive4(false)
            setActive5(false)
        }
        else if (router.pathname == '/admin/add') {
            setActive2(false)
            setActive1(false)
            setActive3(false)
            setActive4(true)
            setActive5(false)
        }
        else if (router.pathname == '/admin/allProducts') {
            setActive3(false)
            setActive2(true)
            setActive1(false)
            setActive4(false)
            setActive5(false)
        }
        else if (router.pathname == '/admin/orders') {
            setActive4(false)
            setActive2(false)
            setActive3(true)
            setActive1(false)
            setActive5(false)
        }
        else if (router.pathname == '/admin/updateProduct') {
            setActive4(false)
            setActive2(false)
            setActive3(false)
            setActive1(false)
            setActive5(true)
        }
        else {
            setActive4(false)
            setActive2(false)
            setActive3(false)
            setActive1(false)
            setActive5(false)
        }
    }, [router.query])





    return (
        <div className={styles.adminSideNav}>
            <Link href='/admin'><button disabled={active1} className={styles.pageLink}> Home</button></Link>
            <Link href='/admin/allProducts'><button disabled={active2} className={styles.pageLink}>All Products</button></Link>
            <Link href={'/admin/orders'}><button disabled={active3} className={styles.pageLink}>Orders</button></Link>
            <Link href={'/admin/add'}><button disabled={active4} className={styles.pageLink}>Add Products</button></Link>
            <Link href={'/admin/updateProduct'}><button disabled={active5} className={styles.pageLink}>Update Products</button></Link>
        </div>
    )
}

export default AdminSideNav