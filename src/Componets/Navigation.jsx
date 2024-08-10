import React, { useContext, useEffect, useState } from 'react';
import logo from "../assest/png/logo-color.png";
import SearchIcon from '@mui/icons-material/Search';
import { Avatar, Box, Button, IconButton, Menu, MenuItem, TextField, Tooltip, Typography } from '@mui/material';
import { FaShoppingCart } from "react-icons/fa";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { setUserDetails } from '../Store/UserSlice';

import Roles, { apiurl } from '../../Constants/apiurl';
import "./Navigation.css"
import EmartContext from '../Context/Context';
import axios from "axios"



const Navigation = () => {
    const dispatch = useDispatch();
    const User = useSelector(state => state?.User?.User);


    const [menuDisplay, setMenuDisplay] = useState(false)

    const navigate = useNavigate();

    const Emart = useContext(EmartContext)

    const fetchCartCount = Emart.fetchCartCount

    const searchInput = useLocation();
    const URLSearch = new URLSearchParams(searchInput?.search);
    const searchQuery = URLSearch.get("product") || "";
    const [search, setSearch] = useState(searchQuery);


    useEffect(() => {
        if (!User?.role === Roles.ADMIN) {
            navigate("/")
        }
    }, [User])

    useEffect(() => {
        fetchCartCount()
    }, [])


    const handleLogout = async () => {
        try {
            const response = await axios.post(`${apiurl}/Logout`, {}, {
                withCredentials: true,
            });
    
            console.log(response);
    
            if (response.data.success) { 
                toast.success(response.data.message);
                localStorage.removeItem('login');
                localStorage.removeItem('usertoken');
                dispatch(setUserDetails(null));
                navigate("/"); 
            }
        } catch (err) {
            toast.error("An error occurred during logout");
        }
    };
    
    const handleSearch = (e) => {
        const { value } = e.target;
        setSearch(value);
        if (value) {
            navigate(`/Search?product=${value}`);
        } else {
            navigate("/");
        }
    };


    const handlelogoclick = () => {
        navigate("/")
        setSearch("")
    }
    return (
        <header className='h-20 shadow-md bg-white w-full'>
            <div className='container mx-auto flex items-center px-10 pb-4 h-full justify-between'>
                <div className='flex items-center' style={{ marginTop: "10px" }}>
                    <img src={logo} alt="Logo" className="h-20 w-20" onClick={handlelogoclick} />
                </div>
                <div className='hidden lg:flex items-center w-full justify-between max-w-sm focus-within:shadow-lg '>
                    <TextField label="search here....." className='w-full outline-none' onChange={handleSearch} value={search} />
                    <div className='w-13 min-w-[50px] h-14 bg-blue-500  flex items-center justify-center rounded-l-sm' >
                        <SearchIcon className='text-white cursor-pointer' />
                    </div>

                </div>






                <div className='flex items-center gap-7'>
                    <div className='cursor-pointer'>
                        <div className='relative flex justify-center'>

                            {
                                User?._id && (
                                    <div className='text-3xl cursor-pointer relative flex justify-center mix-blend-multiply' onClick={() => setMenuDisplay(preve => !preve)}>
                                        <Avatar src="/broken-image.jpg" />
                                    </div>
                                )

                            }


                            {
                                menuDisplay && (
                                    <div className='absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded' >
                                        <nav>
                                            {User?.role === Roles.ADMIN && (
                                                <Link to={"/AdminPanel/AllProducts"} className='whitespace-nowrap hidden md:block hover:bg-slate-100 p-2' onClick={() => setMenuDisplay(preve => !preve)}>Admin Panel</Link>

                                            )}
                                            <Link to={"/Order"} className='whitespace-nowrap hidden md:block hover:bg-slate-100 p-2'onClick={() => setMenuDisplay(preve => !preve)}>My Orders</Link>

                                        </nav>
                                    </div>
                                )
                            }

                        </div>


                    </div>
                    {User?._id && (
                        <Link to={"/Cart"} className='text-2xl relative'>
                            <span> <FaShoppingCart /></span>

                            <div className='bg-blue-600 text-white w-5 h-5 p-1 flex items-center justify-center rounded-full absolute -top-2 -right-3' >
                                <Typography>
                                    {Emart?.cartProductCount}
                                </Typography>
                            </div>


                        </Link>
                    )}


                    <div>
                        {
                            User?._id ? (
                                <button onClick={handleLogout}>Logout</button>

                            )
                                : (
                                    <button><Link to={"/Login"} className='px-3 py-1 rounded-full'>Login</Link></button>
                                )
                        }

                    </div>

                </div>
            </div>
        </header>
    )
}

export default Navigation
