import React, { useState, useEffect, useContext } from 'react';
import axios from "axios";
import { CheckoutCartContext } from '../../Contexts/CheckoutCartContext';
import Banner from './storeBanner';
import CategoriesGridList from "./GridList/categoryGridList";
import TypesGridList from "./GridList/typesGridList";
import NewArrivalsGridList from "./GridList/newArrivalsGridList";

function StorePage(props) {
  const { getProductId, productId } = useContext(CheckoutCartContext);

  return (
    <div className="StorePage">
      <Banner
        storeId={props.match.params.id}
      />
      <div>
        <CategoriesGridList
          storeId={props.match.params.id}
        />
      </div>
      <div>
        <TypesGridList
          listTitle="Shop By Type"
          storeId={props.match.params.id}
        />
      </div>
      <div>
        <NewArrivalsGridList
          storeId={props.match.params.id}
          getProductId={getProductId}
          currentProdId={productId}
        />
      </div>
    </div>
  );
}

export default StorePage;
