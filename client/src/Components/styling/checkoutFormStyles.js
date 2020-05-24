import { makeStyles } from '@material-ui/core';
import customTheme from './customTheme';

export const checkoutFormStyles = makeStyles((theme) => ({
    textField: {
        label: customTheme.palette.secondary.dark,
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
            },
        },
    }}));
