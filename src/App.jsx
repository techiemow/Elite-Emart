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
import EmartContext from './Context/Context'




const App = () => {
  

  
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [cartProductCount,setCartProductCount] = useState(0)

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
   
  const fetchCartCount = async() =>{
    try{
      const datares = await axios.get(`${apiurl}/CountCartPerUser`,{
        withCredentials: true,
      })
      
      if(datares.data.success){
       
        setCartProductCount(datares?.data?.data?.count)
      }
    }
    catch(error){
      console.error('Failed to fetch cart count:', error);
      toast.error('Failed to fetch cart count');
    }

  }
  useEffect(() => {
  fetchUserDetails();


  fetchCartCount(); // To be implemented when API is ready. For now, it's commented out.
  }, []);

  
  



  return (
    <div>
     <EmartContext.Provider value={{
          fetchUserDetails, // user detail fetch 
          cartProductCount, // current user add to cart product count,
          fetchCartCount
      }}>
    <ToastContainer position="top-center" autoClose={5000} />
    <div className='source'>
    <Navigation />
    </div>
    {isLoading ? (
      <div className="loading">Loading...</div>
    ) : (
      <main className='min-h-[calc(100vh-120px)] source'>
        <Outlet />
    
      </main>
    )}
    <Footer />
    </EmartContext.Provider>
  </div>
  )
}

export default App