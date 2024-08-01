import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import displayINRCurrency from '../helpers/DisplayAmount';
import AddToCart from '../helpers/AddToCart';
import BrowseByCategory from '../helpers/BrowseByCategory';

const RecomendedProducts = ({ category, heading }) => {
  const [productData, setProductData] = useState([]);
  const [IsLoading, setIsLoading] = useState(true);
  const LoadingList = new Array(12).fill(null);
  const navigate = useNavigate();

  const handleAddToCart = async (e, id) => {
    await AddToCart(e, id);
  };

  const fetchProductData = async () => {
    const response = await BrowseByCategory(category);
    setProductData(response);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchProductData();
  }, [category]);

  const handleProductClick = (productId) => {
    navigate(`/Product/${productId}`, { replace: true });
    window.scrollTo(0, 0);
  };

  return (
    <div className='container mx-auto px-4 py-4 relative'>
      <h2 className='text-2xl font-semibold py-4'>{heading}</h2>
      <div className='grid grid-cols-[repeat(auto-fit,minmax(300px,320px))] justify-between md:gap-6 overflow-x-scroll scrollbar-none transition-all'>
        {IsLoading ? (
          LoadingList.map((_, index) => (
            <div key={index} className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-white rounded-sm shadow'>
              <div className='bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center animate-pulse'></div>
              <div className='p-4 grid gap-3'>
                <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black p-1 py-2 animate-pulse rounded-full bg-slate-200'></h2>
                <p className='capitalize text-slate-500 p-1 animate-pulse rounded-full bg-slate-200 py-2'></p>
                <div className='flex gap-3'>
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
              className='w-full min-w-[280px] sm:min-w-[330px] max-w-[280px] sm:max-w-[330px] bg-white rounded-sm shadow cursor-pointer'
              onClick={() => handleProductClick(product?._id)}
            >
              <div className='bg-white h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center'>
                <img
                  src={product.productImage[0]}
                  className='object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply'
                  alt={product.productName}
                />
              </div>
              <div className='p-4 grid gap-3'>
                <h2 className='font-mono text-base md:text-lg text-ellipsis line-clamp-1 text-black'>{product?.productName}</h2>
                <p className='capitalize text-slate-500'>{product?.category}</p>
                <div className='flex gap-3'>
                  <p className='text-black font-medium'>{displayINRCurrency(product?.sellingPrice)}</p>
                  <p className='text-slate-500 line-through'>{displayINRCurrency(product?.price)}</p>
                </div>
                <button
                  className='text-sm bg-blue-400 hover:bg-blue-500 text-white px-3 py-0.5 rounded-full'
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
  );
};

export default RecomendedProducts;
