import React, { useState, useContext } from 'react';
import { Context } from '../Contexts/CustomerContext';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

const Account = () => {
    const [state, dispatch] = useContext(Context);
    return (
        <div>
            <Typography>
                Welcome !
            </Typography>
        </div>
    )
};


export default Account