import React from 'react'
import styles from '@/styles/return.module.css'

const ReturnPolicy = () => {
    return (
        <section className={styles.ppSection}>
            {/* heading  */}
            <div className={styles.heading}>
                <h1>Return and Cancellation Policy</h1>
            </div>
            {/* info  */}
            <div className={styles.infoContainer}>
                <div className={styles.infoContainer2}>
                    <h2>Return Policy</h2>
                    <p>At BPS.com, our primary focus is customer satisfaction, which is why we strive to provide the best products and services.</p>
                    <p>If you are unsatisfied with a product due to a major defect, we will review your case and change product or provide a refund. The following conditions apply to our refund policy:</p>
                    <ul>
                        <li>
                            <p>A valid reason is required for returning an item.</p>
                        </li>
                        <li>
                            <p>First name and last name</p>
                        </li>
                        <li>
                            <p>Phone number</p>
                        </li>
                        <li>
                            <p>Address, State, Province, ZIP/Postal code, City</p>
                        </li>
                        <li>
                            <p>Usage Data</p>
                        </li>
                    </ul>

                    {/* Cancellation policy  */}
                    <h2>Cancellation Policy</h2>
                    <p>While using Our Service, We may ask You to provide Us with certain personally identifiable information that can be used to contact or identify You. Personally identifiable information may include, but is not limited to:</p>
                    <ul>
                        <li>
                            <p>Email address</p>
                        </li>
                        <li>
                            <p>First name and last name</p>
                        </li>
                        <li>
                            <p>Phone number</p>
                        </li>
                        <li>
                            <p>Address, State, Province, ZIP/Postal code, City</p>
                        </li>
                        <li>
                            <p>Usage Data</p>
                        </li>
                    </ul>
                    <p>If you have any questions about this Privacy Policy, You can contact us:</p>
                    <ul>
                        <li>
                            <p>By email: bps1786@gmail.com</p>
                        </li>
                        <li>
                            <p>By phone number: 6350250055</p>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    )
}

export default ReturnPolicy