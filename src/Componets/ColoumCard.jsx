import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import displayINRCurrency from '../helpers/DisplayAmount';
import AddToCart from '../helpers/AddToCart';

import EmartContext from '../Context/Context';

const ColoumCard = ({ IsLoading, productData = [] }) => {
  const LoadingList = new Array(12).fill(null);
  const navigate = useNavigate();

  const { fetchCartCount } = useContext(EmartContext); // Use useContext

  const handleAddToCart = async (e, id) => {
    await AddToCart(e, id);
    fetchCartCount();
  };
  const handleProductClick = (productId) => {
    navigate(`/Product/${productId}`, { replace: true });
    window.scrollTo(0, 0);
  };

  return (
    <div className='container mx-auto px-4 relative'>
      <div className='grid grid-cols-[repeat(auto-fit,minmax(260px,300px))] justify-center md:justify-between gap-3 overflow-x-scroll scrollbar-none transition-all'>
        {IsLoading ? (
          LoadingList.map((_, index) => (
            <div key={index} className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-white rounded-sm shadow'>
              <div className='bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center animate-pulse'></div>
              <div className='p-4 grid gap-2'>
                <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black p-1 py-2 animate-pulse rounded-full bg-slate-200'></h2>
                <p className='capitalize text-slate-500 p-1 animate-pulse rounded-full bg-slate-200 py-2'></p>
                <div className='flex gap-2'>
                  <p className='text-red-600 font-medium p-1 animate-pulse rounded-full bg-slate-200 w-full py-2'></p>
                  <p className='text-slate-500 line-through p-1 animate-pulse rounded-full bg-slate-200 w-full py-2'></p>
                </div>
                <button className='text-sm text-white px-3 rounded-full bg-slate-200 py-2 animate-pulse'></button>
              </div>
            </div>
          ))
        ) : (
          productData.map((product) => (
            <div
              key={product?._id}
              className='w-full min-w-[280px] sm:min-w-[300px] max-w-[280px] sm:max-w-[300px] bg-white rounded-sm shadow cursor-pointer'
              onClick={() => handleProductClick(product?._id)}
            >
              <div className='bg-white h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center'>
                <img
                  src={product.productImage[0]}
                  className='object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply'
                  alt={product.productName}
                />
              </div>
              <div className='p-4 grid gap-2'>
                <h2 className='font-mono text-base md:text-lg text-ellipsis line-clamp-1 text-black'>{product?.productName}</h2>
                <p className='capitalize text-slate-500'>{product?.category}</p>
                <div className='flex gap-2'>
                  <p className='text-black font-medium'>{displayINRCurrency(product?.sellingPrice)}</p>
                  <p className='text-slate-500 line-through'>{displayINRCurrency(product?.price)}</p>
                </div>
                <button
                  className='text-md text-blue-600 bg-slate-200 hover:bg-blue-500 hover:text-white px-3 py-0.5 rounded-full'
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCart(e, product?._id);
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default ColoumCard;
