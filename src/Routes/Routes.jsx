import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Home from '../pages/Home';
import Login from '../pages/Accounts/Login';
import Signup from '../pages/Accounts/Signup';

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
             path:"/Login",
             element:<Login/>
          },
          {
            path:"/Register",
            element:<Signup />
          }

        ]
    }
])

export default router;
