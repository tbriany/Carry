import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import Container from '@material-ui/core/Container';
import Snackbar from '@material-ui/core/Snackbar';
import { checkValidEmail, checkValidPassword } from "./util/inputHelpers";
import InputAdornment from '@material-ui/core/InputAdornment';
import { Context } from '../Contexts/CustomerContext';
import { loginStyles } from './styling/loginStyles';
import MuiAlert from '@material-ui/lab/Alert';

const Login = () => {
    const history = useHistory();
    //imports the global state and dispatch to modify global state 
    //dispatch is a function that takes in an Action and object to add to the state
    const [state, dispatch] = useContext(Context);
    //imports styling for components
    const classes = loginStyles();
    //declaring hooks that hold values for inputs as object keys
    const [alert, setAlert] = useState(false);
    const [customerEmail, setCustomerEmail] = useState({
        email: '',
        error: false,
        errorText: ''
    });
    const [customerPassword, setCustomerPassword] = useState({
        password: '',
        showPassword: false,
        error: false,
        errorText: ''
    });
    //input handlers that modify input hooks through keys & events
    const handleInputChange = (key) => (e) => {
        key === 'email' ? setCustomerEmail({ ...customerEmail, [key]: e.target.value }) : setCustomerPassword({ ...customerPassword, [key]: e.target.value })
    };
    const handleEmailError = (bool, str) => {
        setCustomerEmail({ ...customerEmail, error: bool, errorText: str })
    };
    const handlePasswordError = (bool, str) => {
        setCustomerPassword({ ...customerPassword, error: bool, errorText: str })
    };
    const handlePasswordVisibility = () => {
        setCustomerPassword({ ...customerPassword, showPassword: !customerPassword.showPassword })
    };
    const handleWrongInputs = (err) => {
        handleEmailError(true, 'Wrong email or password.');
        handlePasswordError(true, 'Wrong email or password.')
    };
    //login function that fires off authentication post and dispatch reducer 
    const handleLogin = () => {
        let email = customerEmail.email;
        let password = customerPassword.password;
        checkValidEmail(email, handleEmailError);
        checkValidPassword(password, handlePasswordError);
        let emailError = customerEmail.error;
        let passwordError = customerPassword.error;
        if (!emailError && !passwordError) {
            axios.post('auth/login', {
                email, password
            }).then(res => {
                const user = res.data.payload;
                dispatch({ type: 'SET_USER', payload: user });
                window.localStorage.setItem('customer', JSON.stringify(user));
                setAlert(!alert)
                setTimeout(() => {
                    history.push('/checkout')
                }, 1500);
            })
                .catch(err => handleWrongInputs(err))
        }
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Typography component="h1" variant="h5" className={classes.header}>
                    SIGN IN
        </Typography>
                <form className={classes.form} noValidate onSubmit={e => {
                    e.preventDefault();
                    handleLogin();
                }}>
                    <TextField
                        className={classes.textField}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={customerEmail.email}
                        error={customerEmail.error}
                        helperText={customerEmail.errorText}
                        onChange={handleInputChange('email')}
                    />
                    <TextField
                        className={classes.textField}
                        variant='outlined'
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type={customerPassword.showPassword ? 'text' : 'password'}
                        id="outlined-password"
                        autoComplete="current-password"
                        value={customerPassword.password}
                        error={customerPassword.error}
                        helperText={customerPassword.errorText}
                        onChange={handleInputChange('password')}
                        InputProps={{
                            endAdornment:
                                <InputAdornment position='end'>
                                    <IconButton
                                        onClick={handlePasswordVisibility}
                                        className={classes.iconStyle}>
                                        {customerPassword.showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                        }}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="default"
                        className={classes.submit}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link to='/signup' href='/signup' variant="body3" className={classes.signupLink}>
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
                <Snackbar open={alert} autoHideDuration={6000} >
                    <MuiAlert severity="success">
                        User Successfully Signed In!
                    </MuiAlert>
                </Snackbar>
            </div>
        </Container>
    )
}

export default Login;
