import React, { useState, useEffect, useContext } from 'react';
import { Button, InputLabel, MenuItem, Select } from '@material-ui/core';
import { ItemDetailsContext } from '../../Contexts/ItemDetailsContexts';
import axios from 'axios';
import Banner from '../StorePage/storeBanner';
import MultipleSelect from '../StorePage/filterForm';
import ProductsDisplay from '../ProductPage/productsDisplay';



function ProductsPage(props) {
  const { getProductId, productId } = useContext(ItemDetailsContext);
  return (

    <div className="ProductsPage" style={{ textAlign: "center" }}>
      <Banner
        storeId={props.match.params.id}
      />
      <MultipleSelect />
      <br></br>
      <ProductsDisplay
        storeId={props.match.params.id}
        categoryName={props.match.params.category_name}
        getProductId={getProductId}
        currentProduId={productId}
      />
    </div>
  );
}

export default ProductsPage;