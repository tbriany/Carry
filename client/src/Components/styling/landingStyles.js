import customTheme from './customTheme';
import { makeStyles } from '@material-ui/core/styles';

export const landingStyles = makeStyles((theme) => ({
    header: {
        color: customTheme.palette.secondary.dark,
        fontFamily: "Palatino Linotype" 
    },
    landingPage: {
        marginTop: "30px" 
    },
    mainContent: {
        marginTop: "50px", 
        marginLeft: "45px", 
        marginRight: "45px" 
    },
    headerContainer: {
        textAlign: "center" 
    },
    landingPageRows: {
        margin: "30px"
    },
    popularItems: {
        marginTop: "50px"
    },
    textField: {
        label: customTheme.palette.secondary.dark,
        error: theme.palette.error.dark,
        '& label.Mui-focused': {
            color: customTheme.palette.secondary.dark,
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: customTheme.palette.secondary.main
            },
            '&:hover fieldset': {
                borderColor: customTheme.palette.secondary.light,
            },
            '&.Mui-focused fieldset': {
                borderColor: customTheme.palette.secondary.main
            }
        }
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        backgroundColor: customTheme.palette.secondary.main,
        '&:hover': {
            backgroundColor: customTheme.palette.primary.main
        }
    },
    signupLink: {
        color: customTheme.palette.secondary.dark
    },
    iconStyle: {
        color: customTheme.palette.secondary.light,
        '&:hover': {
            color: customTheme.palette.secondary.main
        }
    }
}));