import React from 'react'
import "./App.css"
import { Outlet } from 'react-router-dom'
import Navigation from './Componets/Navigation'
import Footer from './Componets/Footer'
const App = () => {
  return (
    <div>
      <Navigation/>
   <Outlet/>
   <Footer/>
    </div>
  )
}

export default App