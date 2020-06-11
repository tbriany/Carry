import { makeStyles } from '@material-ui/core';
import customTheme from './customTheme';


export const checkoutStyles = makeStyles((theme) => ({
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
        height: '100vh',
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
    step: {
        '.MuiSvgIcon-root': {
            color: customTheme.palette.secondary.main
        }
    },
    label: {
            '.MuiStepLabel-iconContainer.MuiSvgIcon-root.MuiStepIcon-root.MuiStepIcon-active': {
                color: customTheme.palette.secondary.main
        }
    },
    buttonContainer: {
        justifyContent: 'baseline'
    },
    buttons: {
        display: 'flex',
        marginBottom: theme.spacing(1),
        justifyContent: 'flex-end',
    },
    button: {
        marginBottom: theme.spacing(2),
        marginRight: theme.spacing(2)
    },
    '.MuiStepLabel-label': {
        '.MuiStepLabel-active': {
            color: customTheme.palette.secondary.main
        }
    }
}));