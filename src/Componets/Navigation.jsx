import React, { useState } from 'react'
import logo from "../assest/logo.png"
import SearchIcon from '@mui/icons-material/Search';
import { Avatar, Box, Button, IconButton, Menu, MenuItem, TextField, Tooltip, Typography } from '@mui/material';
import { LuUserCircle2 } from "react-icons/lu";
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { toast } from 'react-toastify';
import  Cookies from "js-cookie"
import { setUserDetails } from '../Store/UserSlice';


const Navigation = () => {
      
    const dispatch = useDispatch();
    const User = useSelector(state => state?.User.User)
    console.log(User);

    
    
    const pages = ["Sign Up", "Login"];
    const settings = ['My Account', "My Bookings", 'Logout'];

    const [anchorElNav, setAnchorElNav] = useState  (null);
    const [anchorElUser, setAnchorElUser] = useState(null);

    const username = localStorage.getItem('login') || '';
    const navigate = useNavigate();

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const handlePageClick = (page) => {
        switch (page) {
            case 'Sign Up':
                navigate('/Register');
                break;
            case 'Login':
                navigate('/Login');
                break;
            default:
                break;
        }
        handleCloseNavMenu();
    };

    const handleSettingClick = async(setting) => {
        switch (setting) {
            case 'My Account':
                navigate('/MyAccount');
                break;
            case 'My Bookings':
                navigate('/MyBookings');
                break;
            case 'Logout':
            
                    toast.success("Logged out successfully")
                    localStorage.removeItem('login');
                    localStorage.removeItem('usertoken');
                    Cookies.remove("token");
                    dispatch(setUserDetails(null))
                    navigate("/");
                    break;
                

               
        
            default:
                break;
        }
        handleCloseUserMenu();
    };
  return (
    <header className=' shadow-md bg-white'>
        <div className='container mx-auto flex items-center px-10 pb-4 h-full justify-between'>
            <div className='flex items-center' style={{marginTop:"10px"}}>
                <img src={logo} alt="Logo" className="h-16" onClick={()=>navigate("/")} />
            </div>
            <div className='hidden lg:flex items-center w-full justify-between max-w-sm focus-within:shadow-lg '>
            <TextField  label="search products here....."  className='w-full outline-none' />
            <div className='w-13 min-w-[50px] h-14 bg-blue-500  flex items-center justify-center rounded-l-sm'>
            <SearchIcon className='text-white'/>
            </div>
             
            </div>






            <div className='flex items-center gap-4'> 
            <div className='text-3xl cursor-pointer'>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end' }}>
                        {username.length === 0 ? (
                            pages.map((page) => (
                                <Button
                                    
                                    variant='contained'
                                    key={page}
                                    onClick={() => handlePageClick(page)}
                                    sx={{mx:2, my: 2, color: 'white', display: 'block' }}
                                >
                                    {page}
                                </Button>
                            ))
                        ) : (
                            <Box>
                           
                            </Box>
                        )}
                    </Box>

                    {username.length > 0 && (
            <Box sx={{ flexGrow: 0 , mx:"50px"}} >
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ px: 0 }}>
                                <Avatar src="/broken-image.jpg"  />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                {settings.map((setting) => (
                                    <MenuItem key={setting} onClick={() => handleSettingClick(setting)}>
                                        <Typography textAlign="center">{setting}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                    )}
            </div>
            <div className='text-2xl relative'>
               <span> <FaShoppingCart /></span>
               <div className='bg-blue-600 text-white w-5 h-5 p-1 flex items-center justify-center rounded-full absolute -top-2 -right-3' >
                <Typography>
                    <span>0</span> 
                </Typography>
               </div>
            </div>
             
            </div>
        </div>
    </header>
  )
}

export default Navigation
