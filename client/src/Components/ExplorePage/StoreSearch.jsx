import React, { useState, useEffect } from "react";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import customTheme from "../styling/customTheme";
import FilterListIcon from "@material-ui/icons/FilterList";
import Typography from "@material-ui/core/Typography";
import Icon from "@material-ui/core/Icon";

const filters = {};






export default function CategoorySearch({ products, applyFilters }) {
  const [stores, setStores] = useState([]);

  const fetchStores = async () => {
    try {
      const stores = await axios.get("/stores");
      setStores(stores.data.payload);
      console.log("filter stores", stores);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchStores();
    };
    fetchData();
  }, []);

  // const Category = {
  //   options: categories,
  //   getOptionLabel: (option) => option.category_name,
  // };

  const Store = {
    options: stores,
    getOptionLabel: (option) => option.store_name,
  };

  return (
    <div style={{ width: 250, paddingLeft: "15px" }}>
      <div style={{margin:'25px', float: "left" }}>
        <Autocomplete
          {...Store}
          freeSolos
          id="debug"
          debug
          fullWidth
          style={{ width: 500 }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search for stores here"
              margin="normal"
              fullWidth
            />
          )}
          onChange={(event, newValue) => {
            console.log(newValue);
            filters["stores"] = newValue;
            applyFilters(newValue);
          }}
        />
      </div>
    </div>
  );
}

// // links that work
// import React, {useState, useEffect} from 'react';
// import axios from 'axios'
// import {Link} from 'react-router-dom'
// import TextField from '@material-ui/core/TextField';
// import Autocomplete from '@material-ui/lab/Autocomplete';
// import SearchIcon from '@material-ui/icons/Search';
// import MenuItem from '@material-ui/core/MenuItem'
// export default function CategorySearch() {
// const [stores, setStores] = useState([]);
// const [selected, Setselected] = useState([])

// const fetchStores = async () => {
//     try {
//       const stores = await axios.get(`/stores`)
//       setStores(stores.data.payload)
//     } catch (err) {
//       console.log(err)
//     }
//   }

//   useEffect(() => {
//     const fetchData = async () => {
//       await fetchStores()
//     }
//     fetchData()
//   }, [])

//   return (
//     <div style={{ width: '300', margin: '20px'}}>

//      <TextField
//           id="standard-select-currency"
//           select
//           label="Search for stores"
//           value={stores}
//           fullWidth
//           // onChange={handleChange}
//         >
//           {stores.map((option) => (
//             <Link to={`/store/${option.store_id}`} style={{textDecoration:'none'}}>
//             <MenuItem key={option.value} value={option.value}>
//               {option.store_name}
//             </MenuItem>

//             </Link>

//           ))}

//         </TextField>

//     </div>
//   );
// }
