import React from 'react'
import Success from "../assest/payments/paymentsuccess.gif"
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const PaymentSucess = () => {

    const navigate =  useNavigate();

  const handleorder = () => {
    navigate('/Order');
     
  }


  return (
    <div className='flex w-full max-w-lg mx-auto justify-center items-center flex-col p-4'>
        <img src={Success} alt='Payment Successful'  className=''/>


       
        <Button variant='contained' className='w-48' color='success' onClick={handleorder}>Order Page</Button>
    </div>
  )
}

export default PaymentSucess