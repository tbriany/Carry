import React, { useState, useContext } from 'react';
import { Container, makeStyles, Paper, Stepper, Step, StepLabel, Typography, CssBaseline, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import AddressForm from './CheckoutForms/AddressForm';
import PaymentForm from './CheckoutForms/PaymentForm';
import Review from './CheckoutForms/Review';
import PlaceOrder from './CheckoutForms/PlaceOrder';
import customTheme from './styling/customTheme';
import CustomerContext from '../Contexts/CustomerContext';


const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    layout: {
        width: '80%',
        margin: 'auto',
    },
    paper: {
        marginTop: theme.spacing(4),
        marginLeft: theme.spacing(5),
        marginRight: theme.spacing(5),
        padding: theme.spacing(3),
        boxShadow: " 2px 2px 2px white",
        height: '75vh'
    },
    header: {
        textDecoration: 'none',
        color: 'black'
    },
    stepper: {
        padding: theme.spacing(3, 0, 5),
        width: '90%',
        margin: 'auto',
    },
    'MuiStep': {
    '.MuiStep-completed': {
        backgroundColor: customTheme.palette.secondary.dark,
      },
    },
    buttonContainer: {
        justifyContent: 'baseline'
    },
    buttons: {
        display: 'flex',
        marginBottom: theme.spacing(1),
        // marginRight: theme.spacing(2),
        justifyContent: 'flex-end',
    },
    button: {
        marginBottom: theme.spacing(2),
        marginRight: theme.spacing(2)
    },
}));
const steps = ['Delivery address', 'Payment method', 'Delivery Terms'];
const getStepComponent = (step) => {
    switch (step) {
        case 0:
            return <AddressForm />
        case 1:
            return <PaymentForm />
        case 2:
            return <Review />
        default:
            return <PlaceOrder />
    }
};
//getStepComponent takes in a step from the activeStep state and based on it's value, displays a certain component
const Checkout = () => {
    // const { logUserOut, setCustomerContext, isLoggedIn, customerId, customerFirstname, customerLastname, customerPhoneNumber, customerEmail, customerAddress, customerCity, customerState, customerZip, customerAvatar } = useContext(CustomerContext);
    // contextObj = {
    //     logUserOut, setCustomerContext, isLoggedIn, customerId, customerFirstname, customerLastname, customerPhoneNumber, customerEmail, customerAddress, customerCity, customerState, customerZip, customerAvatar
    // };
    const classes = useStyles();
    const [activeStep, setActiveStep] = useState(0);
    const handleNextStep = () => {
        setActiveStep(activeStep + 1)
    };
    const handlePrevStep = () => {
        setActiveStep(activeStep - 1)
    };
    return (
        <Container>
            <CssBaseline />
            <main className={classes.layout} style={{ padding: "0px", margin: " 0px", width: "100%" }}>
                <Paper className={classes.paper} style={{ padding: "0px", margin: " 0px" }} >
                    <Stepper activeStep={activeStep} className={classes.stepper} color={customTheme.palette.secondary.main}>
                        <Step key={steps[0]}>
                            <StepLabel>{steps[0]}</StepLabel>
                        </Step>
                        <Step key={steps[1]}>
                            <StepLabel>{steps[1]}</StepLabel>
                        </Step>
                        <Step key={steps[2]}>
                            <StepLabel color={customTheme.palette.secondary.main}>{steps[2]}</StepLabel>
                        </Step>
                    </Stepper>
                    {/* creates Stepper Component that holds Step & StepLabel components, each with their value being a certain index from the steps global array */}
                    <Container className="formContainer">
                        {getStepComponent(activeStep)}
                    </Container>
                    <div className={classes.buttons}>
                        {activeStep !== 0 && (
                            <Button onClick={handlePrevStep} className={classes.button}>
                                Back
                                 </Button>
                        )}
                        <Button onClick={handleNextStep} className={classes.button} variant='contained' color='grey'>
                            {activeStep === steps.length - 1 ? 'Place Order' : 'Next'}
                        </Button>
                    </div>
                </Paper>
            </main>
        </Container>
    )
}

export default Checkout;