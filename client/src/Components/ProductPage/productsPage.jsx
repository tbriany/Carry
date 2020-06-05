import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Button, InputLabel, MenuItem, Select } from '@material-ui/core';
import { CheckoutCartContext } from '../../Contexts/CheckoutCartContext';
import axios from 'axios';
import Banner from '../StorePage/storeBanner';
import MultipleSelect from '../StorePage/filterForm';
import ProductsDisplay from '../ProductPage/productsDisplay';



function ProductsPage(props) {
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
    console.log(filter)
    try {
      const res = await axios.get(`/products/category/${filter}/${storeId}`)
      // const categories = await axios.get(`/products/categories/all`)
      setProducts(res.data.payload);
      // setCategories(categories.data.payload);
    } catch (error) {
      setProducts([])
      console.log(error);
    }
  }



  return (

    <div className="ProductsPage" style={{ textAlign: "center" }}>
      <Banner
        storeId={props.match.params.id}
      />

      <div className='CategoryNav'
        style={{
          display: 'flex',
          justifyContent: 'space-evenly',
          marginLeft: '20px',
          marginRight: '30px',
          marginBottom: '35px',
        }}>
        {categories.map((value) => (<Link key={value.category_id} to={`/store/${storeId}/${value.category_name}`}

          style={{ textDecoration: 'none', color: '#CD853F', active: '#FAEBD7' }}

        >  {value.category_name}
        </Link>))}
      </div>

      <div className='Filter_sideBar' style={{ margin: '25px', float: 'left', padding: '20px' }}>
        <MultipleSelect 
        applyFilters={applyFilters}
        />
      </div>

      <br></br>
      <h2 style={{fontFamily: "Palatino Linotype", color: "#CD853F"}}>
        {props.match.params.category_name}
      </h2>

      <div
        style={{ float: 'right', width: '70%', paddingTop: '20px' }}>
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