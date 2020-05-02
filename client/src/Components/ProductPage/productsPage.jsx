import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import Banner from '../StorePage/storeBanner';
import MultipleSelect from '../StorePage/filterForm';
import ProductsDisplay from '../ProductPage/productsDisplay';

function ProductsPage(props) {


  return (
    <div className="ProductsPage" style={{textAlign: "center"}}>
      <Banner
      storeId={props.match.params.id}
       />
      <MultipleSelect/>
      <br></br>
      <ProductsDisplay/>
    </div>
  );
}


export default ProductsPage;