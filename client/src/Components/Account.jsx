import React, { Fragment, useState, useContext } from 'react';
import { Context } from '../Contexts/CustomerContext';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { accountStyles } from './styling/accountStyles';
import EditIcon from '@material-ui/icons/Edit';
import { IconButton, Button} from '@material-ui/core';
import customTheme from './styling/customTheme';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const Account = () => {
    const classes = accountStyles();
    const [state, dispatch] = useContext(Context);
    const [user, setUser] = useState({ ...state.user.info });
    const history = useHistory();
    const [updateUser, setUpdateUser] = useState({
        firstname: user.firstname,
        lastname: user.lastname, 
        address: user.address,
        city: user.city,
        state: user.state,
        zip_code: 10011,
        phone_number: user.phone_number,
        email: user.email,
        password: user.password,
    });
    const updateKey = (key) => (e) => {
            if(key === 'zip_code'){
            setUpdateUser({...updateUser, [key]: parseInt(e.target.value)})
            }
            else{ setUpdateUser({...updateUser, [key]: e.target.value})
        }
    };
    const updateInfo = async (e) => {
        e.preventDefault();
        dispatch({ type: 'SET_USER', payload: updateUser});
        window.localStorage.setItem('customer', JSON.stringify(updateUser));
        try {
            let updatedUser = await axios.patch(`/customers/edit/${user.customer_id}`, updateUser).then((res) => {return res.data.payload});
            console.log('updatedUser', updatedUser)
            setTimeout(() => {
                history.push('/checkout')
            }, 1500);
        }
        catch(err){
            console.log(err)
        }
    }
    return (
        <Fragment>
            <CssBaseline />
            <Container maxWidth='sm' className={classes.container}>
                <Typography variant='h4' className={classes.text}>
                    Welcome {user.firstname}.
                </Typography>
                <form onSubmit={updateInfo}>
                <TextField
                    className={classes.textField}
                    variant='standard'
                    label='First Name'
                    value={updateUser.firstname}
                    onChange={updateKey('firstname')}
                /> <br />
                <TextField
                    className={classes.textField}
                    variant='standard'
                    label='Last Name'
                    value={updateUser.lastname}
                    onChange={updateKey('lastname')}
                />
                <br />
                <TextField
                    className={classes.textField}
                    variant='standard'
                    label='Address'
                    value={updateUser.address}
                    onChange={updateKey('address')}
                />
                <br />
                <TextField
                    className={classes.textField}
                    variant='standard'
                    label='City'
                    value={updateUser.city}
                    onChange={updateKey('city')}
                />
                <br />
                <TextField
                    className={classes.textField}
                    variant='standard'
                    label='State'
                    value={updateUser.state}
                    onChange={updateKey('state')}
                />
                <br />
                <TextField
                    className={classes.textField}
                    variant='standard'
                    label='Zip Code'
                    value={10011}
                />
                <br />
                <TextField
                    className={classes.textField}
                    variant='standard'
                    label='Phone Number'
                    value={updateUser.phone_number}
                    onChange={updateKey('phone_number')}
                />
                <br />
                <TextField
                    className={classes.textField}
                    variant='standard'
                    label='Email'
                    value={updateUser.email}
                    onChange={updateKey('email')}
                /><br/>
                {/* <TextField
                    className={classes.textField}
                    variant='standard'
                    label='Credit Card Info'
                    value={updateUser.cc}
                    onChange={updateKey('cc')}
                /><br/>
                <TextField
                    className={classes.textField}
                    variant='standard'
                    label='Cvv'
                    value={updateUser.cvv}
                    onChange={updateKey('cvv')}
                /><br/>
                <TextField
                    className={classes.textField}
                    variant='standard'
                    label='Expiration Date'
                    value={updateUser.expiration}
                    onChange={updateKey('expiration')}
                /> */}
                <br/><br/>
                <Button style={{backgroundColor: customTheme.palette.secondary.main}} onClick={updateInfo}>Update Information</Button>
                </form>
            </Container>
        </Fragment>
    )
};


export default Account;