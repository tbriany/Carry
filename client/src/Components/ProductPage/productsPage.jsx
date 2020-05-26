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

  // const fetchCategories = async () => {
  //   try {
  //     const categories = await axios.get(`/products/categories/all`)
  //     setCategories(categories.data.payload)
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }

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
          marginBottom: '20px',
        }}>
        {categories.map((value) => (<Link key={value.category_id} to={`/store/${storeId}/${value.category_name}`}

          style={{ textDecoration: 'none', color: '#CD853F', active: '#FAEBD7' }}

        >  {value.category_name}
        </Link>))}
      </div>

      <MultipleSelect />
      <br></br>
      <h2
        style={{
          fontFamily: "Palatino Linotype",
          // color: "black",
          color: "#CD853F",
        }}
      >
        {props.match.params.category_name}
      </h2>
      <ProductsDisplay
        getProductId={getProductId}
        currentProduId={productId}
        products={products}
      />
    </div>
  );
}

export default ProductsPage;