import React, { useState } from 'react'
import "./allproducts.css"
import Uploadproducts from './Uploadproducts'
const Allproducts = () => {
  const [UploadProduct,setUploadProduct] = useState(false)
  const [allProduct,setAllProduct] = useState([])
  return (
    <div>
      <div className='bg-white py-2 px-4 flex justify-between items-center'>
        <h2 className='font-bold text-lg'>All Product</h2>
        <button className='Upload' onClick={()=>{setUploadProduct(true)}}> Upload product
        </button>
        </div>
        { UploadProduct && (
        <Uploadproducts open={UploadProduct} onClose = {()=>{setUploadProduct(false)}}/>
        )}
    </div>
  )
}

export default Allproducts