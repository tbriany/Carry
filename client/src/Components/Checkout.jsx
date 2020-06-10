import React, { useState, useContext } from 'react';
import { Container, makeStyles, Paper, Stepper, Step, StepLabel, Typography, CssBaseline, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import AddressForm from './CheckoutForms/AddressForm';
import PaymentForm from './CheckoutForms/PaymentForm';
import Review from './CheckoutForms/Review';
import PlaceOrder from './CheckoutForms/PlaceOrder';
import customTheme from './styling/customTheme';
import CustomerContext from '../Contexts/CustomerContext';
import { checkoutStyles } from './styling/checkoutStyles';

const steps = ['Delivery address', 'Payment method', 'Delivery Terms'];
const getStepComponent = (step, props) => {
    switch (step) {
        case 0:
            return <AddressForm />
        case 1:
            return <PaymentForm />
        case 2:
            return <Review
                getShipping={props.getShipping}
                shippingOption={props.shippingOption}
            />
        default:
            return <PlaceOrder />
    }
};
//getStepComponent takes in a step from the activeStep state and based on it's value, displays a certain component
const Checkout = (props) => {
    const classes = checkoutStyles();
    const [activeStep, setActiveStep] = useState(0);
    const handleNextStep = () => {
        setActiveStep(activeStep + 1)
    };
    const handlePrevStep = () => {
        setActiveStep(activeStep - 1)
    };
    const handlePlaceOrder = () => {
        console.log('order placed')
    };
    return (
        <Container>
            <CssBaseline />
            <main className={classes.layout} style={{ padding: "0px", margin: " 0px", width: "100%" }}>
                <Paper className={classes.paper} style={{ padding: "0px", margin: " 0px" }} >
                    <Stepper activeStep={activeStep} className={classes.stepper} >
                        <Step key={steps[0]} className={classes.step} >
                            <StepLabel className={classes.label}>{steps[0]}</StepLabel>
                        </Step>
                        <Step key={steps[1]}>
                            <StepLabel>{steps[1]}</StepLabel>
                        </Step>
                        <Step key={steps[2]}
                        >
                            <StepLabel>{steps[2]}</StepLabel>
                        </Step>
                    </Stepper>
                    {/* creates Stepper Component that holds Step & StepLabel components, each with their value being a certain index from the steps global array */}
                    <form>
                        <Container className="formContainer">
                            {getStepComponent(activeStep, props)}
                        </Container>
                        <div className={classes.buttons}>
                            {activeStep !== 0 && (
                                <Button onClick={handlePrevStep} className={classes.button}>
                                    Back
                                 </Button>
                            )}
                            <Button 
                            onClick={activeStep === steps.length - 1 ? handlePlaceOrder : handleNextStep} className={classes.button} variant='contained' color='grey'>
                                {activeStep === steps.length - 1 ? 'Place Order' : 'Next'}
                            </Button>
                        </div>
                    </form>
                </Paper>
            </main>
        </Container>
    )
}

export default Checkout;