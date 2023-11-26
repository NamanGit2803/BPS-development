import React from 'react'
import styles from '@/styles/adminAddProduct.module.css'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import AdminSideNav from '@/components/AdminSideNav'


const Add = () => {

  const router = useRouter()
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [img, setImage] = useState('')
  const [category1, setCategory1] = useState('')
  const [category2, setCategory2] = useState('')
  const [cat2, setCat2] = useState([])
  const [topCategory, setTopCat] = useState('no')
  const [size, setSize] = useState('')
  const [availableQty, setAvailableQty] = useState('')
  const [price, setPrice] = useState('')
  const [desc, setDesc] = useState('')

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
    else if (e.target.name == 'availableOty') {
      setAvailableQty(e.target.value)
    }
    else if (e.target.name == 'price') {
      setPrice(e.target.value)
    }
    else if (e.target.name == 'desc') {
      setDesc(e.target.value)
    }
    else if (e.target.name == 'image') {
      setImage(e.target.value)
    }
  }

  // on cat1 select 
  const cat1Select = (e) => {
    if (e.target.value == 'biscuits-and-snacks') {
      setCategory1(e.target.value)
      setCat2(categoryies2[0])
    }
    else if (e.target.value == 'dryfruits') {
      setCategory1(e.target.value)
      setCat2(categoryies2[1])
    }
    else if (e.target.value == 'tea-and-coffee') {
      setCategory1(e.target.value)
      setCat2(categoryies2[2])
    }
    else if (e.target.value == 'dal-and-rice') {
      setCategory1(e.target.value)
      setCat2(categoryies2[3])
    }
    else if (e.target.value == 'masala') {
      setCategory1(e.target.value)
      setCat2(categoryies2[3])
    }
    else if (e.target.value == 'atta') {
      setCategory1(e.target.value)
      setCat2(categoryies2[3])
    }
    else if (e.target.value == 'oil-and-ghee') {
      setCategory1(e.target.value)
      setCat2(categoryies2[3])
    }
    else if (e.target.value == 'salt-and-sugar') {
      setCategory1(e.target.value)
      setCat2(categoryies2[3])
    }
    else if (e.target.value == 'personal-and-babycare') {
      setCategory1(e.target.value)
      setCat2(categoryies2[3])
    }
    else if (e.target.value == 'cleaning-and-household') {
      setCategory1(e.target.value)
      setCat2(categoryies2[3])
    }
    else if (e.target.value == ' pooja-path') {
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
    else if (img == '') {
      toast.info('Please Enter Image', {
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
    else if (img == '') {
      toast.info('Please Enter Image', {
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

    // fetch api 
    let data = { title, slug, img, category1, category2, topCategory, size, availableQty, price, desc }
    let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/addproduct`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data })
    });

    let res = await a.json()
    
    if (res.success == true) {
      toast.success('Product add successfully', {
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
      if (res.error.includes('duplicate key error')) {
        toast.error('Product Already Exist in Database', {
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
        }, 2500)
      }
      else {
        toast.error('Product did not add successfully', {
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
        }, 2500);
      }
    }
  }


  return (
    <section className={styles.section}>
      <div>
        <AdminSideNav></AdminSideNav>
      </div>

      {/* add product section  */}
      <div className={styles.addProductDiv}>
        <div className={styles.conatiner}>
          {/* heading  */}
          <h1>Add a Product</h1>

          {/* form  */}
          <form action="#" method='POST' required className={styles.form} spellCheck={false} autoComplete='on' >
            {/* title  */}
            <div className={styles.inpDiv}>
              <label htmlFor="name">Title</label>
              <input onChange={handleChange} value={title} type="text" name="title" id="title" className={styles.userInput} required />
            </div>

            {/* slug  */}
            <div className={styles.inpDiv}>
              <label htmlFor="email">Slug</label>
              <input onChange={handleChange} value={slug} type="text" name='slug' className={styles.userInput} required />
            </div>

            {/* image */}
            <div className={styles.inpImageFile}>
              <label htmlFor="image">Image</label>
              <input onChange={handleChange} type="file" id="image" name="image" accept="image/png, image/jpeg, image/jpg" />
            </div>

            {/* category-1 */}
            <div className={styles.inpDiv}>
              <label htmlFor="category1">Choose Category 1:</label>
              <select id='category1' name='category1' placeholder='Category-1' defaultValue={"Category-1"} onChange={cat1Select} className={styles.category}>
                <option hidden >Category-1</option>
                <option value="biscuits-and-snacks">Biscuits & Snacks</option>
                <option value="dryfruits">Dryfruits</option>
                <option value="tea-and-coffee">Tea & Coffee</option>
                <option value="dal-and-rice">Dal & Rice</option>
                <option value="masala">Masala</option>
                <option value="atta">Atta</option>
                <option value="oil-and-ghee">Oil & Ghee</option>
                <option value="salt-and-sugar">Salt & Sugar</option>
                <option value="personal-and-babycare">Personal & Baby care</option>
                <option value="cleaning-and-household">Cleaning & Household</option>
                <option value="pooja-path">Pooja-path</option>
              </select>
            </div>

            {/* category-2 */}
            <div className={styles.inpDiv}>
              <label htmlFor="category2">Choose Category 2:</label>
              <select id='category2' onChange={cat2Select} name='category2' className={styles.category}>
                <option hidden selected>Category-2</option>
                {cat2.map((cat, i) => {
                  return <option key={i} value={cat}>{cat}</option>
                })}
              </select>
            </div>

            {/* top-category */}
            <div className={styles.inpRadio}>
              <span>Top Category</span>
              <div>
                <input onClick={chooseTopcat} type='radio' name='topCat' value='yes' id='topCat' required />
                <label htmlFor="topCat">Yes</label>
              </div>

              <div>
                <input type='radio' onClick={chooseTopcat} defaultChecked value='no' name='topCat' id='topCat' required />
                <label htmlFor="topCat">No</label>
              </div>
            </div>

            {/* size */}
            <div className={styles.inpDiv}>
              <label htmlFor="mobile">Size</label>
              <input onChange={handleChange} value={size} type="text" name='size' className={styles.userInput} required />
            </div>

            {/* available-qty */}
            <div className={styles.inpDiv}>
              <label htmlFor="mobile">Available Quantitity</label>
              <input onChange={handleChange} value={availableQty} type="number" name='availableOty' className={styles.userInput} required />
            </div>

            {/* price */}
            <div className={styles.inpDiv}>
              <label htmlFor="mobile">Price</label>
              <input onChange={handleChange} value={price} type="number" name='price' className={styles.userInput} required />
            </div>

            {/* description  */}
            <div className={styles.inpDiv}>
              <label htmlFor="desc">Description</label>
              <textarea className={styles.desc} onChange={handleChange} value={desc} name="desc" id="desc" cols="5" rows="8" placeholder='Enter Product Description...'></textarea>
            </div>

            {/*  submit-btn  */}
            <button className={styles.addBtnContainer} onClick={addProduct}>Submit</button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Add