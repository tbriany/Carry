import React, {useState, useEffect} from 'react';	
import axios from 'axios'
import TextField from '@material-ui/core/TextField';	
import Autocomplete from '@material-ui/lab/Autocomplete';	
import customTheme from '../styling/customTheme'
import FilterListIcon from '@material-ui/icons/FilterList';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';

const filters = {}

export default function CategoorySearch({ products, applyFilters }) {	
const [stores, setStores]= useState([]);



const fetchStores = async () => {
  try {
    const stores = await axios.get('/stores')
    setStores(stores.data.payload)
    console.log('filter stores', stores)
  } catch (err) {
    console.log(err)
  }
}

useEffect(() => {
  const fetchData = async () => {
    await fetchStores()

  }
  fetchData()
}, [])


// const Category = {
//   options: categories,
//   getOptionLabel: (option) => option.category_name,
// };

const Store = {
  options: stores,
  getOptionLabel: (option) => option.store_name,
};


return (
  <div style={{ width: 250, paddingLeft: '15px'}}>

    <div style={{float: 'left'}}>
  
     <Autocomplete
      {...Store}
      freeSolos
      id="debug"
      debug
      renderInput={(params) => <TextField  {...params} label="Search for stores here" margin="normal"
    
      />}
      onChange={(event, newValue) => {
        console.log('store search newvalue',newValue);
        filters['stores'] = newValue
        applyFilters(newValue);
      }}
    />
  </div>
</div>
);
}