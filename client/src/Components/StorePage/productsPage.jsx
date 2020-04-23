import React from 'react';
import { Link } from 'react-router-dom';
import MultipleSelect from './filterForm';

function ProductsPage() {
  return (
    <div className="ProductsPage" style={{textAlign: "center"}}>
      <h1> Displays Products </h1>
      <br></br>
      <MultipleSelect/>
      <br></br>
      <Link to={`/popup`}>
      <img alt="backpack" src="https://cdn.shopify.com/s/files/1/0082/3558/1504/products/lima-sagrada-small-backpack-black_606x606_b48c910d-33ac-46ce-aeb0-8bb3f7b73f7f_1296x.jpg" style={{height: "200px", width: "200px"}}></img>
      </Link>
    </div>
  );
}


export default ProductsPage;