import { makeStyles } from '@material-ui/core';
import customTheme from '../styling/customTheme';

export const accountStyles = makeStyles((theme) => ({
    container: {
        margin: theme.spacing(3),
    },
    text: {
        color: customTheme.palette.secondary.dark,
        fontFamily: "Palatino Linotype" 
    }
}))