import React, { useState, useEffect, useContext } from 'react';
import axios from "axios";
import { ItemDetailsContext } from '../../Contexts/ItemDetailsContexts';
import Banner from './storeBanner';
import CategoriesGridList from "./GridList/categoryGridList";
import TypesGridList from "./GridList/typesGridList";
import NewArrivalsGridList from "./GridList/newArrivalsGridList";

function StorePage(props) {
  const { getProductId, productId } = useContext(ItemDetailsContext);

  return (
    <div className="StorePage">
      <Banner 
      storeId={props.match.params.id}
      />
      <div>
        <CategoriesGridList 
        listTitle="Browse Categories"
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
        listTitle="New Arrivals"
        storeId={props.match.params.id}
        getProductId={getProductId}
        currentProdId={productId}
         />
      </div>
    </div>
  );
}

export default StorePage;
