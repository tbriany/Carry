import customTheme from './customTheme';
import { makeStyles } from '@material-ui/core/styles';

export const explorePageStyles = makeStyles((theme) => ({
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
}));
