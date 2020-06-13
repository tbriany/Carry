import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Icon from '@material-ui/core/Icon';
import FilterListIcon from '@material-ui/icons/FilterList';
import Typography from '@material-ui/core/Typography';
import customTheme from '../styling/customTheme';

const filters = {}

export default function MultipleSelect({ applyFilters }) {
  const [categories, setCategories] = useState([]);
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
      await fetchTypes()
      await fetchBrands()
      await fetchColors()
    }
    fetchData()
  }, [])


  const Category = {
    options: categories,
    getOptionLabel: (option) => option.categories_name,
  };

  const Brand = {
    options: brands,
    getOptionLabel: (option) => option.brands_name,
  };

  const Type = {
    options: types,
    getOptionLabel: (option) => option.product_type_name,
  };

  const Color = {
    options: colors,
    getOptionLabel: (option) => option.colors_name,
  };


  return (
    <div style={{ width: 250, paddingLeft: '15px' }}>

      <div style={{ float: 'left' }}>
        <Icon color="inherit">
          <FilterListIcon />
        </Icon>
        <Typography variant="button">
          Refine By
      </Typography>
      </div>

      {/* 
      <Autocomplete
        {...Category}
        multiple
        id="tags-standard"
        renderInput={(params) => <TextField {...params} label="Category" margin="normal" />}
        onChange={(event, newValue) => {
          console.log(newValue[0].categories_name);
          filters["categories"] = newValue[0].categories_name
          applyFilters(filters)
        }}
      /> */}
      <Autocomplete
        {...Category}
        id="debug"
        debug
        renderInput={(params) => <TextField {...params} label="Category" margin="normal" />}
        onChange={(event, newValue) => {
        (newValue == null ? delete filters["categories"] : filters["categories"] = newValue.categories_name)
        applyFilters(filters);
        }}
      />
      <Autocomplete
        {...Brand}
        id="debug"
        debug
        renderInput={(params) => <TextField  {...params} label="Brand" margin="normal" />}
        onChange={(event, newValue) => {
          (newValue == null ? delete filters["brands"] : filters["brands"] = newValue.brands_name)
          applyFilters(filters);
        }}
      />
      <Autocomplete
        {...Type}
        id="debug"
        debug
        renderInput={(params) => <TextField {...params} label="Type" margin="normal" />}
        onChange={(event, newValue) => {
          (newValue == null ? delete filters["product_type"] : filters["product_type"] = newValue.product_type_name)
          applyFilters(filters);
        }}
      />
      <Autocomplete
        {...Color}
        id="debug"
        debug
        renderInput={(params) => <TextField {...params} label="Color" margin="normal" />}
        onChange={(event, newValue) => {
          (newValue == null ? delete filters["colors"] : filters["colors"] = newValue.colors_name)
          applyFilters(filters);
        }}
      />

    </div>
  );
}
