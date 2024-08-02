import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Accordion, AccordionSummary, AccordionDetails, FormControl, FormControlLabel, Radio, RadioGroup, Checkbox, Typography, Grid } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useMediaQuery } from '@mui/material';

import { apiurl } from '../../Constants/apiurl';
import ColoumCard from './ColoumCard';
import productCategory from '../helpers/ProductCategory';
import axios from 'axios';

const CategoryProduct = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const urlSearch = new URLSearchParams(location.search);
    const urlCategoryListinArray = urlSearch.getAll("category");

    const urlCategoryListObject = {};
    urlCategoryListinArray.forEach(el => {
        urlCategoryListObject[el] = true;
    });

    const [selectCategory, setSelectCategory] = useState(urlCategoryListObject);
    const [filterCategoryList, setFilterCategoryList] = useState([]);
    const [sortBy, setSortBy] = useState("");

    const isXs = useMediaQuery('(max-width:748px)'); // Adjust this value based on your breakpoints

    const handlecategory = async () => {
        const response = await axios.post(`${apiurl}/Category`, {
            category: filterCategoryList
        });

        setData(response?.data.data || []);
    };

    const handleSelectCategory = (e) => {
        const { value, checked } = e.target;

        setSelectCategory((prev) => ({
            ...prev,
            [value]: checked
        }));
    };

    useEffect(() => {
        handlecategory();
    }, [filterCategoryList]);

    useEffect(() => {
        const arrayOfCategory = Object.keys(selectCategory).filter(categoryKeyName => selectCategory[categoryKeyName]);

        setFilterCategoryList(arrayOfCategory);

        const urlFormat = arrayOfCategory.map(el => `category=${el}`).join("&&");

        navigate("/CategoryProduct?" + urlFormat);
    }, [selectCategory]);

    const handleOnChangeSortBy = (e) => {
        const { value } = e.target;

        setSortBy(value);

        if (value === 'asc') {
            setData(prev => [...prev].sort((a, b) => a.sellingPrice - b.sellingPrice));
        }

        if (value === 'dsc') {
            setData(prev => [...prev].sort((a, b) => b.sellingPrice - a.sellingPrice));
        }
    };

    return (
        <div className='container mx-auto p-4'>
            <Grid container spacing={2}>
                {!isXs && (
                    <Grid item xs={3} lg={3}>
                        <div className='bg-white p-2 min-h-[calc(100vh-120px)] overflow-y-scroll scrollbar-none'>
                            <Accordion defaultExpanded>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography className='text-base uppercase font-medium text-slate-500'>Sort by</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <FormControl component="fieldset">
                                        <RadioGroup
                                            aria-label="sort-by"
                                            name="sortBy"
                                            value={sortBy}
                                            onChange={handleOnChangeSortBy}
                                        >
                                            <FormControlLabel
                                                value="asc"
                                                control={<Radio />}
                                                label="Price - Low to High"
                                            />
                                            <FormControlLabel
                                                value="dsc"
                                                control={<Radio />}
                                                label="Price - High to Low"
                                            />
                                        </RadioGroup>
                                    </FormControl>
                                </AccordionDetails>
                            </Accordion>

                            <Accordion defaultExpanded>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel2a-content"
                                    id="panel2a-header"
                                >
                                    <Typography className='text-base uppercase font-medium text-slate-500'>Category</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <FormControl component="fieldset">
                                        {productCategory.map((categoryName) => (
                                            <FormControlLabel
                                                key={categoryName?.value}
                                                control={
                                                    <Checkbox
                                                        checked={selectCategory[categoryName?.value] || false}
                                                        onChange={handleSelectCategory}
                                                        value={categoryName?.value}
                                                    />
                                                }
                                                label={categoryName?.label}
                                            />
                                        ))}
                                    </FormControl>
                                </AccordionDetails>
                            </Accordion>
                        </div>
                    </Grid>
                )}
                <Grid item xs={12} lg={9}>
                    <p className='font-medium text-slate-800 text-lg my-2'>Search Results : {data.length}</p>

                    <div className='min-h-[calc(100vh-120px)] overflow-y-scroll scrollbar-none max-h-[calc(100vh)]'>
                        {data.length !== 0 && !loading && (
                            <ColoumCard productData={data} IsLoading={loading} />
                        )}
                    </div>
                </Grid>
            </Grid>
        </div>
    );
};

export default CategoryProduct;
