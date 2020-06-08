import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Button, InputLabel, MenuItem, Select } from '@material-ui/core';
import { CheckoutCartContext } from '../../Contexts/CheckoutCartContext';
import axios from 'axios';
import Banner from '../StorePage/storeBanner';
import MultipleSelect from '../StorePage/filterForm';
import ProductsDisplay from '../ProductPage/productsDisplay';
import {productPageStyles} from '../styling/productsPageStyles'


function ProductsPage(props) {
  const classes = productPageStyles();
  const { getProductId, productId } = useContext(CheckoutCartContext);
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([]);

  const categoryName = props.match.params.category_name
  const storeId = props.match.params.id

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`/products/category/${categoryName}/${storeId}`)
        const categories = await axios.get(`/products/categories/all`)
        setProducts(res.data.payload);
        setCategories(categories.data.payload);
      } catch (error) {
        setProducts([])
        console.log(error);
      }
    }
    fetchData()
  }, [categoryName, storeId])


  const applyFilters = async (filter) => {
    let url = `/products/filter/${storeId}`

    if(Object.keys(filter).length){
      let firstElem = Object.keys(filter)[0]
      for (let el in filter){
        if (el === firstElem){
          url += `?${el}=${filter[el]}`
        } else {
          url += `&${el}=${filter[el]}`
        }
      }
    }
    
    try {
      const res = await axios.get(url)
      setProducts(res.data.payload);
    } catch (error) {
      setProducts([])
      console.log(error);
    }
  }



  return (

    <div className={classes.ProductsPage} >
      <Banner
        storeId={props.match.params.id}
      />

      <div className={classes.CategoryNav}>
        {categories.map((value) => (<Link key={value.category_id} to={`/store/${storeId}/${value.categories_name}`}
        class = {classes.NavLinks}

        >  {value.categories_name}
        </Link>))}
      </div>

      <div className={classes.Filter_sideBar}>
        <MultipleSelect 
        applyFilters={applyFilters}
        />
      </div>

      <br></br>
      <h2 style={{fontFamily: "Palatino Linotype", color: "#CD853F"}}>
        {props.match.params.category_name}
      </h2>

      <div className ={classes.ProductsDisplay}>
        <ProductsDisplay
          getProductId={getProductId}
          currentProdId={productId}
          products={products}
        />
      </div>


    </div>
  );
}

export default ProductsPage;