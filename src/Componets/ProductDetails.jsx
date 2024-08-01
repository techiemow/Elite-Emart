import axios from 'axios';
import React, { useCallback,  useContext,  useEffect, useState } from 'react';
import { apiurl } from '../../Constants/apiurl';
import { useNavigate, useParams } from 'react-router-dom';
import { FaStar, FaStarHalf } from "react-icons/fa";
import displayINRCurrency from '../helpers/DisplayAmount';
import AddToCart from '../helpers/AddToCart';
import RecomendedProducts from './RecomendedProducts';
import EmartContext from '../Context/Context';


const ProductDetails = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const productImageListLoading = new Array(4).fill(null);
  const [activeImage, setActiveImage] = useState("");
  const navigate = useNavigate();

  const [zoomImageCoordinate, setZoomImageCoordinate] = useState({
    x: 0,
    y: 0
  });
  const [zoomImage, setZoomImage] = useState(false);

  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    sellingPrice: ""
  });

 const {fetchCartCount} = useContext(EmartContext)
  
  const handleAddToCart = async (e, id) => {
    await AddToCart (e, id)
    fetchCartCount();
  }
 

  const fetchApiRequest = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${apiurl}/ProductDetails/${id}`);
      const productData = response.data.data;
      setData(productData);
      setActiveImage(productData.productImage[0]); // Set the first image as the active image
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching product details", error);
    }
  };

  useEffect(() => {
    fetchApiRequest();
  }, [id]);


  useEffect(() => {
    // Scroll to the top when the component mounts
    window.scrollTo(0, 0);
  }, []);

  const handleMouseEnterProduct = (imageURL) => {
    setActiveImage(imageURL);
  };

  const handleZoomImage = useCallback((e) => {
    setZoomImage(true);
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;

    setZoomImageCoordinate({
      x,
      y
    });
  }, []);

  const handleLeaveImageZoom = () => {
    setZoomImage(false);
  };



  const handleBuyProduct = async (e, id) => {
    await AddToCart(e, id);
    navigate("/cart");
  };

  return (
    <div className='bg-slate-200 container m-auto px-10 p-4'>
      <div className='min-h-[200px] flex flex-col lg:flex-row gap-4'>
        {/***product Image */}
        <div className='h-96 flex flex-col lg:flex-row-reverse gap-4'>
          <div className='h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-200 relative p-2'>
            <img 
              src={activeImage} 
              className='h-full w-full object-scale-down mix-blend-multiply' 
              onMouseMove={handleZoomImage} 
              onMouseLeave={handleLeaveImageZoom} 
              alt="Product"
            />
            {/**product zoom */}
            {
              zoomImage && (
                <div className='hidden lg:block absolute min-w-[500px] overflow-hidden min-h-[400px] bg-slate-200 p-1 -right-[510px] top-0'>
                  <div
                    className='w-full h-full min-h-[400px] min-w-[500px] mix-blend-multiply scale-150'
                    style={{
                      background: `url(${activeImage})`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: `${zoomImageCoordinate.x * 100}% ${zoomImageCoordinate.y * 100}%`
                    }}
                  >
                  </div>
                </div>
              )
            }
          </div>

          <div className='h-full'>
            {
              isLoading ? (
                <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full'>
                  {
                    productImageListLoading.map((el, index) => (
                      <div className='h-20 w-20 bg-slate-200 rounded animate-pulse' key={"loadingImage" + index}>
                      </div>
                    ))
                  }
                </div>
              ) : (
                <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full'>
                  {
                    data?.productImage?.map((imgURL, index) => (
                      <div className='h-20 w-20 bg-slate-200 rounded p-1' key={imgURL}>
                        <img 
                          src={imgURL} 
                          className='w-full h-full object-scale-down mix-blend-multiply cursor-pointer' 
                          onMouseEnter={() => handleMouseEnterProduct(imgURL)} 
                          onClick={() => handleMouseEnterProduct(imgURL)} 
                          alt="Product Thumbnail"
                        />
                      </div>
                    ))
                  }
                </div>
              )
            }
          </div>
        </div>

        {/***product details */}
        {
          isLoading ? (
            <div className='grid gap-1 w-full'>
              <p className='bg-slate-200 animate-pulse h-6 lg:h-8 w-full rounded-full inline-block'></p>
              <h2 className='text-2xl lg:text-4xl font-medium h-6 lg:h-8 bg-slate-200 animate-pulse w-full'></h2>
              <p className='capitalize text-slate-400 bg-slate-200 min-w-[100px] animate-pulse h-6 lg:h-8 w-full'></p>
              <div className='text-blue-600 bg-slate-200 h-6 lg:h-8 animate-pulse flex items-center gap-1 w-full'></div>
              <div className='flex items-center gap-2 text-2xl lg:text-3xl font-medium my-1 h-6 lg:h-8 animate-pulse w-full'>
                <p className='text-blue-600 bg-slate-200 w-full'></p>
                <p className='text-slate-400 line-through bg-slate-200 w-full'></p>
              </div>
              <div className='flex items-center gap-3 my-2 w-full'>
                <button className='h-6 lg:h-8 bg-slate-200 rounded animate-pulse w-full'></button>
                <button className='h-6 lg:h-8 bg-slate-200 rounded animate-pulse w-full'></button>
              </div>
              <div className='w-full'>
                <p className='text-slate-600 font-medium my-1 h-6 lg:h-8 bg-slate-200 rounded animate-pulse w-full'></p>
                <p className='bg-slate-200 rounded animate-pulse h-10 lg:h-12 w-full'></p>
              </div>
            </div>
          ) : (
            <div className='flex flex-col gap-1'>
              <p className='bg-blue-200 text-blue-600 px-2 rounded-full inline-block w-fit'>{data?.brandName}</p>
              <h2 className='text-2xl lg:text-4xl font-medium'>{data?.productName}</h2>
              <p className='capitalize text-black'>{data?.category}</p>
              <div className='text-yellow-400 flex items-center gap-1'>
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStarHalf />
              </div>
              <div className='flex items-center gap-2 text-2xl lg:text-3xl font-medium my-1'>
                <p className='text-black'>{displayINRCurrency(data.sellingPrice)}</p>
                <p className='text-blue-400 line-through'>{displayINRCurrency(data.price)}</p>
              </div>
              <div className='flex items-center gap-3 my-2'>
                <button className='border-2 border-blue-500 rounded px-3 py-1 min-w-[120px] text-white-600 font-medium hover:text-blue-600 hover:bg-white' onClick={(e) => handleBuyProduct(e, data?._id)}>Buy</button>
                <button className='border-2 border-blue-600 rounded px-3 py-1 min-w-[120px] font-medium text-black bg-white-600 hover:text-blue-600 hover:bg-white' onClick={(e) => handleAddToCart(e, data?._id)}>Add To Cart</button>
              </div>
              <div>
                <p className='text-slate-600 font-medium my-1'>Description:</p>
                <p>{data?.description}</p>
              </div>
            </div>
          )
        }
      </div>
      {
        data.category && (
          <RecomendedProducts category={data?.category} heading={"Recommended Product"}/>
        )
      }
    </div>
  );
};

export default ProductDetails;
