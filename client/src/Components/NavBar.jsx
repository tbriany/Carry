import React from 'react';
import '../App.css';
import { Link, Route } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import ExploreIcon from '@material-ui/icons/Explore';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import MoreIcon from '@material-ui/icons/MoreVert';
import Popover from '@material-ui/core/Popover';
import customTheme from './styling/customTheme';
import CartPopUp from './CartPopUp';


const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
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
  popover: {
    pointerEvents: 'none',
  },
  paper: {
    padding: theme.spacing(1),
  },
}));


function Navbar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [popOver, setPopOver] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handlePopoverOpen = (event) => {
    setPopOver(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setPopOver(null);
  };

  const open = Boolean(popOver);

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      className={classes.iconStyling}
    >
      <MenuItem onClick={handleMenuClose} className={classes.customerMenu}><Link to='/signup' style={{ textDecoration: 'none', color: customTheme.palette.secondary.dark }}>Sign Up</Link></MenuItem>
      <MenuItem onClick={handleMenuClose} className={classes.customerMenu}><Link to='/login' style={{ textDecoration: 'none', color: customTheme.palette.secondary.dark }}>Log In</Link></MenuItem>
      <MenuItem onClick={handleMenuClose} className={classes.customerMenu}>My account</MenuItem>
      <MenuItem onClick={handleMenuClose} className={classes.customerMenu}>My orders</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton className={classes.iconStyling}>
          <ExploreIcon />
        </IconButton>
        <p>Explore</p>
      </MenuItem>

      <MenuItem>
        <IconButton className={classes.iconStyling} >
          {/* <Badge badgeContent={11} color="secondary"> */}
          <ShoppingCartIcon />
          {/* </Badge> */}
        </IconButton>

        <p>Shopping Cart</p>
      </MenuItem>


      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          className={classes.iconStyling}
        >
          <AccountCircle />
        </IconButton>
        <p>Account</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow} >
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Link to='/'
            style={{ textDecoration: 'none', color: customTheme.palette.secondary.dark }}>
            <Typography
              className={classes.title}
              variant="h6" noWrap >
              CARRY
        </Typography>
          </Link>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton
              color={customTheme.palette.secondary.main}>
              <ExploreIcon />
            </IconButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color={customTheme.palette.secondary.main}
            >
              <AccountCircle />
            </IconButton>
            <Typography
              aria-owns={open ? "mouse-over-popover" : undefined}
              aria-haspopup="true"
              onMouseEnter={handlePopoverOpen}
              onMouseLeave={handlePopoverClose}
            >
              <Link to="/checkout">
                <IconButton color={customTheme.palette.secondary.main}>
                  <ShoppingCartIcon />
                </IconButton>
              </Link>

            </Typography>
            <Popover
              id="mouse-over-popover"
              className={classes.popover}
              classes={{
                paper: classes.paper
              }}
              open={open}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
                marginTop: "5px"
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              onClose={handlePopoverClose}
              disableRestoreFocus

            >
              <CartPopUp />
            </Popover>

          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}

export default Navbar;
