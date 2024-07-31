import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { MdModeEditOutline } from 'react-icons/md';
import EditUploadProducts from './AdminEditUploadProducts';
import displayINRCurrency from '../../helpers/DisplayAmount';

const AdminProducts = ({ data, fetchallproducts }) => {
  const [editProduct, setEditProduct] = useState(false);

  return (
    <div className='bg-white p-4 rounded'>
      <div className='w-40'>
        <div className='w-32 h-32 flex justify-center items-center'>
          <img src={data?.productImage?.[0]} alt={data?.productName} className='mx-auto object-fill h-full' />
        </div>
        <h1 className='text-ellipsis line-clamp-2'>{data?.productName}</h1>
        <div>
          <div>
            <p className='font-semibold'>
              {displayINRCurrency(data?.sellingPrice)}
            </p>
          </div>
          <div
            className='w-fit ml-auto p-2 bg-green-100 hover:bg-green-600 rounded-full hover:text-white cursor-pointer'
            onClick={() => setEditProduct(true)}
          >
            <MdModeEditOutline />
          </div>
        </div>
      </div>

      {editProduct && (
        <EditUploadProducts
          EditData={data}
          onClose={() => setEditProduct(false)}
          fetchallproducts={fetchallproducts}
        />
      )}
    </div>
  );
};

export default AdminProducts