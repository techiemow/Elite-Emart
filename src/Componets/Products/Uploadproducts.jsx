import React, { useState } from 'react';
import { CgClose } from "react-icons/cg";

import { FaCloudUploadAlt } from "react-icons/fa";
import axios from "axios"

import { MdDelete } from "react-icons/md";

import { toast } from 'react-toastify';
import { Modal, Dialog, DialogTitle, DialogContent, DialogActions, Button, IconButton, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import productCategory from '../../helpers/ProductCategory';
import UploadImage from '../../helpers/UploadImage';
import DisplayImage from './DisplayImage';

const UploadProduct = ({ onClose, open }) => {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    sellingPrice: ""
  });

  const [openFullScreenImage, setOpenFullScreenImage] = useState(false);
  const [fullScreenImage, setFullScreenImage] = useState("");
  const [uploadProductimage, setUploadProductimage] = useState("");

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

    const handleUploadProduct = async (e) => {
      const file = e.target.files[0];
      const uploadImageCloudinary = await UploadImage(file);
   

      setData((prev) => ({
        ...prev,
        productImage: [...prev.productImage, uploadImageCloudinary]
      }));
    };

  const handleDeleteProductImage = (index) => {
    const newProductImage = [...data.productImage];
    newProductImage.splice(index, 1);

    setData((prev) => ({
      ...prev,
      productImage: [...newProductImage]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
      console.log("data: " , data);
    // const response = await axios.post(`${apiurl}/Uploadproduct`,{
    //   data
    // },{
    //   withCredentials: true
    // }) ;
   
    // console.log(response);
   

    // if (response.success) {
    //   toast.success(response.message);
    //   onClose();
    //   fetchData();
    // }

    // if (response.error) {
    //   toast.error(response?.message);
    // }
  };

  return (

      <Dialog maxWidth="md" fullWidth open={open} onClose={onClose}>
        <DialogTitle>
          Upload Product
          <IconButton onClick={onClose} style={{ float: 'right' }}>
            <CgClose />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              margin="normal"
              label="Product Name"
              variant="outlined"
              name="productName"
              value={data.productName}
              onChange={handleOnChange}
              required
            />
            <TextField
              fullWidth
              margin="normal"
              label="Brand Name"
              variant="outlined"
              name="brandName"
              value={data.brandName}
              onChange={handleOnChange}
              required
            />
            <FormControl fullWidth margin="normal" variant="outlined" required>
              <InputLabel id="category-label">Category</InputLabel>
              <Select
                labelId="category-label"
                id="category"
                name="category"
                value={data.category}
                onChange={handleOnChange}
                label="Category"
              >
                <MenuItem value="">
                  <em>Select Category</em>
                </MenuItem>
                {productCategory.map((el, index) => (
                  <MenuItem value={el.value} key={el.value + index}>{el.label}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <div>
              <label htmlFor="uploadImageInput">
                <div className="p-2 bg-slate-100 border rounded h-32 w-full flex justify-center items-center cursor-pointer">
                  <div className="text-slate-500 flex justify-center items-center flex-col gap-2">
                    <span className="text-4xl"><FaCloudUploadAlt /></span>
                    <p className="text-sm">Upload Product Image</p>
                    <input type="file" id="uploadImageInput" className="hidden"  onChange={handleUploadProduct}/>
                  </div>
                </div>
              </label>
             
           <div>
                  {data.productImage.length > 0 && (
                  <div className="flex items-center gap-2">
                    {data.productImage.map((el, index) => (
                      <div className="relative group" key={index}>
                        <img
                          src={el}
                          alt={el}
                          width={80}
                          height={80}
                          className="bg-slate-100 border cursor-pointer"
                          onClick={() => {
                            setOpenFullScreenImage(true);
                            setFullScreenImage(el);
                          }}
                        />
                        <div className="absolute bottom-0 right-0 p-1 text-white bg-red-600 rounded-full hidden group-hover:block cursor-pointer" onClick={() => handleDeleteProductImage(index)}>
                          <MdDelete />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {data.productImage.length === 0 && (
                  <p className="text-red-600 text-xs">*Please upload product image</p>
                )}
              </div>
            </div>
            <TextField
              fullWidth
              margin="normal"
              label="Price"
              variant="outlined"
              name="price"
              type="number"
              value={data.price}
              onChange={handleOnChange}
              required
            />
            <TextField
              fullWidth
              margin="normal"
              label="Selling Price"
              variant="outlined"
              name="sellingPrice"
              type="number"
              value={data.sellingPrice}
              onChange={handleOnChange}
              required
            />
            <TextField
              fullWidth
              margin="normal"
              label="Description"
              variant="outlined"
              name="description"
              multiline
              rows={4}
              value={data.description}
              onChange={handleOnChange}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">Cancel</Button>
          <Button onClick={handleSubmit} color="primary" variant="contained">Upload Product</Button>
        </DialogActions>
   
      {
        openFullScreenImage && (
          <DisplayImage onClose={()=>setOpenFullScreenImage(false)} imageURL={fullScreenImage}/>
        )
       }
     
     </Dialog>
  );
};

export default UploadProduct;
