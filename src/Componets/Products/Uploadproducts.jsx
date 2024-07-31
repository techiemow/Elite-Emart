import { Modal } from '@mui/material';
import React from 'react';
import { CgClose } from 'react-icons/cg';
import * as Yup from 'yup';
import { TextField, Button, Typography, Box, Grid } from '@mui/material';
import { ModalDialog } from '@mui/joy';
import { useFormik } from 'formik';

const UploadProducts = ({ onClose, UploadProduct }) => {
  const formik = useFormik({
    initialValues: {
      productName: '',
      brandName: '',
      category: '',
      productImages: [],
      description: '',
      price: '',
      sellingPrice: '',
    },
    validationSchema: Yup.object({
      productName: Yup.string().required('Required'),
      brandName: Yup.string().required('Required'),
      category: Yup.string().required('Required'),
      productImages: Yup.array().min(1, 'At least one image is required').required('Required'),
      description: Yup.string().required('Required'),
      price: Yup.number().required('Required').positive('Must be positive'),
      sellingPrice: Yup.number().required('Required').positive('Must be positive'),
    }),
    onSubmit: (values) => {
      console.log(values);
      // handle form submission
    },
  });

  const handleFileChange = (event) => {
    const files = event.currentTarget.files;
    let fileArray = Array.from(files);
    formik.setFieldValue("productImages", fileArray);
  };

  return (
    <Modal open={UploadProduct} onClose={onClose}>
      <ModalDialog
        minWidth={600}
        aria-labelledby="nested-modal-title"
        aria-describedby="nested-modal-description"
        sx={(theme) => ({
          [theme.breakpoints.only('xs')]: {
            top: 'unset',
            bottom: 0,
            left: 0,
            right: 0,
            borderRadius: 0,
            transform: 'none',
            padding: '16px',
            overflow: 'auto', // Add this line to enable scrolling
            maxHeight: '80vh', // Adjust the maximum height as needed
          },
        })}
      >
        <Box className="flex justify-between items-center pb-3">
          <Typography variant="h6" component="h2">
            Upload Product
          </Typography>
          <Box
            className="w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer"
            onClick={onClose}
          >
            <CgClose />
          </Box>
        </Box>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="productName"
                name="productName"
                label="Product Name"
                value={formik.values.productName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.productName && Boolean(formik.errors.productName)}
                helperText={formik.touched.productName && formik.errors.productName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="brandName"
                name="brandName"
                label="Brand Name"
                value={formik.values.brandName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.brandName && Boolean(formik.errors.brandName)}
                helperText={formik.touched.brandName && formik.errors.brandName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="category"
                name="category"
                label="Category"
                value={formik.values.category}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.category && Boolean(formik.errors.category)}
                helperText={formik.touched.category && formik.errors.category}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="description"
                name="description"
                label="Description"
                multiline
                rows={4}
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.description && Boolean(formik.errors.description)}
                helperText={formik.touched.description && formik.errors.description}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                id="price"
                name="price"
                label="Price"
                type="number"
                value={formik.values.price}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.price && Boolean(formik.errors.price)}
                helperText={formik.touched.price && formik.errors.price}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                id="sellingPrice"
                name="sellingPrice"
                label="Selling Price"
                type="number"
                value={formik.values.sellingPrice}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.sellingPrice && Boolean(formik.errors.sellingPrice)}
                helperText={formik.touched.sellingPrice && formik.errors.sellingPrice}
              />
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="contained"
                component="label"
                fullWidth
              >
                Upload Images
                <input
                  id="productImages"
                  name="productImages"
                  type="file"
                  hidden
                  multiple
                  onChange={handleFileChange}
                />
              </Button>
              {formik.touched.productImages && formik.errors.productImages && (
                <Typography color="error">{formik.errors.productImages}</Typography>
              )}
              <Box mt={2}>
                {formik.values.productImages && formik.values.productImages.length > 0 && (
                  <Box>
                    {formik.values.productImages.map((file, index) => (
                      <Typography key={index}>{file.name}</Typography>
                    ))}
                  </Box>
                )}
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Button color="primary" variant="contained" fullWidth type="submit">
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </ModalDialog>
    </Modal>
  );
};

export default UploadProducts;
