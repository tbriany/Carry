import React, {useState, useEffect} from 'react';	
import axios from 'axios'
import TextField from '@material-ui/core/TextField';	
import Autocomplete from '@material-ui/lab/Autocomplete';	
import customTheme from '../styling/customTheme'
import FilterListIcon from '@material-ui/icons/FilterList';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';

export default function Playground({ products, applyFilters, applyFiltersBrand, applyFiltersType}) {	
const [categories, setCategories] = useState([]);
const [stores, setStores]= useState([]);
const [types, setTypes] = useState([]);
const [brands, setBrands] = useState([]);
const [colors, setColors] = useState([]);


const fetchCategories = async () => {
  try {
    const categories = await axios.get(`/products/categories/all`)
    setCategories(categories.data.payload)
  } catch (err) {
    console.log(err)
  }
}

const fetchStores = async () => {
  try {
    const stores = await axios.get('/stores')
    setStores(stores.data.payload)
    console.log('filter stores', stores)
  } catch (err) {
    console.log(err)
  }
}

const fetchTypes = async () => {
  try {
    const types = await axios.get(`/products/product_types/all`)
    setTypes(types.data.payload)
  } catch (err) {
    console.log(err)
  }
}

const fetchBrands = async () => {
  try {
    const brands = await axios.get(`/products/brands/all`)
    setBrands(brands.data.payload)
  } catch (err) {
    console.log(err)
  }
}

const fetchColors = async () => {
  try {
    const colors = await axios.get(`/products/colors/all`)
    setColors(colors.data.payload)
  } catch (err) {
    console.log(err)
  }
}

useEffect(() => {
  const fetchData = async () => {
    await fetchCategories()
    await fetchStores()
    await fetchTypes()
    await fetchBrands()
    await fetchColors()
  }
  fetchData()
}, [])


const Category = {
  options: categories,
  getOptionLabel: (option) => option.category_name,
};

const Store = {
  options: stores,
  getOptionLabel: (option) => option.store_name,
};

const Brand = {
  options: brands,
  getOptionLabel: (option) => option.brand_name,
};

const Type = {
  options: types,
  getOptionLabel: (option) => option.product_type_name,
};

const Color = {
  options: colors,
  getOptionLabel: (option) => option.color_name,
};


return (
  <div style={{ width: 250, paddingLeft: '15px'}}>

    <div style={{float: 'left'}}>
    <Icon color="inherit">
      <FilterListIcon />
    </Icon>
    <Typography variant="button">
      Refine By
    </Typography>
    </div>

    <Autocomplete
      {...Category}
      multiple
      id="tags-standard"
      // id="debug"
      // debug
      renderInput={(params) => <TextField {...params} label="Category" margin="normal" />}
      onChange={(event, newValue) => {
        console.log(newValue[0].category_name);
        applyFilters(newValue[0].category_name);
      }}
    />
     <Autocomplete
      {...Store}
      id="debug"
      debug
      renderInput={(params) => <TextField  {...params} label="Stores" margin="normal"
      />}
      onChange={(event, newValue) => {
        console.log(newValue.brand_name);
        applyFilters(newValue.brand_name);
      }}
    />
    <Autocomplete
      {...Brand}
      id="debug"
      debug
      renderInput={(params) => <TextField  {...params} label="Brand" margin="normal"
      />}
      onChange={(event, newValue) => {
        console.log(newValue.brand_name);
        applyFiltersBrand(newValue.brand_name);
      }}
    />
    <Autocomplete
      {...Type}
      id="clear-on-escape"
      clearOnEscape
      renderInput={(params) => <TextField {...params} label="Type" margin="normal" />}
      onChange={(event, newValue) => {
        console.log(newValue.product_type_name);
        applyFiltersType(newValue.product_type_name);
      }}
    />
    <Autocomplete
      {...Color}
      id="disable-clearable"
      disableClearable
      renderInput={(params) => <TextField {...params} label="Color" margin="normal" />}
      onChange={(event, newValue) => {
        console.log(newValue.color_name);
        applyFilters(newValue.color_name);
      }}
    />

  </div>
);
}