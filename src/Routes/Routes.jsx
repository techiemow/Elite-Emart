import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Home from '../pages/Home';
import Login from '../pages/Accounts/Login';
import Signup from '../pages/Accounts/Signup';
import ForgotPassword from '../pages/Accounts/ForgotPassword';
import Adminpanel from '../pages/Accounts/Adminpanel';
import AllUsers from '../pages/Accounts/AllUsers';
import Allproducts from '../Componets/Products/Allproducts';
import CategoryProduct from '../Componets/CatagoryProduct';
import ProductDetails from '../Componets/ProductDetails';



const router = createBrowserRouter([
    {
        path: "/",
        element:<App/>,
        children: [
          {
            path: "/",
            element: <Home />
          },

          {
            path:"ForgotPassword",
            element:<ForgotPassword />

          },
          {path:"CategoryProduct/:CategoryName",
            element:<CategoryProduct />

          },
          {
            path:"Product/:id",
            element:<ProductDetails />
          },
          {
            path: "AdminPanel",
            element: <Adminpanel />,
            children:[
              {
                path: "AllUsers",  // Relative path
                element: <AllUsers />
              },
              {
                path: "AllProducts",  // Relative path
                element: <Allproducts />
              }
              
            ]
          }

        ]
    },
    {
        path:"/Login",
        element:<Login/>
    },
            
    {
      path:"/Register",
      element:<Signup />
    },
])

export default router;
