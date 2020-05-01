import React, { useState, useEffect} from "react";
import axios from "axios";
import Banner from './storeBanner';
import CategoriesGridList from "./GridList/categoryGridList";
import TypesGridList from "./GridList/typesGridList";

function StorePage(props) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get(`/products/categories/all`)
      .then((result) => {
        setCategories(result.data.payload);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="StorePage">
      <Banner 
      storeId={props.match.params.id}
      />
      <div>
        <CategoriesGridList 
        listTitle="Browse Categories"
        categories={categories} />
      </div>
      <div>
        <TypesGridList listTitle="Shop By Type" />
      </div>
      <div>
        <CategoriesGridList listTitle="New Arrivals" />
      </div>
    </div>
  );
}

export default StorePage;
