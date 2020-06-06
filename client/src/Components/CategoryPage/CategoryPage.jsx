import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, Route, Switch } from "react-router-dom";
import { LandingContext } from "../../Contexts/LandingPageDetailsContext";
import CategoryGridList from "./CategoryGrid";
import { CheckoutCartContext } from "../../Contexts/CheckoutCartContext";
// styling
import customTheme from "../styling/customTheme";
import Playground from "./CategoryFilterForm";

const CategoryPage = (props) => {
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


  const applyFilters = async (filter) => {
    console.log(filter)
    try {
      const res = await axios.get(`/products/category/${filter}/`)
      // const categories = await axios.get(`/products/categories/all`)
      setProducts(res.data.payload);
      // setCategories(categories.data.payload);
    } catch (error) {
      setProducts([])
      console.log(error);
    }
  }


  const applyFiltersBrand = async (filter) => {
    console.log(filter)
    try {
      const res = await axios.get(`/products/brand/${filter}/`)
      // const categories = await axios.get(`/products/categories/all`)
      setProducts(res.data.payload);
      // setCategories(categories.data.payload);
    } catch (error) {
      setProducts([])
      console.log(error);
    }
  }

  const applyFiltersType = async (filter) => {
    console.log(filter)
    try {
      const res = await axios.get(`/products/type/${filter}/`)
      // const categories = await axios.get(`/products/categories/all`)
      setProducts(res.data.payload);
      // setCategories(categories.data.payload);
    } catch (error) {
      setProducts([])
      console.log(error);
    }
  }



  return (
    <div className="CategoryPage">
      <div
        className="CategoryNav"
        style={{
          marginTop: "20px",
          display: "flex",
          justifyContent: "space-evenly",
          marginLeft: "20px",
          marginRight: "30px",
        }}
      >
        {categories.map((value) => (
          <Link
            to={`/categories/${value.category_name}`}
            style={{
              textDecoration: "none",
              color: "#CD853F",
              active: "#FAEBD7",
            }}
          >
            {" "}
            {value.category_name}
          </Link>
        ))}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          padding: "25px",
        }}
      >
        <h1
          style={{
            fontFamily: "Palatino Linotype",
            textAlign: "left",
            color: customTheme.palette.secondary.dark,
          }}
        >
          {category_name}
        </h1>
      </div>

      <div className="Content" style={{ marginTop: "20px" }}>
        <div
          className="Filter_sideBar"
          style={{ margin: "25px", float: "left", padding: "20px" }}
        >
          <Playground products={products}
          applyFilters ={applyFilters}
          applyFiltersBrand = {applyFiltersBrand}
          applyFiltersType = {applyFiltersType} />
        </div>
        <div style={{ float: "right", width: "70%", paddingTop: "20px" }}>
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
