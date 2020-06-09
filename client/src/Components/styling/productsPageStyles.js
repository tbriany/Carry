import customTheme from "./customTheme";
import { makeStyles } from "@material-ui/core/styles";

export const productPageStyles = makeStyles((theme) => ({
  ProductsPage: {
    textAlign: "center",
  },
  CategoryNav: {
    display: "flex",
    justifyContent: "space-evenly",
    marginLeft: "20px",
    marginRight: "30px",
    marginBottom: "35px",
    fontFamily: "Palatino Linotype",
  },
  NavLinks:{
    textDecoration: 'none',
    color: '#CD853F',
     active: '#FAEBD7' 
  },
  Filter_sideBar:{
    margin: '25px', 
    float: 'left', 
    padding: '20px' 
  },
  ProductsDisplay: {
    float: "right", 
    width: "70%",
    paddingTop: "20px"
  }
}));
