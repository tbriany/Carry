import React, {useState, useEffect} from 'react';	
import axios from 'axios'
import TextField from '@material-ui/core/TextField';	
import Autocomplete from '@material-ui/lab/Autocomplete';	
import customTheme from '../styling/customTheme'

export default function Playground({ products }) {	
console.log('products on category filter', products.length)



//  useEffect(() => {
//   const fetchData = async () => {
//  await filterbrands()
//   }
//   fetchData()
// }, [])



 // creating options for drop down. 
  const Brands = {	
   options: products,	
    getOptionLabel: (products) => products.brand_name
  };	


const Stores = {
  options: products,	
    getOptionLabel: (products) => products.store_name
  };	




  return (	
    <div style={{ width: 250 }}>	
         <Autocomplete	
        {...Brands}	
        id="debug"	
        debug	
        renderInput={(params) => <TextField label=  'customTheme.palette.secondary.dark' {...params} label="Brands" margin="normal"
      color ='customTheme.palette.secondary.dark'
         />}	
      />	
       <Autocomplete	
        {...Stores}	
        id="debug"	
        debug	
        renderInput={(params) => <TextField {...params} label="Stores" margin="normal" />}	
      />	
      {/* <Autocomplete	
        {...Types}	
        id="clear-on-escape"	
        clearOnEscape	
        renderInput={(params) => <TextField {...params} label="Type" margin="normal" />}	
      />	
      <Autocomplete	
        {...Colors}	
        id="disable-clearable"	
        disableClearable	
        renderInput={(params) => <TextField {...params} label="Color" margin="normal" />}	
      /> */}
    </div>	
  );	
}	

