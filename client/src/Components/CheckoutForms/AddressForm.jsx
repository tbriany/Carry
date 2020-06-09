import React, { useState, Fragment, useContext } from 'react';
import { TextField } from '@material-ui/core';
import { checkoutFormStyles } from '../styling/checkoutFormStyles';
import { Context } from '../../Contexts/CustomerContext'


const AddressForm = () => {
    const classes = checkoutFormStyles();
    const [state, dispatch] = useContext(Context);
    const [userInfo, setUserInfo] = useState({ ...state.user.info })
    console.log('userInfo', userInfo)
    return (
        <Fragment>
            <TextField
                required
                variant='standard'
                label='Address Line 1'
                className={classes.textField}
                value={userInfo.address}>
            </TextField><br />
            <TextField
                variant='standard'
                label='Address Line 2'
                className={classes.textField}
                value={userInfo.address2}></TextField><br />
            <TextField
                required
                variant='standard'
                label='City'
                className={classes.textField}
                ></TextField><br />
            <TextField
                required
                variant='standard'
                label='Zip Code'
                className={classes.textField}></TextField>
        </Fragment>
    )
};

export default AddressForm;