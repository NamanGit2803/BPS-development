import React from 'react'
import Router, { useRouter } from 'next/router'
import { useState } from 'react'

const Products = ({searchParams}) => {

    const router = useRouter()
    const [first, setFi] = useState([])
    console.log(router.query)



  return (
    <div>Products</div>
  )
}

export default Products