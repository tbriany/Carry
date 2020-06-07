import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, Route, Switch } from "react-router-dom";
import { LandingContext } from "../../Contexts/LandingPageDetailsContext";
import CategoryGridList from "./CategoryGrid";
import { CheckoutCartContext } from "../../Contexts/CheckoutCartContext";
// styling
import customTheme from "../styling/customTheme";
import Playground from "./CategoryFilterForm";
import { CategoryStyles } from "../styling/CategoryPageStyles";

const CategoryPage = (props) => {
  const classes = CategoryStyles();
  const { getProductId, productId } = useContext(CheckoutCartContext);
  const [products, setProducts] = useState([]);
  const { categories } = useContext(LandingContext);
  console.log("category Page categories", categories);

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

  // testing apply filter function
  const applyFilters = async (filter) => {
    console.log(filter);
    try {
      const res = await axios.get(`/products/category/${filter}/`);
      setProducts(res.data.payload);
      console.log("category page products", products);
    } catch (error) {
      setProducts([]);
      console.log(error);
    }
  };

  // Filter that works for each drop down.
  const applyAllFilters = async (filter) => {
    let url = `/products/filter/${category_name}`;

    if (Object.keys(filter).length) {
      let firstElem = Object.keys(filter)[0];
      for (let el in filter) {
        if (el === firstElem) {
          url += `?${el}=${filter[el]}`;
        } else {
          url += `&${el}=${filter[el]}`;
        }
      }
    }

    try {
      const res = await axios.get(url);
      setProducts(res.data.payload);
    } catch (error) {
      setProducts([]);
      console.log(error);
    }
  };

  return (
    <div className="CategoryPage">
      <div className={classes.CategoryNavigation}>
        {categories.map((value) => (
          <Link
            to={`/categories/${value.category_name}`}
            class={classes.navLinks}
          >
            {value.category_name}
          </Link>
        ))}
      </div>

      <div className={classes.headerContainer}>
        <h1 className={classes.pageTitle}>{category_name}</h1>
      </div>

      <div className={classes.mainContenContainer}>
        <div className={classes.filter_sideBar}
        >
          <Playground
            products={products}
            applyFilters={applyFilters}
            applyAllFilters={applyAllFilters}
          />
        </div>
        <div className ={classes.categoryProducts}>
          <CategoryGridList
            categoryId={props.categoryId}
            product_name={products.product_name}
            products={products}
            getProductId={getProductId}
            currentProdId={productId}
          />
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
