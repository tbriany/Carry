import React from 'react';	
import TextField from '@material-ui/core/TextField';	
import Autocomplete from '@material-ui/lab/Autocomplete';	

export default function Playground() {	
  const defaultProps = {	
    options: top100Films,	
    getOptionLabel: (option) => option.title,	
  };	

  const flatProps = {	
    options: top100Films.map((option) => option.title),	
  };	

  const [value, setValue] = React.useState(null);	

  return (	
    <div style={{ width: 250 }}>	
         <Autocomplete	
        {...defaultProps}	
        id="debug"	
        debug	
        renderInput={(params) => <TextField {...params} label="Stores" margin="normal" />}	
      />	
      <Autocomplete	
        {...defaultProps}	
        id="debug"	
        debug	
        renderInput={(params) => <TextField {...params} label="Brands" margin="normal" />}	
      />	
      <Autocomplete	
        {...defaultProps}	
        id="clear-on-escape"	
        clearOnEscape	
        renderInput={(params) => <TextField {...params} label="Type" margin="normal" />}	
      />	
      <Autocomplete	
        {...defaultProps}	
        id="disable-clearable"	
        disableClearable	
        renderInput={(params) => <TextField {...params} label="Color" margin="normal" />}	
      />	
       <Autocomplete	
        {...defaultProps}	
        id="debug"	
        debug	
        renderInput={(params) => <TextField {...params} label="Price" margin="normal" />}	
      />	
    </div>	
  );	
}	

const top100Films = [	
    { title: 'The Shawshank Redemption', year: 1994 },	
    { title: 'The Godfather', year: 1972 },	
    { title: 'The Godfather: Part II', year: 1974 },	
    { title: 'The Dark Knight', year: 2008 },	
    { title: '12 Angry Men', year: 1957 },	
    { title: "Schindler's List", year: 1993 },	
    { title: 'Pulp Fiction', year: 1994 },	
    { title: 'The Lord of the Rings: The Return of the King', year: 2003 },	
    { title: 'The Good, the Bad and the Ugly', year: 1966 },	
    { title: 'Fight Club', year: 1999 }] 