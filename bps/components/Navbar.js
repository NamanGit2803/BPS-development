import React, { useRef, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from '@/styles/navbar.module.css'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'

const Navbar = ({ user, logout, cart, addToCart, removeFromCart, subTotal, clearCart }) => {

    const [active1, setActive1] = useState(false)
    const [active2, setActive2] = useState(false)
    const [active3, setActive3] = useState(false)
    const [active4, setActive4] = useState(false)
    const [scroll, setScroll] = useState(false)
    const [search, setSearch] = useState('')
    const [suggestion, setSuggestion] = useState([])

    // for bottom nav 
    const [img, setImg] = useState('/home.png')
    const [img2, setImg2] = useState('/order.png')
    const [img3, setImg3] = useState('/whitecart.png')
    const [img4, setImg4] = useState('/user2.png')

    const sideCart = useRef(0);
    const nav2 = useRef(0)
    const searchBar = useRef(0)
    const suggBox = useRef(0)

    // cart close function 
    const closeCart = () => {
        sideCart.current.style.visibility = "hidden";
        setImg3('/cartFilled.png')

    }
    // cart open function 
    const openCart = (e) => {
        e.preventDefault()
        sideCart.current.style.visibility = "visible";
        sideCart.current.style.display = "flex";

        setImg3('/whiteCart.png')
    }

    globalThis.onscroll = () => {
        if (nav2.current.getBoundingClientRect().y == 0) {
            setScroll(true)
        }
        else {
            setScroll(false)
        }
    }

    // to show user name 
    function userName() {
        if (localStorage.getItem('name')) {
            let Username = {
                uname: localStorage.getItem('name')
            }
            let name = Username.uname
            let username = name.split(' ')
            let user = username[0]
            let userCapitalizeName = user.charAt(0).toUpperCase() + user.slice(1)
            return userCapitalizeName
        }
    }

    const router = useRouter()

    // useeffect 
    useEffect(() => {

        if (router.pathname == '/') {
            setActive1(true)
            setActive2(false)
            setActive3(false)
            setActive4(false)
            setImg('/homeF.png')
            setImg4('/user2.png')
            setImg2('/order.png')
        }
        else if (router.pathname == '/aboutUs') {
            setActive2(true)
            setActive1(false)
            setActive3(false)
            setActive4(false)
            setImg('/home.png')
            setImg4('/user2.png')
            setImg2('/order.png')
        }
        else if (router.pathname == '/orders' || router.pathname == '/order') {
            setActive3(true)
            setActive2(false)
            setActive1(false)
            setActive4(false)
            setImg('/home.png')
            setImg4('/user2.png')
            setImg2('/orderf.png')
        }
        else if (router.pathname == '/contactUs') {
            setActive4(true)
            setActive2(false)
            setActive3(false)
            setActive1(false)
            setImg('/home.png')
            setImg4('/user2.png')
            setImg2('/order.png')
        }
        else if (router.pathname == '/myAccount' || router.pathname == '/login') {
            setImg4('/userf.png')
            setActive4(false)
            setActive2(false)
            setActive3(false)
            setActive1(false)
            setImg('/home.png')
            setImg2('/order.png')
        }
        else {
            setActive4(false)
            setActive2(false)
            setActive3(false)
            setActive1(false)
            setImg('/home.png')
            setImg4('/user2.png')
            setImg2('/order.png')
        }
    }, [router.query])

    // change image 
    const changeImage = (e) => {
        e.preventDefault()

        if (e.target.alt == 'img1') {
            if (img == '/home.png') {
                setImg('/homeF.png')
            }
        }
        else if (e.target.alt == 'img2') {
            if (img2 == '/order.png') {
                setImg2('/orderf.png')
            }
        }
        else if (e.target.alt == 'img3') {
            if (img3 == '/whiteCart.png') {
                setImg3('/cartFilled.png')
            }
            else {
                setImg3('/whiteCart.png')
            }
        }
        else if (e.target.alt == 'img4') {
            if (img4 == '/user2.png') {
                setImg4('/userf.png')
            }
        }
    }

    // on search 
    const handleChange = async (e) => {
        if (e.target.name == 'search') {
            setSearch(e.target.value)

            // fetch api 
            let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getAllProducts`, {
                method: "POST", // or 'PUT'
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ search1: searchBar.current.value })
            });

            let res = await a.json()
            setSuggestion(res.products)
        }
        if (searchBar.current.value.length > 1) {
            suggBox.current.style.visibility = 'visible'
        }
        if (searchBar.current.value.length <= 1) {
            suggBox.current.style.visibility = 'hidden'            
        }
    }

    // set search field 
    const fillSearch = (e) => {
        setSearch(e.target.text)
    }


    return (
        <>
            {/* Navbar-1 */}
            <nav id={styles.navbar1}>
                {/* company name  */}
                <div className={styles.logo}>
                    <Link href={'/'}><Image src="/BPS-LOGOv.png" width={333} height={85} alt="BPS Image" /></Link>
                </div>

                {/* search box  */}
                <div className={styles.searchContainer}>
                    <div id={styles.searchbar}>
                        <input ref={searchBar} type="text" name="search" onChange={handleChange} id={styles.search1} value={search} placeholder="Search..." spellCheck="false" autoComplete='off' />
                        <button type="button"><Image className={styles.searchIcon} src="/searchicon.png" alt='' width={25} height={25}></Image></button>
                    </div>
                    {/* suggestion  */}
                    <div ref={suggBox} className={styles.suggContainer}>
                        {suggestion.map((sugg, i) => {
                            return i < 7 && <div onClick={fillSearch} className={styles.sugg}><Link href={{pathname: `/Products/${sugg.title}`, query: suggestion}}>{sugg.title}</Link></div>
                        })}
                    </div>
                </div>

                {/* <!-- login panel --> */}
                <div className={styles.login}>
                    {/* for logout user  */}
                    {!user.value && <Link href={'/login'}><Image src="/user123.png" alt="Login" width={35} height={35} />
                        <div className={styles.loginName}>Signin</div></Link>}

                    {/* for login user  */}
                    {user.value && <><Image src="/account.png" alt="Login" width={35} height={35} /><div className={styles.loginName}>Hi! {userName()}</div>

                        {/* dropdown */}
                        <div className={styles.userDropdown}>
                            <Link href={'/myAccount'}><div className={styles.dropdownItem}>My Account</div></Link>
                            <div className={styles.dropdownItem} onClick={logout}>Logout</div>
                        </div>
                    </>}
                </div>

                {/* wishlist */}
                <div className={styles.wishlist}>
                    <Link href={''}><Image src={'/wishlist-icon.png'} width={35} height={35} alt='' /></Link>
                </div>

                {/* <!-- Cart --> */}
                <div className={styles.cart}>
                    <Link href={''}><Image src="/remove-from-cart.png" alt="Cart" onClick={openCart} width={40} height={40} /></Link>
                </div>

                {/* sidebar */}
                <div className={styles.sidebar} ref={sideCart}>

                    <div className={styles.cartHeding}>
                        <h1>My Cart</h1>
                        <div onClick={closeCart} className={styles.closeImg}><Image src={'/close.png'} height={13} alt='' width={13} /></div>
                    </div>

                    {/* /* item-list  */}
                    <div className={styles.cartList}>

                        {/* item-list-heading  */}
                        {Object.keys(cart).length != 0 && <div className={styles.listContainerHead}>
                            <h4>{Object.keys(cart).length} items in your cart</h4>
                            <button onClick={clearCart}>Clear</button>
                        </div>}

                        {/* javascript */}
                        {Object.keys(cart).length == 0 && <div className={styles.emptyCart}><Image src={'/empty-cart.png'} width={100} height={100} alt='Empty-cart' />
                            <div className={styles.firstPara}>Your cart is Empty!</div>
                            <div className={styles.secondPara}>Your favourite items are just a click away</div>
                            <Link href={'/'}><button onClick={closeCart}>Start Shopping</button></Link>
                        </div>}

                        {Object.keys(cart).map((k) => {
                            return <>
                                <div key={k} className={styles.cartContainer}>
                                    <div className={styles.cartItems}>
                                        <div className={styles.cartItemsImg}>
                                            <img src={cart[k].img} alt='' height={70} width={70} />
                                        </div>
                                        <div className={styles.cartItemsAbout}>
                                            <div className={styles.cartItemsDetail}>
                                                {/* item-name */}
                                                <div className={styles.cartItemsName}>
                                                    {cart[k].name}
                                                </div>

                                                {/* item-weight */}
                                                <div className={styles.cartItemsWeight}>{cart[k].size}</div>

                                                {/* item-price  */}
                                                <div className={styles.cartItemsPrice}>₹{cart[k].price}</div>
                                            </div>

                                            {/* qty-button  */}
                                            <div className={styles.cartItemsQty}>
                                                <div className={styles.cartItemsQtybtn}>
                                                    <div onClick={() => { removeFromCart(k, 1) }}><Image src={'/minus2.png'} width={20} height={20} alt='' /></div>

                                                    <span>{cart[k].qty}</span>

                                                    <div onClick={() => { addToCart(k, 1, '2 Minute Maggi noodle noodle noodle', 15, 70) }}><Image src={'/plus2.png'} width={20} height={20} alt='' /></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        })}

                    </div>

                    {/* button  */}
                    {Object.keys(cart).length != 0 &&
                        <div className={styles.cartProceed}>
                            <Link href={'/cart'}><button onClick={closeCart}>Proceed</button></Link>
                        </div>}
                </div>
            </nav>
            {/* end of navbar1 */}

            {/* <!-- navigation-2 --> */}
            <nav ref={nav2} id={styles.navbar2}>
                <ul className={styles.navitems}>
                    <li className={styles.navitem}>
                        <span id={styles.category}>Shop By Category <Image className={styles.downKey} src={'/downwards-keyW.png'} width={12} height={12} alt='' />
                        </span>

                        <div className={styles.catDropDiv}>
                            <ul className={styles.catList}>
                                <Link href={`/catProducts/biscuits-and-snacks`}> <li className={styles.catDownItems}><span>Biscuits & Snacks</span><Image src={'/next.png'} width={10} height={10} className={styles.nextArrow} alt='' /></li></Link>
                                <Link href={''}><li className={styles.catDownItems}><span>Dryfruits</span><Image src={'/next.png'} width={10} height={10} className={styles.nextArrow} alt='' /></li></Link>
                                <Link href={''}><li className={styles.catDownItems}><span>Tea & Coffee</span><Image src={'/next.png'} width={10} height={10} alt='' className={styles.nextArrow} /></li></Link>
                                <Link href={''}><li className={styles.catDownItems}><span>Dal & Rice</span><Image src={'/next.png'} width={10} alt='' height={10} className={styles.nextArrow} /></li></Link>
                                <Link href={''}><li className={styles.catDownItems}><span>Masala</span><Image src={'/next.png'} width={10} height={10} alt='' className={styles.nextArrow} /></li></Link>
                                <Link href={''}><li className={styles.catDownItems}><span>Atta</span><Image src={'/next.png'} width={10} height={10} alt='' className={styles.nextArrow} /></li></Link>
                                <Link href={''}><li className={styles.catDownItems}><span>Oil & Ghee</span><Image src={'/next.png'} width={10} height={10} className={styles.nextArrow} alt='' /></li></Link>
                                <Link href={''}><li className={styles.catDownItems}><span>Salt & Sugar</span><Image src={'/next.png'} width={10} height={10} className={styles.nextArrow} alt='' /></li></Link>
                                <Link href={''}><li className={styles.catDownItems}><span>Personal & Baby care</span><Image src={'/next.png'} width={10} height={10} alt='' className={styles.nextArrow} /></li></Link>
                                <Link href={''}><li className={styles.catDownItems}><span>Cleaning & Household</span><Image src={'/next.png'} width={10} height={10} alt='' className={styles.nextArrow} /></li></Link>
                                <Link href={''}><li className={styles.catDownItems}><span>Pooja-path</span><Image src={'/next.png'} alt='' width={10} height={10} className={styles.nextArrow} /></li></Link>
                                <Link href={''}><li className={styles.catDownItems}><span>Salt & Sugar</span><Image src={'/next.png'} width={10} height={10} alt='' className={styles.nextArrow} /></li></Link>
                            </ul>
                        </div>
                    </li>

                    <li className={`${styles.navitem} ${styles.navHome}`}><Link className={styles.navLink} href={'/'}><button disabled={active1}>Home</button></Link></li>
                    <li className={styles.navitem}><Link className={styles.navLink} href={'/aboutUs'}><button disabled={active2}>About Us</button></Link></li>
                    <li className={styles.navitem}><Link className={styles.navLink} href={'/orders'}><button disabled={active3}>My Order</button></Link></li>
                    <li className={styles.navitem}><Link className={styles.navLink} href={''}><button disabled={active4}>Contact Us</button></Link></li>


                    {/* nav 2 cart & user & like  */}
                    {scroll == true && <li className={`${styles.navitem} ${styles.nav2Funct}`}>
                        <div className={styles.nav2Function}>
                            {/* user login  */}
                            <div className={`${styles.login2} ${styles.nav2UserFeat}`}>
                                {/* not login user  */}
                                {!user.value && <Link href={'/login'}><Image src="/user-white.png" alt="Login" width={35} height={35} />
                                    <div className={styles.loginNav2Name}>Signin</div></Link>}

                                {/* login user  */}
                                {user.value && <><Image src="/user-white-fill.png" alt="Login" width={35} height={35} /><div className={styles.loginNav2Name}>Hi! {userName()}</div>

                                    {/* dropdown */}
                                    <div className={styles.userDropdownNav2}>
                                        <Link href={'/myAccount'}><div className={styles.dropdownItem}>My Account</div></Link>
                                        <div className={styles.dropdownItem} onClick={logout}>Logout</div>
                                    </div>
                                </>}
                            </div>

                            {/* cart icon */}
                            <div className={`${styles.cart2} ${styles.nav2UserFeat}`}>
                                <Link href={''}><Image src="/white-cart.png" alt="Cart" onClick={openCart} width={40} height={40} />
                                </Link>
                            </div>
                        </div>
                    </li>}

                </ul>
            </nav>
            {/* end of navbar 2 */}

            {/* mobile bottom navigation bar  */}
            <nav className={styles.mobileBottomNav}>
                {/* home */}
                <div onClick={changeImage} className={styles.home}><Link href={'/'}><Image src={img} alt='img1' width={28} height={28} /><span>Home</span></Link></div>
                {/* orders  */}
                <div onClick={changeImage} className={styles.order}><Link href={'/orders'}><Image src={img2} alt='img2' width={28} height={28} /><span>Orders</span></Link></div>
                {/* cart  */}
                <div onClick={openCart} className={styles.mobileCart}><Image src={img3} alt='img3' width={28} height={28} /><span>Cart</span></div>
                {/* user  */}
                <div onClick={changeImage} className={styles.user}>
                    {/* when user login  */}
                    {user.value && <Link href={'/myAccount'}><Image src={img4} alt='img4' width={28} height={28} /><span>My Account</span></Link>}

                    {/* when user logout  */}
                    {!user.value && <Link href={'/login'}><Image src={img4} alt='img4' width={28} height={28} /><span>Signin</span></Link>}
                </div>
            </nav>
        </>
    )
}

export default Navbar