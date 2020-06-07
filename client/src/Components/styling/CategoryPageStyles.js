import customTheme from './customTheme';
import { makeStyles } from '@material-ui/core/styles';

export const CategoryStyles = makeStyles((theme) => ({
    CategoryNavigation: {
        color: customTheme.palette.secondary.dark,
        fontFamily: "Palatino Linotype", 
        marginTop: "20px",
        display: "flex",
        justifyContent: "space-evenly",
        marginLeft: "20px",
        marginRight: "30px"
    }, 
    navLinks: {
            textDecoration: "none",
            color: "#CD853F",
            active: "#FAEBD7",
    }, 
    headerContainer:{
            display: "flex",
            padding: "25px",
    },
    pageTitle:{
        fontFamily: "Palatino Linotype",
        textAlign: "center",
        color: customTheme.palette.secondary.dark,
        fontSize: "50px",
    },
    mainContentContainer:{
        marginTop: "20px"
    }, 
    filter_sideBar:{
        margin: "25px", 
        float: "left", 
        padding: "20px"
    }, 
    categoryProducts:{
        float: "right",
         width: "70%", 
         paddingTop: "20px"  
    }
}));
