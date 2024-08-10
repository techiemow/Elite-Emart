import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { apiurl } from '../../Constants/apiurl';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper
} from '@mui/material';
import moment from 'moment';
import displayINRCurrency from "../helpers/DisplayAmount";

const Order = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchOrderData = async () => {
    try {
      const response = await axios.get(`${apiurl}/ViewOrder`, {
        withCredentials: true,
      });
      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching order data", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Check if there is any order with a non-empty status field, specifically "Failed"
  const hasFailedStatus = data.some(order => order.paymentDetails && order.paymentDetails.status === 'Failed');
  const hasNonEmptyStatus = data.some(order => order.paymentDetails && order.paymentDetails.status && order.paymentDetails.status.trim() !== '');

  return (
    <div className="order-container my-3 flex flex-col gap-3 px-4 sm:px-8">
      <h1 className="text-2xl font-bold mb-5 text-center">My Orders</h1>
      {data.length === 0 ? (
        <div className='text-center font-bold'>No orders found</div>
      ) : (
        <div className="overflow-x-auto">
          {/* Table for larger screens */}
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow className="bg-gray-200">
                  <TableCell align="center" className="font-semibold">Email</TableCell>
                  <TableCell align="center" className="font-semibold">Total Amount</TableCell>
                  <TableCell align="center" className="font-semibold">Order ID</TableCell>
                  {(hasNonEmptyStatus || hasFailedStatus) && <TableCell align="center" className="font-semibold">Payment Status</TableCell>}
                  <TableCell align="center" className="font-semibold">Created At</TableCell>
                  <TableCell align="center" className="font-semibold">Products</TableCell>
                  <TableCell align="center" className="font-semibold">Quantity</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((order) => (
                  <TableRow key={order._id}>
                    <TableCell component="th" scope="row" align="center">
                      {order.email}
                    </TableCell>
                    <TableCell align="center">{displayINRCurrency(order.totalAmount)}</TableCell>
                    <TableCell align="center">{order.paymentDetails.razorpayOrderId}</TableCell>
                    {(hasNonEmptyStatus || hasFailedStatus) && <TableCell align="center">{order.paymentDetails.status || 'N/A'}</TableCell>}
                    <TableCell align="center">{moment(order.createdAt).format("MMM Do YY")}</TableCell>
                    <TableCell align="center">
                      <ul>
                        {order.productDetails.map((product, index) => (
                          <li key={index}>{product.productName}</li>
                        ))}
                      </ul>
                    </TableCell>
                    <TableCell align="center">
                      <ul>
                        {order.productDetails.map((product, index) => (
                          <li key={index}>{product.quantity}</li>
                        ))}
                      </ul>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Column layout for mobile screens */}
          <div className="md:hidden">
            {data.map((order) => (
              <div key={order._id} className="bg-white border border-gray-300 rounded-lg p-5 mb-5 shadow-md">
                <div className="mb-3"><strong>Email:</strong> {order.email}</div>
                <div className="mb-3"><strong>Total Amount:</strong> {displayINRCurrency(order.totalAmount)}</div>
                <div className="mb-3"><strong>Order ID:</strong> {order.paymentDetails.razorpayOrderId}</div>
                {(hasNonEmptyStatus || hasFailedStatus) && <div className="mb-3"><strong>Payment Status:</strong> {order.paymentDetails.status || 'N/A'}</div>}
                <div className="mb-3"><strong>Created At:</strong> {moment(order.createdAt).format("MMM Do YY")}</div>
                <div className="mb-3">
                  <strong>Products:</strong>
                  <ul className="list-disc list-inside">
                    {order.productDetails.map((product, index) => (
                      <li key={index}>{product.productName} - {product.quantity}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Order;
