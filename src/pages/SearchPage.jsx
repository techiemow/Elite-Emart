import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { apiurl } from '../../Constants/apiurl';
import ColoumCard from '../Componets/ColoumCard';


const SearchPage = () => {

   const [data,setdata] =useState([])
   const [IsLoading,setIsLoading] = useState(false)
    const query = useLocation();

    
    const fetchProduct = async() =>{
            setIsLoading(true)
            const response = await axios.get(`${apiurl}/SearchProduct`+query.search)
             setIsLoading(false)
        
             
            setdata(response.data.data)
    }      

    useEffect (() => {
        fetchProduct(); 
        console.log(data);
        
    },[query])

  return (
    <div className='container mx-auto p-4'>
    {
      IsLoading && (
        <p className='text-lg text-center'>Loading ...</p>
      )
    }

    <p className='text-lg font-semibold my-3'>Search Results : {data.length}</p>

    {
      data.length === 0 && !IsLoading && (
         <p className='bg-white text-lg text-center p-4'>No Data Found....</p>
      )
    }


     {
      data.length !==0 && !IsLoading && (
        <ColoumCard IsLoading={ IsLoading} productData={data}/>
       
      )
    } 

  </div>
  )
}

export default SearchPage