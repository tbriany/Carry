import React, { useState, Fragment } from 'react';
import { makeStyles, AppBar, Toolbar, Paper, Stepper, Step, StepLabel, Typography, CssBaseline, Button } from '@material-ui/core';
import AddressForm from './checkout-forms/AddressForm';
import PaymentForm from './checkout-forms/PaymentForm';
import Review from './checkout-forms/Review';

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    layout: {
        width: '80%',
        margin: 'auto'
    },
    paper: {
        marginTop: theme.spacing(4),
        marginLeft: theme.spacing(5),
        marginRight: theme.spacing(5),
        padding: theme.spacing(3)
    },
    stepper: {
        padding: theme.spacing(3, 0, 5),
        width: '90%',
        margin: 'auto',
    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1)
    },
}));

const steps = ['Delivery address', 'Payment method', 'Review & Place Order'];
const getStepComponent = (step) => {
    switch (step) {
        case 0:
            return <AddressForm />
        case 1:
            return <PaymentForm />
        case 2:
            return <Review />
        default:
            throw new Error('Step does not exist.')
    }
};
//getStepComponent takes in a step from the activeStep state and based on it's value, displays a certain component
const Checkout = () => {
    const classes = useStyles();
    const [activeStep, setActiveStep] = useState(0);
    const handleNextStep = () => {
        setActiveStep(activeStep + 1)
    };
    const handlePrevStep = () => {
        setActiveStep(activeStep - 1)
    };
    return (
        <Fragment>
            <CssBaseline />
            <AppBar position='absolute' className={classes.appBar} color='primary'>
                <Toolbar>
                    <Typography variant='h6' color='inherit' noWrap>
                        Carry - Checkout
                </Typography>
                </Toolbar>
            </AppBar>
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Stepper activeStep={activeStep} className={classes.stepper}>
                        <Step key={steps[0]}>
                            <StepLabel>{steps[0]}</StepLabel>
                        </Step>
                        <Step key={steps[1]}>
                            <StepLabel>{steps[1]}</StepLabel>
                        </Step>
                        <Step key={steps[2]}>
                            <StepLabel>{steps[2]}</StepLabel>
                        </Step>
                    </Stepper>
                    {/* creates Stepper Component that holds Step & StepLabel components, each with their value being a certain index from the steps global array */}
                    <Fragment>
                        {getStepComponent(activeStep)}
                        <div className={classes.buttons}>
                            {activeStep !== 0 && (
                                <Button onClick={handlePrevStep} className={classes.button}>
                                    Back
                                 </Button>
                            )}
                            <Button onClick={handleNextStep} className={classes.button} variant='contained' color='primary'>
                                {activeStep === steps.length -1 ? 'Place Order' : 'Next'}
                            </Button>
                        </div>
                    </Fragment>
                </Paper>
            </main>
        </Fragment>
    )
}

export default Checkout;