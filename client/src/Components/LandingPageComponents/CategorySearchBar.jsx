import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '35ch',
    },
    textField: {
  
    },
  },
}));

export default function MultilineTextFields() {
  const classes = useStyles();
  const [value, setValue] = React.useState('Controlled');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div className= 'SearchBar'
      style ={{
        float: 'right',
        padding: '6px',
        marginTop: '8px',
        marginRight: '16px',
        fontSize: '17px'
      }}>
    
        <TextField
          id="outlined-textarea"
          label="What are you looking for?"
          multiline
          variant="outlined"
          color='#red'
        />
     
      </div>
    </form>
  );
}
