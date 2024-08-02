import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Accordion, AccordionSummary, AccordionDetails, FormControl, FormControlLabel, Radio, RadioGroup, Checkbox, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

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

    const handlecategory = async () => {
      
      const response = await axios.post(`${apiurl}/Category`, {
        category: filterCategoryList
      })
    
      console.log("response", response)
      setData(response?.data.data || [])
    }
    

    const handleSelectCategory = (e) => {
        const { value, checked } = e.target;


        
        setSelectCategory((prev) => ({
            ...prev,
            [value]: checked
        }));
    };
   
    console.log(selectCategory);
    

    return (
        <div className='container mx-auto p-4'>
            {/***desktop version */}
            <div className='hidden lg:grid grid-cols-[200px,1fr]'>
                {/***left side */}
                <div className='bg-white p-2 min-h-[calc(100vh-120px)] overflow-y-scroll scrollbar-none'>
                    {/**sort by */}
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

                    {/**filter by */}
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

                {/***right side (product) */}
                <div className='px-4'>
                    <p className='font-medium text-slate-800 text-lg my-2'>Search Results : {data.length}</p>

                    <div className='min-h-[calc(100vh-150px)] overflow-y-scroll scrollbar-none max-h-[calc(100vh)]'>
                        {data.length !== 0 && !loading && (
                            <ColoumCard productData={data} IsLoading={loading} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryProduct;
