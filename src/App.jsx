import React, { useEffect, useState } from 'react'
import "./App.css"
import { Outlet } from 'react-router-dom'
import Navigation from './Componets/Navigation'
import Footer from './Componets/Footer'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import { apiurl } from '../Constants/apiurl'
const App = () => {
  const [userDetails, setUserDetails] =useState("");
    
  const fetchUserDetails = async()=>{
    const dataResponse = await axios.get(`${apiurl}/UserDetails`,{
      withCredentials:true,
    })
    console.log(dataResponse);

    const dataApi = dataResponse.data.data

    if(dataApi.success){
      setUserDetails(dataApi)
      console.log(userDetails);
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