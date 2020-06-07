import { makeStyles } from '@material-ui/core/styles';
import customTheme from './customTheme';


export const popoverTheme = makeStyles((theme) => ({
    popover: {
        pointerEvents: 'none',
    },
    paper: {
        padding: theme.spacing(1),
    },
}));

export const navbarStyles = makeStyles((theme) => ({
    grow: {
      flexGrow: 1,
    },
    logo: {
      height: '50px'
    },
    appBar: {
      backgroundColor: customTheme.palette.primary.main,
      '.MuiAppBar-colorPrimary': {
        color: customTheme.palette.secondary.dark
      },
      '.MuiSvgIcon-root': {
        color: customTheme.palette.secondary.dark
      },
    },
    customerMenu: {
      color: customTheme.palette.secondary.dark,
      'a:link': {
        textDecoration: 'none'
      }
    },
    iconStyling: {
      color: customTheme.palette.secondary.dark
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      display: 'none',
      textDecoration: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
      },
    },
    sectionMobile: {
      display: 'flex',
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
  }));