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
  
   const username = localStorage.getItem('login')
  
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  const fetchUserDetails = async () => {
    try {
      const dataResponse = await axios.get(`${apiurl}/UserDetails`, {
        withCredentials: true,
      });
      console.log('user', dataResponse.data.data);
      if (dataResponse.data.success) {
        dispatch(setUserDetails(dataResponse.data.data));
      }
    } catch (error) {
      console.error('Failed to fetch user details:', error);
      toast.error('Failed to fetch user details');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, [username]);
  



  return (
    <div>
    <ToastContainer position="top-right" autoClose={5000} />
    <Navigation />
    {isLoading ? (
      <div className="loading">Loading...</div>
    ) : (
      <main className='min-h-[calc(100vh-110px)] source'>
        <Outlet />
      </main>
    )}
    <Footer />
  </div>
  )
}

export default App