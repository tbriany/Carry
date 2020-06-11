import React, { Fragment, useState, useContext } from 'react';
import { Context } from '../Contexts/CustomerContext';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { accountStyles } from './styling/accountStyles';
import EditIcon from '@material-ui/icons/Edit';
import { IconButton } from '@material-ui/core';

const Account = () => {
    const classes = accountStyles();
    const [state, dispatch] = useContext(Context);
    const [user, setUser] = useState({ ...state.user.info });
    const updateInfoForm = () => {
        return (
            <>
                <TextField
                    className={classes.textField}
                    variant='standard'
                    label='First Name'
                    value={user.firstname}
                >
                </TextField> <br />
                <TextField
                    classname={classes.textField}
                    variant='standard'
                    label='Last Name'
                >

                </TextField>
                <br />
                <TextField
                    classname={classes.textField}
                    variant='standard'
                    label='Address'
                >

                </TextField>
                <br />
                <TextField
                    classname={classes.textField}
                    variant='standard'
                    label='City'
                >

                </TextField>
                <br />
                <TextField
                    classname={classes.textField}
                    variant='standard'
                    label='Zip Code'
                >

                </TextField>
                <br />
                <TextField
                    classname={classes.textField}
                    variant='standard'

                >

                </TextField>
                <br />
                <TextField
                    classname={classes.textField}
                    variant='standard'
                >

                </TextField>
            </>
        )
    };
    return (
        <Fragment>
            <CssBaseline />
            <Container maxWidth='sm' className={classes.container}>
                <Typography variant='h4' className={classes.text}>
                    Welcome {user.firstname}.
                </Typography>
                <IconButton onClick={updateInfoForm}>
                    <EditIcon/>
                </IconButton><br/>
                <TextField
                    className={classes.textField}
                    variant='standard'
                    label='First Name'
                    value={user.firstname}
                    disabled
                /> <br />
                <TextField
                    classname={classes.textField}
                    variant='standard'
                    label='Last Name'
                    value={user.lastname}
                    disabled
                />
                <br />
                <TextField
                    classname={classes.textField}
                    variant='standard'
                    label='Address'
                    value={user.address}
                    disabled
                />
                <br />
                <TextField
                    classname={classes.textField}
                    variant='standard'
                    label='City'
                    value={user.city}
                    disabled
                />
                <br />
                <TextField
                    classname={classes.textField}
                    variant='standard'
                    label='Zip Code'
                    value={user.zip_code}
                    disabled
                />
                <br />
                <TextField
                    classname={classes.textField}
                    variant='standard'
                    label='Phone Number'
                    value={user.phone_number}
                    disabled
                />
                <br />
                <TextField
                    classname={classes.textField}
                    variant='standard'
                    label='email'
                    value={user.email}
                    disabled
                />
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
