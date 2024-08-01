import React from 'react'
import { useLocation, useParams } from 'react-router-dom'

const CategoryProduct = () => {

    const CategoryName = useParams()
    // const urlSearch = new URLSearchParams(location.search)
    console.log("location",);
  return (

    <div>{CategoryName?.CategoryName}</div>
  )
}

export default CategoryProduct