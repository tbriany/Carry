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

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`/products/category/${categoryName}/${storeId}`)
      setProducts(res.data.payload);
    } catch (err) {
      console.log(err)
    }
  }

  const applyFilters = async (filter) => {

    if (!Object.keys(filter).length) {
      fetchProducts()

    } else {
      let url = `/products/filter/${storeId}`
      if (Object.keys(filter).length) {
        let firstElem = Object.keys(filter)[0]
        for (let el in filter) {
          if (el === firstElem) {
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
        {categories.map((value) => (<Link key={value.category_id} to={`/store/${storeId}/${value.categories_name}`}

          style={{ textDecoration: 'none', color: '#CD853F', active: '#FAEBD7' }}

        >  {value.categories_name}
        </Link>))}
      </div>

      <div className='Filter_sideBar' style={{ margin: '25px', float: 'left', padding: '20px' }}>
        <MultipleSelect
          applyFilters={applyFilters}
        />
      </div>

      <br></br>
      <h2 style={{ fontFamily: "Palatino Linotype", color: "#CD853F" }}>
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