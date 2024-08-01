import React, { useEffect, useState } from 'react'
import "./allproducts.css"
import Uploadproducts from './Uploadproducts'
import axios from 'axios'
import { apiurl } from '../../../Constants/apiurl'
import AdminProducts from './AdminProducts'
const Allproducts = () => {
  const [UploadProduct,setUploadProduct] = useState(false)
  const [allProduct,setAllProduct] = useState([])

   const fetchallproducts = async() =>{
     
    const response = await axios.get(`${apiurl}/GetProducts`)
    console.log("product data",response)

    setAllProduct(response?.data?.data || [])

   }

   useEffect(()=>{
   fetchallproducts();
   },[])




  return (
    <div>
      <div className='bg-white py-2 px-4 flex justify-between items-center'>
        <h2 className='font-bold text-lg'>All Product</h2>
        <button className='Upload' onClick={()=>{setUploadProduct(true)}}> Upload product
        </button>
        </div>
        <div className='flex items-center flex-wrap gap-5 py-4 h-[calc(100vh-190px)] overflow-y-scroll'>
        {
            allProduct.map((product,index)=>{
              return(
                <AdminProducts data={product} key={index+"allProduct"} fetchallproducts={fetchallproducts}/>
                
              )
            })
          }
        
      </div>
        { UploadProduct && (
        <Uploadproducts open={UploadProduct} onClose = {()=>{setUploadProduct(false)}} fetchallproducts={fetchallproducts}/>
        )}
    </div>
  )
}

export default Allproducts