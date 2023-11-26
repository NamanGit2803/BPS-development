import React from 'react'
import styles from '@/styles/adminHome.module.css'
import { useEffect } from 'react'
import Chart from 'chart.js'
import { useRouter } from 'next/router'
import AdminSideNav from '@/components/AdminSideNav'

const Index = () => {

    const router = useRouter();

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

        // grapg 
        let ctx = document.getElementById('myChart').getContext('2d');
        let myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ["Jan", "Feb", "March", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                datasets: [{
                    data: [600, 500, 450, 398, 650, 735, 350, 550],
                    label: "Applied",
                    borderColor: "rgb(109, 253, 181)",
                    backgroundColor: "rgb(109, 253, 181,0.5)",
                    borderWidth: 2
                }, {
                    data: [40, 100, 44, 70, 63, 30, 10],
                    label: "Accepted",
                    borderColor: "rgb(75, 192, 192)",
                    backgroundColor: "rgb(75, 192, 192,0.5)",
                    borderWidth: 2
                }
                ]
            },
        });
    }, [router.query])


    return (
        <>
            <section className={styles.section}>
                {/* side nav  */}
                <div>
                <AdminSideNav></AdminSideNav>
                </div>

                {/* main Page  */}
                <div className={styles.container1}>
                    {/* section-1-graph  */}
                    <div className={styles.section1}>
                        {/* heading  */}
                        <h1>Sales Overview</h1>
                        {/* graph  */}
                        <div className={styles.graph}>
                            <canvas id='myChart' role='img' width={1000} height={380} aria-label=''></canvas>
                        </div>
                    </div>
                    {/* section-2  */}
                    <div className={styles.section2}>1</div>
                    {/* section-3  */}
                    <div className={styles.section3}>1</div>
                    {/* section-4  */}
                    <div className={styles.section4}>1</div>
                    {/* section-5  */}
                    <div className={styles.section5}>1</div>
                </div>
            </section>
        </>
    )
}

export default Index