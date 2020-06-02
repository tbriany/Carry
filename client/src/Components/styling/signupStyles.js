import { makeStyles } from '@material-ui/core/styles';
import customTheme from './customTheme';

export const signupStyles = makeStyles((theme) => ({
    header: {
        color: customTheme.palette.secondary.dark
    },
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
        marginTop: theme.spacing(3),
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
    signinLink: {
        color: customTheme.palette.secondary.dark
    },
    iconStyle: {
        color: customTheme.palette.secondary.light,
        '&:hover': {
            color: customTheme.palette.secondary.main
        }
    }
}));