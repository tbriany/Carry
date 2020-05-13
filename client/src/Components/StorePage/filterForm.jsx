import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';

import Icon from '@material-ui/core/Icon';
import FilterListIcon from '@material-ui/icons/FilterList';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function MultipleSelect() {
  const classes = useStyles();
  const theme = useTheme();
  const [filter, setFilter] = useState([]);
  const [categories, setCategories] = useState([]);
  const [types, setTypes] = useState([]);
  const [brands, setBrands] = useState([]);
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);


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

  const fetchSizes = async () => {
    try {
      const sizes = await axios.get(`/products/sizes/all`)
      setSizes(sizes.data.payload)
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
      await fetchSizes()
    }
    fetchData()
  }, [])


  const handleChange = (event) => {
    setFilter(event.target.value);
  };

  const handleChangeMultiple = (event) => {
    const { options } = event.target;
    const value = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    setFilter(value);
  };


  return (
    <div>
      <FormControl className={classes.formControl}>
        <Icon color="inherit">
          <FilterListIcon />
        </Icon>
        <Typography variant="button">
          Refine By
        </Typography>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-mutiple-name-label">Category</InputLabel>
        <Select
          labelId="demo-mutiple-name-label"
          id="demo-mutiple-name"
          multiple
          value={filter}
          onChange={handleChange}
          input={<Input />}
          MenuProps={MenuProps}
        >
          {categories.map((name) => (
            <MenuItem key={name.category_name} value={name.category_name} style={getStyles(name, filter, theme)}>
              {name.category_name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-mutiple-checkbox-label">Type</InputLabel>
        <Select
          labelId="demo-mutiple-checkbox-label"
          id="demo-mutiple-checkbox"
          multiple
          value={filter}
          onChange={handleChange}
          input={<Input />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {types.map((name) => (
            <MenuItem key={name.product_type_name} value={name.product_type_name}>
              <Checkbox checked={filter.indexOf(name) > -1} />
              <ListItemText primary={name.product_type_name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-mutiple-checkbox-label">Brands</InputLabel>
        <Select
          labelId="demo-mutiple-checkbox-label"
          id="demo-mutiple-checkbox"
          multiple
          value={filter}
          onChange={handleChange}
          input={<Input />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {brands.map((name) => (
            <MenuItem key={name.brand_name} value={name.brand_name}>
              <Checkbox checked={filter.indexOf(name) > -1} />
              <ListItemText primary={name.brand_name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-mutiple-checkbox-label">Color</InputLabel>
        <Select
          labelId="demo-mutiple-checkbox-label"
          id="demo-mutiple-checkbox"
          multiple
          value={filter}
          onChange={handleChange}
          input={<Input />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {colors.map((name) => (
            <MenuItem key={name.color_name} value={name.color_name}>
              <Checkbox checked={filter.indexOf(name) > -1} />
              <ListItemText primary={name.color_name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-mutiple-checkbox-label">Size</InputLabel>
        <Select
          labelId="demo-mutiple-checkbox-label"
          id="demo-mutiple-checkbox"
          multiple
          value={filter}
          onChange={handleChange}
          input={<Input />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {sizes.map((name) => (
            <MenuItem key={name.size_id} value={name.size_id}>
              <Checkbox checked={filter.indexOf(name) > -1} />
              <ListItemText primary={name.product_size} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
