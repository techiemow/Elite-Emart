import React, { useContext, useEffect, useRef, useState } from 'react'
import BrowseByCategory from '../helpers/BrowseByCategory'
import EmartContext from '../Context/Context';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import displayINRCurrency from '../helpers/DisplayAmount';
import AddToCart from '../helpers/AddToCart';

const ProductsCardRow = ({ category, heading }) => {
  const [productData, setProductData] = useState([]);
  const [IsLoading, setIsLoading] = useState(true)
  const LoadingList = new Array(12).fill(null)

  const [scroll, setScroll] = useState(0)
  const scrollElement = useRef()

  // const { fetchUserAddToCart } = useContext(EmartContext)

  const handleAddToCart = async (e, id) => {
    await AddToCart(e, id)
   
  }

  const fetchProductData = async () => {
  
   
    const response = await BrowseByCategory(category);

    setProductData(response);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchProductData();
  }, [category]);

  useEffect(() => {

  }, [productData]);

  const scrollRight = () => {
    scrollElement.current.scrollLeft += 300
  }
  const scrollLeft = () => {
    scrollElement.current.scrollLeft -= 300
  }



  return (
    <div className='container mx-auto px-4  py-4 relative'>

      <h2 className='text-2xl font-semibold py-4'>{heading}</h2>


      <div className='flex items-center gap-4 md:gap-6 overflow-scroll scrollbar-none transition-all' ref={scrollElement}>

        <button className='bg-white shadow-md rounded-full p-1 absolute left-0 text-lg ' onClick={scrollLeft}><FaAngleLeft /></button>
        <button className='bg-white shadow-md rounded-full p-1 absolute right-0 text-lg' onClick={scrollRight}><FaAngleRight /></button>

        {IsLoading ? (
          LoadingList.map((product, index) => {
            return (
              <div className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm shadow flex'>
                <div className='bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px] animate-pulse'>

                </div>
                <div className='p-4 grid w-full gap-2'>
                  <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black bg-slate-200 animate-pulse p-1 rounded-full'></h2>
                  <p className='capitalize text-slate-500 p-1 bg-slate-200 animate-pulse rounded-full'></p>
                  <div className='flex gap-3 w-full'>
                    <p className='text-red-600 font-medium p-1 bg-slate-200 w-full animate-pulse rounded-full'></p>
                    <p className='text-slate-500 line-through p-1 bg-slate-200 w-full animate-pulse rounded-full'></p>
                  </div>
                  <button className='text-sm  text-white px-3 py-0.5 rounded-full w-full bg-slate-200 animate-pulse'></button>
                </div>
              </div>
            )
          })
        ) : (
          productData.map((product, index) => {
            return (
              <Link to={"Product/" + product?._id} className='w-full min-w-[330px] sm:min-w-[380px] max-w-[330px] sm:max-w-[380px] h-36 bg-white rounded-sm shadow flex'>
                <div className='bg-white h-full p-4 min-w-[120px] sm:min-w-[145px] '>
                  <img src={product.productImage[0]} className='object-scale-down h-full hover:scale-110 transition-all' />
                </div>
                <div className='p-4 flex flex-col flex-grow'>
                <h2 className='font-mono text-base md:text-lg text-ellipsis line-clamp-1 text-black'>{product?.productName}</h2>
                <p className='capitalize text-slate-500'>{product?.category}</p>
                <div className='flex gap-3'>
                  <p className='text-black font-medium'>{displayINRCurrency(product?.sellingPrice)}</p>
                  <p className='text-slate-500 line-through'>{displayINRCurrency(product?.price)}</p>
                </div>
                    <button className='text-sm bg-blue-400 hover:bg-blue-500 text-white px-3 py-0.5 rounded-full' onClick={(e) => handleAddToCart(e, product?._id)}>Add to Cart</button>
                  </div>
              </Link>
            )
          })
        )

        }
      </div>


    </div>
  );
};


export default ProductsCardRow