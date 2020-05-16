import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
import loginStyles from '../../Components/'
export default function CheckboxesTags({products}) {




  console.log(prod)
  return (
      <div> 
    <Autocomplete
      multiple
      id="checkboxes-tags-demo"
  
      options={products}
      disableCloseOnSelect
      getOptionLabel={(option) =>
        option.brand_name}
      renderOption={(option, { selected }) => (
        <React.Fragment>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option.title}
        </React.Fragment>
      )}
      style={{ width: 250 }}
      renderInput={(params) => (
        <TextField 
         {...params} variant="standard" label="Brands" placeholder="Favorites"
        width='200px'
        />
      )}
    />
</div>
  );
}
