import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { apiurl } from '../../Constants/apiurl';
import EmartContext from '../Context/Context';
import displayINRCurrency from '../helpers/DisplayAmount';
import { MdDelete } from 'react-icons/md';
import { useSelector } from 'react-redux';

const Cart = () => {
    const User = useSelector(state => state?.User?.User);
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const context = useContext(EmartContext);
    const { fetchCartCount } = useContext(EmartContext);
    const LoadingCart = new Array(context.cartProductCount).fill(null);

    const fetchData = async () => {
        const resp = await axios.get(`${apiurl}/ViewCart`, {
            withCredentials: true,
        });

        setData(resp.data.data);
    };

    const handleLoading = async () => {
        await fetchData();
    };

    useEffect(() => {
        setIsLoading(false);
        handleLoading();
        setIsLoading(true);
    }, []);

    const addQuantity = async (id, qty) => {
        const response = await axios.put(
            `${apiurl}/UpdateCart`,
            { productId: id, quantity: qty + 1 },
            { withCredentials: true }
        );

        if (response.data.success) {
            fetchData();
        }
    };

    const subQuantity = async (id, qty) => {
        if (qty >= 2) {
            const response = await axios.put(
                `${apiurl}/UpdateCart`,
                { productId: id, quantity: qty - 1 },
                { withCredentials: true }
            );

            if (response.data.success) {
                fetchData();
            }
        }
    };

    const deleteProduct = async (id) => {
        const productId = id._id;
        const response = await axios.delete(`${apiurl}/DeleteCartItem/${productId}`, {
            withCredentials: true,
        });

        if (response.data.success) {
            fetchData();
            fetchCartCount();
        }
    };

    const totalQuantity = data.reduce((prev, curr) => prev + curr.quantity, 0);
    const totalPrice = data.reduce((prev, curr) => prev + curr.quantity * curr?.productId?.sellingPrice, 0);

    return User?._id ? (
        <div className='container mx-auto'>
            <div className='text-center text-lg '>
                {data.length === 0 && isLoading && <p className='bg-white'>No Data</p>}
            </div>

            <div className='flex flex-col lg:flex-row gap-10 lg:justify-between p-4'>
                <div className='w-full max-w-3xl'>
                    {!isLoading ? (
                        LoadingCart.map((el, index) => (
                            <div key={index} className='w-full bg-slate-200 h-32 my-2 border border-slate-300 animate-pulse rounded'></div>
                        ))
                    ) : (
                        data.map((product, index) => (
                            <div key={product?._id} className='w-full bg-white h-32 my-2 border border-slate-300 rounded grid grid-cols-[128px,1fr]'>
                                <div className='w-32 h-32 bg-slate-200'>
                                    <img
                                        src={product?.productId?.productImage[0]}
                                        className='w-full h-full object-scale-down mix-blend-multiply'
                                    />
                                </div>
                                <div className='px-4 py-2 relative'>
                                    <div
                                        className='absolute right-0 text-black bg-slate-300 rounded-full p-2 hover:bg-red-600 hover:text-white cursor-pointer'
                                        onClick={() => deleteProduct(product?.productId)}
                                    >
                                        <MdDelete />
                                    </div>
                                    <h2 className='text-lg lg:text-xl font-mono line-clamp-1'>{product?.productId?.productName}</h2>
                                    <p className='text-md text-slate-500 capitalize'>{product?.productId?.category}</p>
                                    <div className='flex items-center justify-between'>
                                        <p className='text-orange-500 font-sans text-lg'>{displayINRCurrency(product?.productId?.sellingPrice)}</p>
                                        <p className='text-slate-600 font-semibold text-lg'>{displayINRCurrency(product?.productId?.sellingPrice * product?.quantity)}</p>
                                    </div>
                                    <div className='flex items-center gap-2 mt-1'>
                                        <button
                                            className='border border-black text-blue-600 hover:bg-blue-600 hover:text-white w-6 h-6 flex justify-center items-center rounded'
                                            onClick={(e) => subQuantity(product?.productId, product?.quantity, e)}
                                        >
                                            -
                                        </button>
                                        <span>{product?.quantity}</span>
                                        <button
                                            className='border border-black text-blue-600 hover:bg-blue-600 hover:text-white w-6 h-6 flex justify-center items-center rounded'
                                            onClick={(e) => addQuantity(product?.productId, product?.quantity, e)}
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Final summary */}
                <div className='mt-5 lg:mt-0 w-full max-w-sm'>
                    {!isLoading ? (
                        <div className='h-36 bg-slate-200 border border-slate-300 animate-pulse'></div>
                    ) : (
                        <div className='h-36 bg-white shadow-md'>
                            <h2 className='text-black bg-yellow-400 px-4 py-1'>Checkout</h2>
                            <div className='flex items-center justify-between px-4 gap-2 font-serif text-lg text-slate-600'>
                                <p>Quantity</p>
                                <p>{totalQuantity}</p>
                            </div>
                            <div className='flex items-center justify-between px-4 gap-2 font-serif text-lg text-slate-600'>
                                <p>Total Price</p>
                                <p>{displayINRCurrency(totalPrice)}</p>
                            </div>
                            <button className='bg-blue-600 p-2 text-white w-full mt-2'>Payment</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    ) : (
        <div className='container mx-auto'>
            <h1>Please Login First</h1>
        </div>
    );
};

export default Cart;
