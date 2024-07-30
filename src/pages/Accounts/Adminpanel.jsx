import { Avatar, Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link, NavLink, Outlet } from 'react-router-dom';

const AdminPanel = () => {
    const User = useSelector((state) => state?.User?.User);

    if (!User) {
        return <div>Loading...</div>; // Or any loading indicator
    }

    return (
        <div className="min-h-[calc(100vh-100px)] flex boxshadow">
            <aside className="bg-white min-h-full w-full max-w-60 rounded-md">
                <div className="bg-red-500 h-32 flex items-center justify-center flex-col">
                    <div className="text-5xl cursor-pointer flex justify-center">
                        <Avatar src="/broken-image.jpg" />
                    </div>
                    <Typography className="capitalize text font-semibold">
                        {User.username}
                    </Typography>
                    <Typography className="text-sm">{User?.role}</Typography>
                </div>
                <div>
                  <nav className='grid'>
                    <Link to={"AllUsers"} className='px-2 py-1 hover:bg-slate-100' >All Users</Link>
                    <Link to={"Products"}className='px-2 py-1 hover:bg-slate-100'>Products</Link> 
                  </nav>
                </div>
            </aside>
            <main className='w-full h-full p-2'>
            <Outlet/>
        </main>
        </div>
    );
};

export default AdminPanel;
