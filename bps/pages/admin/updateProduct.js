import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { useState, useEffect, useRef } from 'react'
import React from 'react'
import styles from '@/styles/adminAddProduct.module.css'
import styles2 from '@/styles/adminUpProduct.module.css'
import Image from 'next/image'
import AdminSideNav from '@/components/AdminSideNav'
import { ThreeDots } from 'react-loader-spinner'


const UpdateProduct = () => {

    const router = useRouter()
    const [title, setTitle] = useState('')
    const [slug, setSlug] = useState('')
    const [img, setImage] = useState('')
    const [category1, setCategory1] = useState('')
    const [category2, setCategory2] = useState('')
    const [cat2, setCat2] = useState([])
    const [topCategory, setTopCat] = useState('no')
    const [size, setSize] = useState('')
    const [size2, setSize2] = useState('')
    const [availableQty, setAvailableQty] = useState('')
    const [price, setPrice] = useState('')
    const [price2, setPrice2] = useState('')
    const [desc, setDesc] = useState('')
    const [prodId, setProdId] = useState('')
    const [categ, setCateg] = useState(true)
    const [inpCat, setInpCat] = useState('')
    const [categ2, setCateg2] = useState(true)
    const [inpCat2, setInpCat2] = useState('')
    const [pic, setPic] = useState(false)
    const [pic2, setPic2] = useState('')
    const [url, setUrl] = useState('');
    const [loader, setLoader] = useState(false)

    const topCat1 = useRef(0)
    const topCat2 = useRef(0)
    const cat1 = useRef(0)
    const cate2 = useRef(0)
    const image = useRef(0)

    const categoryies2 = [['Biscuit', 'Noodle', 'Sauce', 'Bhujia & Mixture', 'Rusk'], ['Dryfruits'], ['Tea', 'Coffee'], ['Dal', 'Rice']];

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

    }, [router.query])


    // on change 
    const handleChange = (e) => {
        if (e.target.name == 'title') {
            setTitle(e.target.value)
        }
        else if (e.target.name == 'slug') {
            setSlug(e.target.value)
        }
        else if (e.target.name == 'size') {
            setSize(e.target.value)
        }
        else if (e.target.name == 'size2') {
            setSize2(e.target.value)
        }
        else if (e.target.name == 'availableOty') {
            setAvailableQty(e.target.value)
        }
        else if (e.target.name == 'price') {
            setPrice(e.target.value)
        }
        else if (e.target.name == 'price2') {
            setPrice2(e.target.value)
        }
        else if (e.target.name == 'desc') {
            setDesc(e.target.value)
        }
        else if (e.target.name == 'search') {
            setProdId(e.target.value)
        }
        else if (e.target.name == 'image') {
            setImage(e.target.files[0])
        }
    }

    // on cat1 select 
    const cat1Select = (e) => {
        if (e.target.value == 'Biscuits-and-Snacks') {
            setCategory1(e.target.value)
            setCat2(categoryies2[0])
        }
        else if (e.target.value == 'Dryfruits') {
            setCategory1(e.target.value)
            setCat2(categoryies2[1])
        }
        else if (e.target.value == 'Tea-and-Coffee') {
            setCategory1(e.target.value)
            setCat2(categoryies2[2])
        }
        else if (e.target.value == 'Dal-and-Rice') {
            setCategory1(e.target.value)
            setCat2(categoryies2[3])
        }
        else if (e.target.value == 'Masala') {
            setCategory1(e.target.value)
            setCat2(categoryies2[3])
        }
        else if (e.target.value == 'Atta') {
            setCategory1(e.target.value)
            setCat2(categoryies2[3])
        }
        else if (e.target.value == 'Oil-and-Ghee') {
            setCategory1(e.target.value)
            setCat2(categoryies2[3])
        }
        else if (e.target.value == 'Salt-and-Sugar') {
            setCategory1(e.target.value)
            setCat2(categoryies2[3])
        }
        else if (e.target.value == 'Personal-and-Babycare') {
            setCategory1(e.target.value)
            setCat2(categoryies2[3])
        }
        else if (e.target.value == 'Cleaning-and-Household') {
            setCategory1(e.target.value)
            setCat2(categoryies2[3])
        }
        else if (e.target.value == ' Pooja-path') {
            setCategory1(e.target.value)
            setCat2(categoryies2[3])
        }
    }

    // choose cat2 
    const cat2Select = (e) => {
        setCategory2(e.target.value)
    }

    // choose top category 
    const chooseTopcat = (e) => {
        if (e.target.value == "yes") {
            setTopCat('yes')
        }
        else {
            setTopCat('no')
        }
    }

    // on submit 
    const addProduct = async (e) => {
        e.preventDefault()

        if (title == '') {
            toast.info('Please Enter Title', {
                position: "top-left",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return
        }
        else if (slug == '') {
            toast.info('Please Enter Slug', {
                position: "top-left",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return
        }
        else if (prodId == '') {
            toast.info('Please search product for update!', {
                position: "top-left",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return
        }
        else if (category1 == '') {
            toast.info('Please Enter Category-1', {
                position: "top-left",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return
        }
        else if (category2 == '') {
            toast.info('Please Enter Category-2', {
                position: "top-left",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return
        }
        else if (size == '') {
            toast.info('Please Enter Size', {
                position: "top-left",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return
        }
        else if (availableQty == '') {
            toast.info('Please Enter Available-Quantity', {
                position: "top-left",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return
        }
        else if (price == '') {
            toast.info('Please Enter Price', {
                position: "top-left",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return
        }
        else if (desc == '') {
            toast.info('Please Enter Description', {
                position: "top-left",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return
        }
        else if (size2 != '' && price2 == '') {
            toast.info('Please Enter Price2', {
                position: "top-left",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return
        }

        // fetch api 
        let data = { title, slug, url, category1, category2, topCategory, size, size2, availableQty, price, price2, desc }
        let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updateProduct`, {
            method: "POST", // or 'PUT'
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ prodId, data })
        });

        let res = await a.json()
        if (res.success == true) {
            toast.success('Product Update Successfully', {
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
        else if(res.success == false){
            toast.error('Product not found!', {
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
            toast.error('Product did not Update Successfully', {
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
    }

    // get one product 
    const searchProd = async (e) => {
        e.preventDefault()

        // fetch product 
        let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getProduct`, {
            method: "POST", // or 'PUT'
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ prodId })
        });

        let res = await a.json()
        if (res.success) {
            setTitle(res.products.title)
            setSlug(res.products.slug)
            setSize(res.products.size)
            setSize2(res.products.size2)
            setCategory1(res.products.category1)
            setCategory2(res.products.category2)
            setAvailableQty(res.products.availableQty)
            setTopCat(res.products.topCategory)
            setPrice(res.products.price)
            setPrice2(res.products.price2)
            setDesc(res.products.desc)
            setPic2(res.products.img)
            // set categories 
            setInpCat(res.products.category1)
            setInpCat2(res.products.category2)

            // set radio button 
            if (res.products.topCategory == 'yes') {
                topCat1.current.checked = true
            } else {
                topCat2.current.checked = true
            }
        }
        else {
            toast.error('Product Not Found', {
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
    }

    // change cat 2 element 
    const changeCat2 = () => {
        setCateg2(false)
    }

    const changeCat = () => {
        setCateg(false)
    }

    // cancel 
    const cancel = (e) => {
        e.preventDefault()

        toast.info('Product did not Update Successfully', {
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

    // upload image on cloud 
    const uploadImage = (e) => {
        e.preventDefault()
        setLoader(true)
        setPic(false)
        const data = new FormData()

        data.append("file", img)
        data.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET_NAME)
        data.append("cloud_name", process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME)

        // fetch 
        fetch(`https://api.Cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, {
            method: "post",
            body: data
        }).then(resp => resp.json()).then(data => {
            setUrl(data.url)
            setLoader(false)
            setPic(true)
            setPic2(data.url)
            toast.success('Image upload successfully', {
                position: "top-left",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }).catch(err => {
            console.log(err)
            setLoader(false)
            setPic(false)
            toast.error('Image did not upload successfully!', {
                position: "top-left",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        })

    }


    return (
        <section className={styles.section}>
            {/* side nav  */}
            <div>
                <AdminSideNav></AdminSideNav>
            </div>

            {/* main page  */}
            <div className={styles.addProductDiv}>
                <div className={styles.conatiner}>
                    {/* heading  */}
                    <h1>Update Product</h1>

                    {/* form  */}
                    <form action="#" method='POST' required className={styles.form} spellCheck={false} autoComplete='on' >
                        {/* search  */}
                        <div className={styles2.search}>
                            <label htmlFor="search"></label>
                            <input onChange={handleChange} className={styles2.inpSearch} value={prodId} type="search" name='search' placeholder='Enter Product Id' id='search' />

                            {/* button  */}
                            <button onClick={searchProd} >Search</button>
                        </div>
                        {/* title  */}
                        <div className={styles.inpDiv}>
                            <label htmlFor="name">Title</label>
                            <input onChange={handleChange} value={title} type="text" name="title" id="title" className={styles.userInput} />
                        </div>

                        {/* slug  */}
                        <div className={styles.inpDiv}>
                            <label htmlFor="email">Slug</label>
                            <input onChange={handleChange} value={slug} type="text" name='slug' className={styles.userInput} />
                        </div>

                        {/* image */}
                        <div className={styles2.imgContainer}>
                            <div className={styles2.inpImageFile}>
                                <label htmlFor="image">Image</label>
                                <input ref={image} onChange={handleChange} type="file" id="image" name="image" accept="image/png, image/jpeg, image/jpg" />

                                {/* upload image  */}
                                <div className={styles.imgFiles}>
                                    <button onClick={uploadImage} className={styles.uploadButton}>Upload</button>
                                    {/* loader */}
                                    {loader == true && <ThreeDots
                                        visible={true}
                                        height="40"
                                        width="40"
                                        color="#4fa94d"
                                        radius="9"
                                        ariaLabel="three-dots-loading"
                                        wrapperStyle={{}}
                                        wrapperClass=""
                                    />}
                                    {/* image  */}
                                    {pic == true && <img src="/check.png" alt="img" width={25} height={25} />}
                                </div>
                            </div>

                            <div className={styles2.img}><img alt='image' src={pic2} width={100} height={100} /></div>
                        </div>

                        {/* category-1 */}
                        <div className={styles.inpDiv}>
                            <label htmlFor="category1">Choose Category 1:</label>
                            {/* changable  */}
                            {categ == true && <input readOnly type="text" name='category2' id='category2' value={inpCat} className={styles.userInput} />}
                            {categ == true && <span onClick={changeCat} className={styles2.update}>Update</span>}

                            {/* not changable  */}
                            {categ == false && <select ref={cat1} id='category1' name='category1' placeholder='Category-1' onChange={cat1Select} className={styles.category}>
                                <option hidden selected>Category-1</option>
                                <option value="Biscuits-and-Snacks">Biscuits & Snacks</option>
                                <option value="Dryfruits">Dryfruits</option>
                                <option value="Tea-and-Coffee">Tea & Coffee</option>
                                <option value="Dal-and-Rice">Dal & Rice</option>
                                <option value="Masala">Masala</option>
                                <option value="Atta">Atta</option>
                                <option value="Oil-and-Ghee">Oil & Ghee</option>
                                <option value="Salt-and-Sugar">Salt & Sugar</option>
                                <option value="Personal-and-Babycare">Personal & Baby care</option>
                                <option value="Cleaning-and-Household">Cleaning & Household</option>
                                <option value="Pooja-path">Pooja-path</option>
                            </select>}
                        </div>

                        {/* category-2 */}
                        <div className={styles.inpDiv}>
                            <label htmlFor="category2">Choose Category 2:</label>
                            {/* changable  */}
                            {categ2 == true && <input readOnly type="text" name='category2' id='category2' value={inpCat2} className={styles.userInput} />}
                            {categ2 == true && <span onClick={changeCat2} className={styles2.update}>Update</span>}

                            {/* not changable  */}
                            {categ2 == false && <select ref={cate2} id='category2' onChange={cat2Select} name='category2' className={styles.category}>
                                <option hidden selected>Category-2</option>
                                {cat2.map((cat, i) => {
                                    return <option key={i} value={cat}>{cat}</option>
                                })}
                            </select>}
                        </div>

                        {/* top-category */}
                        <div className={styles.inpRadio}>
                            <span>Top Category</span>
                            <div>
                                <input ref={topCat1} onClick={chooseTopcat} type='radio' name='topCat' value='yes' id='topCat' />
                                <label htmlFor="topCat">Yes</label>
                            </div>

                            <div>
                                <input ref={topCat2} type='radio' onClick={chooseTopcat} defaultChecked value='no' name='topCat' id='topCat' />
                                <label htmlFor="topCat">No</label>
                            </div>
                        </div>

                        {/* size */}
                        <div className={styles.inpDiv}>
                            {/* size1  */}
                            <label htmlFor="size">Size1</label>
                            <input onChange={handleChange} value={size} type="text" name='size' className={styles.userInput} />

                            {/* size2  */}
                            <label htmlFor="size2">Size2</label>
                            <input onChange={handleChange} value={size2} type="text" name='size2' className={styles.userInput} />
                        </div>

                        {/* available-qty */}
                        <div className={styles.inpDiv}>
                            <label htmlFor="availableQty">Available Quantitity</label>
                            <input onChange={handleChange} value={availableQty} type="number" name='availableOty' className={styles.userInput} />
                        </div>

                        {/* price */}
                        <div className={styles.inpDiv}>
                            {/* price1  */}
                            <label htmlFor="price">Price1</label>
                            <input onChange={handleChange} value={price} type="text" name='price' className={styles.userInput} />

                            {/* price2  */}
                            <label htmlFor="price">Price2</label>
                            <input onChange={handleChange} value={price2} type="text" name='price2' className={styles.userInput} />
                        </div>

                        {/* description  */}
                        <div className={styles.inpDiv}>
                            <label htmlFor="desc">Description</label>
                            <textarea className={styles.desc} onChange={handleChange} value={desc} name="desc" id="desc" cols="5" rows="8" placeholder='Enter Product Description...'></textarea>
                        </div>

                        <div className={styles2.button}>
                            {/*  update-btn  */}
                            <button className={styles.addBtnContainer} onClick={addProduct}>Update</button>
                            {/* cancel-button  */}
                            <button className={styles2.cancelButton} onClick={cancel}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default UpdateProduct