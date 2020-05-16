import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, Route, Switch } from "react-router-dom";
import { LandingContext } from "../../Contexts/LandingPageDetailsContext"
import CategoryGridList from "./CategoryGrid";
// styling 
import MultilineTextFields from './CategorySearchBar';
import CheckboxesTags from '../LandingPageComponents/CategoryFilterBar'
import customTheme from "../styling/customTheme";
import { CheckBoxOutlineBlankOutlined } from "@material-ui/icons";

const CategoryPage = (props) => {
  const [products, setProducts] = useState([]);
  const { categories } = useContext(
    LandingContext
  );
  console.log('category Page categories' , categories)

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
      <div className='CategoryNav'
      style ={{marginTop: '20px', display:'flex', justifyContent:'space-evenly', marginLeft:'20px', marginRight:'30px'}}>
      {categories.map((value) => ( <Link to = {`/categories/${value.category_name}`} 
      
      style ={{textDecoration:'none', color: '#CD853F', active:'#FAEBD7'}}
      
      > {value.category_name} </Link>
 ))} 
        
      </div>
      <div style ={{ display: 'flex', justifyContent: 'space-between'}}>
        <h1 style={{
            fontFamily: "Palatino Linotype",
            textAlign: "left",
            color: customTheme.palette.secondary.dark,
            marginLeft: '25px'
          }}>{category_name}</h1>
        <div className="SearchBar">
          {" "}
          <MultilineTextFields/>
          {" "}
        </div>
      </div>
     

      <div className="Content">
      <div className ='sidebar'
      style={{margin:'25px'}}>
      <CheckboxesTags/>
      </div>
        <div >
          <CategoryGridList
            categoryId={props.categoryId}
            product_name={products.product_name}
            products={products}
          />
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
