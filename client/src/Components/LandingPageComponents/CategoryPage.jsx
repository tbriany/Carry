import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, Route, Switch } from "react-router-dom";
//import TitlebarGridList from './CategoryGrid'



const CategoryPage = (props) =>{
 const [category_id, setCategory_id] = useState(0)

const [products, setProducts] = useState('')

setCategory_id(props.matcg.params.type)
// useeffect to  make a network request to backend to get all stores/ products of that category. 

useEffect(()=>{
axios
    .get(`/products/category/${props.match.params.type}`)
    .then((res) => {
      console.log('Getting all products of category', res.data.payload);
    
    })
    .catch((err) => {
      console.log(err, 'unable to get back all products of this catergory');
    });
}, []);





    return(

        <div> 
            <h1> Category Page  in the making</h1>
  

        </div>
    )
}

export default CategoryPage;