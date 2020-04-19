import React, { useState } from 'react';
import axios from 'axios';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { checkValidEmail, checkValidPassword } from "./inputHelpers";

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
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        backgroundColor: 'cream'
    },
}));
const Login = () => {
    const classes = useStyles();
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
    const handleInputChange = (key) => (e) => {
        key === 'email' ? setCustomerEmail({ ...customerEmail, [key]: e.target.value }) : setCustomerPassword({ ...customerPassword, [key]: e.target.value })
    };
    const handleEmailError = (bool, str) => {
        setCustomerEmail({ ...customerEmail, error: bool, errorText: str })
    };
    const handlePasswordError = (bool, str) => {
        setCustomerPassword({ ...customerPassword, error: bool, errorText: str })
    }
    const handleLogin = async (e) => {
        e.preventDefault();
        let email = customerEmail.email;
        let password = customerPassword.password;
        checkValidEmail(email, handleEmailError);
        checkValidPassword(password, handlePasswordError);
        let emailError = customerEmail.error;
        let passwordError = customerPassword.error;
        if (!emailError && !passwordError) {
            console.log('valid email and password')
            // try {
            //     let loggedInCustomer = axios.post('auth/login', [customerEmail, customerPassword])
            // }
            // catch(err){

            // }
        }
    };
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Sign in
        </Typography>
                <form className={classes.form} noValidate onSubmit={handleLogin}>
                    <TextField
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
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={customerPassword.password}
                        error={customerPassword.error}
                        helperText={customerPassword.errorText}
                        onChange={handleInputChange('password')}
                    />
                    {/* <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    /> */}
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
                            <Link href="#" variant="body3">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    )
}

export default Login;