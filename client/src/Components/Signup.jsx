import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { checkValidEmail, checkValidPassword, checkEmptyInput } from './util/inputHelpers';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { InputAdornment, IconButton } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const Signup = () => {
    const classes = useStyles();
    const [newFirstname, setFirstname] = useState({
        firstname: '',
        error: false,
        errorText: ''
    });
    const [newLastname, setLastname] = useState({
        lastname: '',
        error: false,
        errorText: ''
    });;
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
                setLastname({...newLastname, [key]: e.target.value})
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
        input === 'first name' ? setFirstname({...newFirstname, error: bool, errorText: str}) : setLastname({...newLastname, error: bool, errorText: str})
    };
    const handleNewPasswordVisibility = () => {
        setNewCustomerPassword({ ...newCustomerPassword, showPassword: !newCustomerPassword.showPassword })
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        let customerFirstname = newFirstname.firstname;
        let customerLastname = newLastname.lastname;
        let customerEmail = newCustomerEmail.email;
        let customerPassword = newCustomerPassword.password;
        checkValidEmail(customerEmail, handleNewEmailError);
        checkValidPassword(customerPassword, handleNewPasswordError);
        checkEmptyInput(customerFirstname, handleInputError, 'first name');
        checkEmptyInput(customerLastname, handleInputError, 'last name');
    };
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Sign up
                  </Typography>
                <form className={classes.form} noValidate onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12}>
                            <TextField
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
                                variant="outlined"
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="lname"
                                value={newLastname.lastname}
                                error={newLastname.error}
                                helperText={newLastname.errorText}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
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
                                            <IconButton onClick={handleNewPasswordVisibility}>
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
                            <Link href="/login" to='/login' variant="body2">
                                Already have an account? Sign in
                        </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={5}>
            </Box>
        </Container>
    );
}

export default Signup;