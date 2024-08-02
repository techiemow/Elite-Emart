import React from 'react'
import { useNavigate } from 'react-router-dom';
import failure from "../assest/payments/failure.webp"
import { Button } from '@mui/material';


const PaymentFailure = () => {
    const navigate =  useNavigate();

  const handleorder = () => {
    navigate('/Cart');
     
  }


  return (
    <div className='flex w-full max-w-lg mx-auto justify-center items-center flex-col p-4 bg-slate-200'>
        <img src={failure} alt='Payment Successful' className='mix-blend-multiply'/>

        <h1 className='text-2xl text-red-600 mb-2'>Payment Canceled!</h1>
        <button  className='text bg-red-600 hover:bg-red-700 text-white px-3 py-0.5 rounded-full' color='' onClick={handleorder}>Go To Cart</button>
    </div>
  )
}

export default PaymentFailure