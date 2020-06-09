import React, { Fragment, useState, useContext } from 'react';
import { Context } from '../Contexts/CustomerContext';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { accountStyles } from './styling/accountStyles';

const Account = () => {
    const classes = accountStyles();
    const [state, dispatch] = useContext(Context);
    const [user, setUser] = useState({ ...state.user.info });
    return (
        <Fragment>
            <CssBaseline />
            <Container maxWidth='sm' className={classes.container}>
                <Typography variant='h4' className={classes.text}>
                    Welcome {user.firstname}.
                </Typography>
                <TextField
                    className={classes.textField}
                    variant='standard'
                    label='First Name'
                    // value={user.firstname}
                // onChange={handleInputChange('firstname')}
                > {user.firstname}
                </TextField>
            </Container>
        </Fragment>
    )
};


export default Account

    // const handleInputChange = (key) => (e) => {
    //     switch(key){
    //         case 'firstname': 

    //     }
    // }
