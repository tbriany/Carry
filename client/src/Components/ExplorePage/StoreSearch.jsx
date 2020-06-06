import React, {useState, useEffect} from 'react';
import axios from 'axios'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

export default function CategorySearch() {
const [stores, setTypes] = useState([]);



const fetchTypes = async () => {
    try {
      const stores = await axios.get(`/stores`)
      setTypes(stores.data.payload)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      await fetchTypes()
    }
    fetchData()
  }, [])





  return (
    <div style={{ width: '300', margin: '20px'}}>
      <Autocomplete
        freeSolo
        id="free-solo-2-demo"
        disableClearable
        options={stores.map((option) => option.store_name)}
        renderInput={(params) => (
          <TextField
      
            {...params}
            label="Stores on Carry?"
            margin="normal"
            variant="outlined"
            InputProps={{ ...params.InputProps, type: 'search' }}
          />
        )}
      />
    </div>
  );
}

