import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Home from '../pages/Home';
import Login from '../pages/Accounts/Login';
import Signup from '../pages/Accounts/Signup';
import ForgotPassword from '../pages/Accounts/ForgotPassword';
import Adminpanel from '../pages/Accounts/Adminpanel';

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
            path:"/ForgotPassword",
            element:<ForgotPassword />

          },
          {
            path: "/AdminPanel",
            element: <Adminpanel />
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
