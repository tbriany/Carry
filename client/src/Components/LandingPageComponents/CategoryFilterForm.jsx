import React from 'react';	
import TextField from '@material-ui/core/TextField';	
import Autocomplete from '@material-ui/lab/Autocomplete';	
import customTheme from '../styling/customTheme'

export default function Playground() {	
  const Brands = {	
    options: Brand,	
    getOptionLabel: (option) => option.title,	
  };	
  const Stores = {	
    options: Store,	
    getOptionLabel: (option) => option.title,	
  };	

  const Types = {	
    options: Type,	
    getOptionLabel: (option) => option.title,	
  };

  const Colors = {	
    options: Color,	
    getOptionLabel: (option) => option.title,	
  };

  const Prices = {	
    options: Price,	
    getOptionLabel: (option) => option.title,	
  };
  

  const flatProps = {	
    options: Store.map((option) => option.title),
    options: Brand.map((option) => option.title),
    options: Type.map((option) => option.title),
    options: Color.map((option) => option.title),
    options: Price.map((option) => option.title)
  };	

  const [value, setValue] = React.useState(null);	

  return (	
    <div style={{ width: 250 }}>	
         <Autocomplete	
        {...Brands}	
        id="debug"	
        debug	
        renderInput={(params) => <TextField label=  'customTheme.palette.secondary.dark' {...params} label="Brands" margin="normal"
         />}	
      />	
      <Autocomplete	
        {...Stores}	
        id="debug"	
        debug	
        renderInput={(params) => <TextField {...params} label="Stores" margin="normal" />}	
      />	
      <Autocomplete	
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
      />	
       <Autocomplete	
        {...Prices}	
        id="debug"	
        debug	
        renderInput={(params) => <TextField {...params} label="Price" margin="normal" />}	
      />	
    </div>	
  );	
}	

const Brand = [	
    { title: 'Lima Sagrada', year: 1994 }];

const Store = [
    { title: 'PazLifeStyle', year: 1994 },
    { title: 'Louis Vuitton', year: 1994 },
    { title: 'Prada', year: 1994 },
    { title: 'Chanel', year: 1994 },
    { title: 'Tiffany & Co.', year: 1994 },
    { title: 'Giorgio Armani New York', year: 1994 },
    { title: 'Hermes Men', year: 1994 }
]

const Type = [	
    { title: 'Belts', year: 1994 },
    { title: 'Bags', year: 1994 },
    { title: 'Purses', year: 1994 }
];


const Color = [	
    { title: 'Black', year: 1994 },
    { title: 'White', year: 1994 },
    { title: 'Pink', year: 1994 },
    { title: 'Brown', year: 1994 },
    { title: 'Green', year: 1994 }, { title: 'Yellow', year: 1994 }, { title: 'Purple', year: 1994 }
];

const Price = [	
    { title: 'Low to High', year: 1994 },
    { title: 'High to Low', year: 1994 },
];