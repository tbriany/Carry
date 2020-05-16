import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, Route, Switch } from "react-router-dom";
import CategoryGridList from "./CategoryGrid";
import MultilineTextFields from './CategorySearchBar';
import { ItemDetailsContext } from '../../Contexts/ItemDetailsContexts';
import customTheme from '../styling/customTheme';
// styling 
import { CheckBoxOutlineBlankOutlined } from "@material-ui/icons";

const CategoryPage = (props) => {
  const { getProductId } = useContext(ItemDetailsContext);
  const [products, setProducts] = useState([]);

  // Ask team was unable to store category_id using hooks.
  // const [category_id, setCategory_id] =useState(0)
  // setCategory_id(props.match.params.type)

  const category_name = props.match.params.type;
  console.log("categoryPage category_name", category_name);

  // useeffect to  make a network request to backend to get all stores/ products of that category.
  // Ask Adam or team why this is being rendered twice.
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`/products/category/${category_name}`);
        setProducts(res.data.payload);
        console.log(res.data.payload);
      } catch (error) {
        setProducts([]);
        console.log(error);
      }
    }
    fetchData();
  }, [category_name]);

  console.log("products on Category Page", products);
  return (
    <div className="CategoryPage">
      <div style ={{ display: 'flex', justifyContent: 'space-evenly'}}>
        <h1 style={{
            fontFamily: "Palatino Linotype",
            textAlign: "left",
            color: customTheme.palette.secondary.dark,
          }}>{category_name}</h1>
        <div className="SearchBar">
          {" "}
          <MultilineTextFields/>
          {" "}
        </div>
      </div>

      <div className="Content">
        <div>
          <CategoryGridList
            categoryId={props.categoryId}
            product_name={products.product_name}
            products={products}
            getProductId={getProductId}
          />
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
