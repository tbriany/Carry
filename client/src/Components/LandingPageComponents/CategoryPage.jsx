import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, Route, Switch } from "react-router-dom";
import CategoryGridList from "./CategoryGrid";
import { CheckBoxOutlineBlankOutlined } from "@material-ui/icons";
//import TitlebarGridList from './CategoryGrid'

const CategoryPage = (props) => {
  const [products, setProducts] = useState('')

  // const [category_id, setCategory_id] =useState(0)

  // setCategory_id(props.match.params.type)
  
 
  const category_id = props.match.params.type

  console.log('categoryPage category_id',category_id)
  // useeffect to  make a network request to backend to get all stores/ products of that category.

  // console.log(category_id)


  useEffect(() => {
    async function fetchData() {
        try {
            const res = await axios.get(`/products/category/${category_id}`)
            setProducts(res.data.payload);
            console.log(res.data.payload)
        } catch (error) {
            setProducts([])
            console.log(error);
        }
    }
  fetchData()
}, [category_id])

console.log('products from category name', products)
  return (
    <div className="CategoryPage">
      <h1> Category Page in the making</h1>
      <div className="Content">
        <div>
          <CategoryGridList categoryId={props.categoryId}
          // product_name = {products.}
           />
        </div>
      </div>
    </div>
  );
};



export default CategoryPage;
