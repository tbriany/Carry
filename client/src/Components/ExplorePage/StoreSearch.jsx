import React, {useState, useEffect} from 'react';
import axios from 'axios'
import {Link} from 'react-router-dom'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import SearchIcon from '@material-ui/icons/Search';

export default function CategorySearch() {
const [stores, setStores] = useState([]);
const [selected, Setselected] = useState([])

const fetchStores = async () => {
    try {
      const stores = await axios.get(`/stores`)
      setStores(stores.data.payload)
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

   const handleInput = event => {
    Setselected({
      [event.target.name]: event.target.value
    });
    console.log('search selected option', selected);
  };
  
 console.log('store page')




  return (
    <div style={{ width: '300', margin: '20px'}}>
     
      <Autocomplete
        freeSolo
        id="free-solo-2-demo"
        disableClearable
        options={stores.map((option) => option.store_name)}
        renderInput={(params) => (
          // <Link to = {`/store/${stores.store_name}`}>   
          <TextField
            {...params}
            label="Stores on Carry?"
            margin="normal"
            variant="outlined"
            InputProps={{ ...params.InputProps, type: 'search' }}
            onChange = {handleInput}
          />
        // </Link> 
         
        )}
      />
    </div>
  );
}

