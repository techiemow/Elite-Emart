import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  CircularProgress
} from '@mui/material';
import EmartContext from '../../Context/Context';
import { useSelector } from 'react-redux';

const MyProfile = () => {
  const { fetchUserDetails } = useContext(EmartContext);
  const [userDetails, setUserDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  // Get user details from Redux store
  const userFromRedux = useSelector(state => state?.User?.User);

  useEffect(() => {
    // Assuming userFromRedux has the user details
    if (userFromRedux) {
      setUserDetails(userFromRedux); // Set user details from Redux store
    }
    setLoading(false); // Set loading to false immediately after fetching
  }, [userFromRedux]); // Depend on userFromRedux

  if (loading) {
    return <CircularProgress />; // Show loading spinner while fetching
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>My Profile</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
          <TableCell style={{ fontWeight: 'bold', backgroundColor: '#3f51b5', color: 'white' }}>
                Field
              </TableCell>
              <TableCell style={{ fontWeight: 'bold', backgroundColor: '#3f51b5', color: 'white' }}>
                Value
              </TableCell>
          </TableHead>
          <TableBody>
            {Object.entries(userDetails)
              .filter(([key]) => !['password',"__v" ,"updatedAt"].includes(key)) // Exclude password
              .map(([key, value]) => (
                <TableRow key={key}>
                  <TableCell>{key}</TableCell>
                  <TableCell>{value}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Button 
        variant="contained" 
        color="primary" 
        style={{ marginTop: '20px' }}
        onClick={() => navigate('/')}
      >
        Back
      </Button>
    </div>
  );
};

export default MyProfile;
