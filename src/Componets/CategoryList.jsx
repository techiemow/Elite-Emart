import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {apiurl}  from "../../Constants/apiurl"
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6'
const CategoryList = () => {
    const [categoryProduct,setCategoryProduct] = useState([])
    const [loading,setLoading] = useState(false)

    const categoryLoading = new Array(13).fill(null)

    const fetchCategoryProduct = async() =>{
        setLoading(true)
        console.log(apiurl);
        const response = await axios.get(`${apiurl}/Categorylist`)
         console.log(response);
        setLoading(false)
        setCategoryProduct(response?.data?.data || [])
    }

    
    const scrollElement = useRef()
  const scrollRight = () => {
    scrollElement.current.scrollLeft += 300
  }
  const scrollLeft = () => {
    scrollElement.current.scrollLeft -= 300
  }


    useEffect(()=>{
        fetchCategoryProduct()
    },[])

  return (
    <div className='container mx-auto p-4'>
           <div className='flex items-center gap-4 justify-between overflow-auto scrollbar-none' ref={scrollElement}>
            
        <button className='bg-white shadow-md rounded-full p-1 absolute left-0 text-lg xl:hidden     ' onClick={scrollLeft}><FaAngleLeft /></button>
        <button className='bg-white shadow-md rounded-full p-1 absolute right-0 text-lg  xl:hidden' onClick={scrollRight}><FaAngleRight /></button>
            {

                loading ? (
                    categoryLoading.map((el,index)=>{
                            return(
                                <div className='h-16 w-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-slate-200 animate-pulse' key={"categoryLoading"+index}>
                                </div>
                            )
                    })  
                ) :
                (
                    categoryProduct.map((product,index)=>{
                        return(
                           
                            <Link to={`/CategoryProduct/?category=${product?.category}`} className='cursor-pointer' key={product?.category}>
                                <div className='w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden p-4 bg-slate-200 flex items-center justify-center'>
                                    <img src={product?.productImage[0]} alt={product?.category} className='h-full object-scale-down mix-blend-multiply hover:scale-125 transition-all'/>
                                </div>
                                <p className='text-center text-sm md:text-base capitalize'>{product?.category}</p>
                            </Link>
                        )
                    })
                )
            }
           </div>
    </div>
  )
}

export default CategoryList