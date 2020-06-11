import React, { useState, Fragment, useContext } from 'react';
import { TextField } from '@material-ui/core';
import { checkoutFormStyles } from '../styling/checkoutFormStyles';
import { Context } from '../../Contexts/CustomerContext';


const AddressForm = () => {
    const classes = checkoutFormStyles();
    const [state, dispatch] = useContext(Context);
    const [userInfo, setUserInfo] = useState(state.user.info);

    return (
        <Fragment>
            <TextField
                required
                variant='standard'
                label='Name'
                className={classes.textField}
                value={`${userInfo.firstname} ${userInfo.lastname}`}>
            </TextField><br />
            <TextField
                variant='standard'
                label='Address'
                className={classes.textField}
                value={userInfo.address}>
            </TextField><br />
            <TextField
                required
                variant='standard'
                label='City'
                className={classes.textField}
                value={userInfo.city}
                ></TextField><br />
            <TextField
                required
                variant='standard'
                label='Zip Code'
                className={classes.textField}
                value={userInfo.zip_code}
                ></TextField>
        </Fragment>
    )
};

export default AddressForm;