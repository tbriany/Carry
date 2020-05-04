import React, { useState, useEffect } from "react";
import axios from "axios";
import Banner from './storeBanner';
import CategoriesGridList from "./GridList/categoryGridList";
import TypesGridList from "./GridList/typesGridList";
import NewArrivalsGridList from "./GridList/newArrivalsGridList";

function StorePage(props) {

  return (
    <div className="StorePage">
      <Banner 
      storeId={props.match.params.id}
      />
      <div>
        <CategoriesGridList 
        listTitle="Browse Categories"
        />
      </div>
      <div>
        <TypesGridList listTitle="Shop By Type" />
      </div>
      <div>
        <NewArrivalsGridList 
        listTitle="New Arrivals"
        storeId={props.match.params.id}
         />
      </div>
    </div>
  );
}

export default StorePage;
