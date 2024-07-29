import React from 'react'
import "./App.css"
import { Outlet } from 'react-router-dom'
import Navigation from './Componets/Navigation'
import Footer from './Componets/Footer'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const App = () => {
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