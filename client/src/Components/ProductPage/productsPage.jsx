import React, { useState, useEffect, useContext } from 'react';
import { Button, InputLabel, MenuItem, Select } from '@material-ui/core';
import { ItemDetailsContext } from '../../Contexts/ItemDetailsContexts';
import axios from 'axios';
import Banner from '../StorePage/storeBanner';
import MultipleSelect from '../StorePage/filterForm';
import ProductsDisplay from '../ProductPage/productsDisplay';



function ProductsPage(props) {
  const { getProductId, productId } = useContext(ItemDetailsContext);
  const [products, setProducts] = useState([])

  const categoryName = props.match.params.category_name
  const storeId = props.match.params.id

  useEffect(() => {
    async function fetchData() {
        try {
            const res = await axios.get(`/products/category/${categoryName}/${storeId}`)
            setProducts(res.data.payload);
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
      <MultipleSelect />
      <br></br>
      <ProductsDisplay
        getProductId={getProductId}
        currentProduId={productId}
        products={products}
      />
    </div>
  );
}

export default ProductsPage;