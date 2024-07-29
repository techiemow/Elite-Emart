import React, { useEffect, useState } from 'react'
import "./App.css"
import { Outlet } from 'react-router-dom'
import Navigation from './Componets/Navigation'
import Footer from './Componets/Footer'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import { apiurl } from '../Constants/apiurl'
import { setUserDetails } from './Store/UserSlice'
import { useDispatch } from 'react-redux'
const App = () => {
  
  const dispatch = useDispatch();
    
  const fetchUserDetails = async()=>{
    const dataResponse = await axios.get(`${apiurl}/UserDetails`,{
      withCredentials:true,
    })
    console.log(dataResponse.data.data);

   

    if(dataResponse.data.success){
      dispatch(setUserDetails(dataResponse.data.data));
      
    }
}

useEffect(() => {
 

fetchUserDetails();

} ,[])




  return (
    <div>
      <ToastContainer position="top-right" autoClose={5000} />
      <Navigation/>
      <main className='min-h-[calc(100vh-100px)]'>
      <Outlet/>
      </main>
      <Footer/>
    </div>
  )
}

export default App