import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { apiurl } from '../../../Constants/apiurl';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import moment from 'moment';
import { MdModeEdit } from 'react-icons/md';
import UserRole from '../../Componets/UserRole';
const AllUsers = () => {
    const [allUsers, setAllUsers] = useState([]);
    const [error, setError] = useState(null);
    const [openUpdateRole,setOpenUpdateRole] = useState(false)
    const [updateUserDetails,setUpdateUserDetails] = useState({
        emailaddress : "",
        username : "",
        role : "",
        _id  : ""
    })

    const fetchUsers = async () => {
        try {
            const response = await axios.get(`${apiurl}/Users`, {
                withCredentials: true,
            });
            setAllUsers(response.data.data);
            console.log('Fetched users:', response.data.data);
        } catch (error) {
            setError("Error fetching users: " + error.message);
            console.error("Error fetching users:", error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div>
        {/* <h1>All Users</h1>
        {error && <p>{error}</p>}
        <ul>
            {allUsers.map((user, index) => (
                <li key={index}>{user.username}</li>  // Adjust this according to your actual data structure
            ))}
        </ul> */}

            <TableContainer component={Paper} sx={{ maxWidth: 800, margin: 'auto' }}>
            
            <Table>
        <TableHead >
        <TableRow sx={{ bgcolor: 'black', color: 'white' }}>
                            <TableCell sx={{ color: 'white' }}>ID</TableCell>
                            <TableCell sx={{ color: 'white' }}>Name</TableCell>
                            <TableCell sx={{ color: 'white' }}>Email</TableCell>
                            <TableCell sx={{ color: 'white' }}>Role</TableCell>
                            <TableCell sx={{ color: 'white' }}>Created Date</TableCell>
                            <TableCell sx={{ color: 'white' }}>Edit</TableCell>
                        </TableRow>
        </TableHead>
        <TableBody>
          {allUsers.map((user, index) => (
            <TableRow key={index}>
                
                
                <TableCell>{index+1}</TableCell>
        
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.emailaddress}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>{moment(user.createdAt).format("ll")}</TableCell>
              <TableCell>
                <button onClick={() => {
                    setUpdateUserDetails(user)
                    setOpenUpdateRole(true)}}
                    className='bg-yellow-100 p-3 cursor-pointer hover:bg-yellow-400 hover:text-white'
                   
                    ><MdModeEdit/></button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
           
            </TableContainer>
            
           {
             openUpdateRole && (
             <UserRole  
             onClose={()=>{setOpenUpdateRole(false)}}
             name={updateUserDetails.username}
             email={updateUserDetails.emailaddress}
             role={updateUserDetails.role}
             userId={updateUserDetails._id}
             callFunc={fetchUsers}

             
             /> 
             )
           }

    </div>
    );
};




export default AllUsers;
