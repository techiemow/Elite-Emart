import { Select, Typography, MenuItem, Button } from '@mui/material';
import React, { useState } from 'react';

import { IoMdClose } from 'react-icons/io';
import axios from 'axios';
import { toast } from 'react-toastify';
import Roles, { apiurl } from '../../Constants/apiurl';

const UserRole = ({ name, email, role, userId, onClose, callFunc }) => {
  const [selectedRole, setSelectedRole] = useState(role);

  const handleChange = (event) => {
    setSelectedRole(event.target.value);
  };

  const updateRole = async () => {
    try {
      const response = await axios.put(`${apiurl}/UpdateUser`, {
        userId: userId,
        role: selectedRole
      }, {
        withCredentials: true
      });
      console.log("role", response.data);
      if (response.data.success) {
        toast.success(response.data.message);
        onClose();
        callFunc();
        window.location.reload();
      }
    } catch (error) {
      toast.error("Failed to update role: " + error.message);
    }
  };

  return (
    <div className='fixed top-0 bottom-0 left-0 right-0 w-full h-full z-10 flex justify-between items-center bg-slate-400 bg-opacity-50'>
      <div className='mx-auto bg-white shadow-md p-4 w-full max-w-sm'>
        <button className='block ml-auto' onClick={onClose}>
          <IoMdClose />
        </button>
        <h1 className='pb-3 text-lg font-mono'>
          User Role
        </h1>
        <Typography className='font-mono'>
          Name: {name}
        </Typography>
        <Typography className='font-mono'>
          Email: {email}
        </Typography>
        <div className='flex items-center justify-between my-4'>
          <p>Role:</p>
          <select className='border px-4 py-1' value={selectedRole} onChange={handleChange}>
            {Object.values(Roles).map(el => (
              <option value={el} key={el}>{el}</option>
            ))}
          </select>
        </div>
        <button className='w-fit mx-auto block py-1 px-3 rounded-full bg-red-600 text-white hover:bg-red-700' onClick={updateRole}>
          Change Role
        </button>
      </div>
    </div>
  );
};

export default UserRole;
