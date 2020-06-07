import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { checkValidEmail, checkValidPassword, checkEmptyInput } from './util/inputHelpers';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { Button, CssBaseline, TextField, Link, Grid, Box, Typography, Container, InputAdornment, IconButton, Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { signupStyles } from './styling/signupStyles';
import { Context } from '../Contexts/CustomerContext';

const Signup = () => {
    const classes = signupStyles();
    const history = useHistory();
    const [state, dispatch] = useContext(Context);
    const [alert, setAlert] = useState(false);
    const [newFirstname, setFirstname] = useState({
        firstname: '',
        error: false,
        errorText: ''
    });
    const [newLastname, setLastname] = useState({
        lastname: '',
        error: false,
        errorText: ''
    });
    const [newCustomerEmail, setNewCustomerEmail] = useState({
        email: '',
        error: false,
        errorText: ''
    });
    const [newCustomerPassword, setNewCustomerPassword] = useState({
        password: '',
        showPassword: false,
        error: false,
        errorText: ''
    });
    const handleNewCustomerInput = (key) => (e) => {
        switch (key) {
            case 'email':
                setNewCustomerEmail({ ...newCustomerEmail, [key]: e.target.value })
                break;
            case 'password':
                setNewCustomerPassword({ ...newCustomerPassword, [key]: e.target.value })
                break;
            case 'firstname':
                setFirstname({ ...newFirstname, [key]: e.target.value })
                break;
            case 'lastname':
                setLastname({ ...newLastname, [key]: e.target.value })
                break;
        }
    };
    const handleNewEmailError = (bool, str) => {
        setNewCustomerEmail({ ...newCustomerEmail, error: bool, errorText: str })
    };
    const handleNewPasswordError = (bool, str) => {
        setNewCustomerPassword({ ...newCustomerPassword, error: bool, errorText: str })
    };
    const handleInputError = (bool, str, input) => {
        input === 'first name' ? setFirstname({ ...newFirstname, error: bool, errorText: str }) : setLastname({ ...newLastname, error: bool, errorText: str })
    };
    const handleNewPasswordVisibility = () => {
        setNewCustomerPassword({ ...newCustomerPassword, showPassword: !newCustomerPassword.showPassword })
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        let customerFirstname = newFirstname.firstname;
        let customerLastname = newLastname.lastname;
        let customerEmail = newCustomerEmail.email;
        let customerPassword = newCustomerPassword.password;
        checkValidEmail(customerEmail, handleNewEmailError);
        checkValidPassword(customerPassword, handleNewPasswordError);
        checkEmptyInput(customerFirstname, handleInputError, 'first name');
        checkEmptyInput(customerLastname, handleInputError, 'last name');
        let firstnameError = newFirstname.error;
        let lastnameError = newLastname.error;
        let emailError = newCustomerEmail.error;
        let passwordError = newCustomerPassword.error;
        if (!firstnameError && !lastnameError && !emailError && !passwordError) {
            try {
                await axios.post('/auth/signup', { firstname: customerFirstname, lastname: customerLastname, email: customerEmail, password: customerPassword }).then(res => {
                    const user = res.data;
                    window.localStorage.setItem('customer', JSON.stringify(user.payload));
                    axios.post('/auth/login', user.email, user.customerPassword);
                    dispatch({ type: 'SET_USER', payload: user });
                    setAlert(!alert)
                    setTimeout(() => {
                        history.push('/account')
                    }, 3000);
                });
            }
            catch (err) {
                throw err
            }
        };
    };
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Typography component="h1" variant="h5" className={classes.header}>
                    SIGN UP
                  </Typography>
                <form className={classes.form} noValidate onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                className={classes.textField}
                                autoComplete="fname"
                                name="firstName"
                                variant="outlined"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoFocus
                                value={newFirstname.firstname}
                                onChange={handleNewCustomerInput('firstname')}
                                error={newFirstname.error}
                                helperText={newFirstname.errorText}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                className={classes.textField}
                                variant="outlined"
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="lname"
                                value={newLastname.lastname}
                                onChange={handleNewCustomerInput('lastname')}
                                error={newLastname.error}
                                helperText={newLastname.errorText}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                className={classes.textField}
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                value={newCustomerEmail.email}
                                onChange={handleNewCustomerInput('email')}
                                error={newCustomerEmail.error}
                                helperText={newCustomerEmail.errorText}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                className={classes.textField}
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type={newCustomerPassword.showPassword ? 'text' : 'password'}
                                id="password"
                                autoComplete="current-password"
                                value={newCustomerPassword.password}
                                onChange={handleNewCustomerInput('password')}
                                error={newCustomerPassword.error}
                                helperText={newCustomerPassword.errorText}
                                InputProps={{
                                    endAdornment:
                                        <InputAdornment position='end'
                                        >
                                            <IconButton onClick={handleNewPasswordVisibility} className={classes.iconStyle}>
                                                {newCustomerPassword.showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                }}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="default"
                        className={classes.submit}
                        onSubmit={handleSubmit}
                    >
                        Sign Up
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link href="/login" to='/login' variant="body2" className={classes.signinLink}>
                                Already have an account? Sign in
                        </Link>
                        </Grid>
                    </Grid>
                </form>
                <Snackbar open={alert} autoHideDuration={6000} >
                    <MuiAlert severity="success">
                        User Successfully Registered!
                    </MuiAlert>
                </Snackbar>
            </div>
            <Box mt={5}>
            </Box>
        </Container>
    );
}

export default Signup;