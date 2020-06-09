import { makeStyles } from '@material-ui/core';
import customTheme from '../styling/customTheme';

export const accountStyles = makeStyles((theme) => ({
    container: {
        margin: theme.spacing(5),
        textAlign: 'center'
    },
    text: {
        color: customTheme.palette.secondary.dark,
        fontFamily: "Palatino Linotype" 
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
}))