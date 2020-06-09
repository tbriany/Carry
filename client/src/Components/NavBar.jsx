import React, { useContext, useState } from 'react';
import '../App.css';
import { Link, Route, useHistory } from 'react-router-dom';
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
import CartPopover from './Popover/CartPopover';
import { Context, Store } from '../Contexts/CustomerContext';
import ProductsPage from './ProductPage/productsPage';
import { navbarStyles, popoverTheme } from './styling/navbarStyles';
import { useRadioGroup } from '@material-ui/core';
import axios from 'axios';

function Navbar() {
  const classes = navbarStyles();
  const popoverClasses = popoverTheme();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [popOver, setPopOver] = React.useState(null);
  const [state, dispatch] = useContext(Context);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const history = useHistory();
  const logo = require('./carry.png')

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
  const logUserOut = async () => {
    await axios.get('/auth/logout')
    dispatch({ type: 'REMOVE_USER', payload: {} })
    window.localStorage.setItem('customer', JSON.stringify({}))
    setTimeout(() => {
      history.push('/')
    }, 10)
  }
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
      style={{ zIndex: 9001 }}
    >
      {state.user.isAnon ?
        <div>
          <MenuItem onClick={handleMenuClose} className={classes.customerMenu}>
            <Link to='/login' style={{ textDecoration: 'none', color: customTheme.palette.secondary.dark }}>
              Login
            </Link>
          </MenuItem>
          <MenuItem onClick={handleMenuClose} className={classes.customerMenu}>
            <Link to='/signup' style={{ textDecoration: 'none', color: customTheme.palette.secondary.dark }}>
              Sign Up
            </Link>
          </MenuItem>
        </div>
        :
        <div>
          <MenuItem onClick={handleMenuClose} className={classes.customerMenu}>
            <Link to='/orders' style={{ textDecoration: 'none', color: customTheme.palette.secondary.dark }}>
              My Orders
          </Link>
          </MenuItem>
          <MenuItem onClick={handleMenuClose} className={classes.customerMenu}>
            <Link to='/account' style={{ textDecoration: 'none', color: customTheme.palette.secondary.dark }}>
              My Account
          </Link>
          </MenuItem>
          <MenuItem onClick={handleMenuClose} className={classes.customerMenu}>
            <Typography style={{ textDecoration: 'none', color: customTheme.palette.secondary.dark }} onClick={logUserOut}>
              Logout
           </Typography>
          </MenuItem>
        </div>
      }
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
  console.log('state', state)
  // debugger
  return (
    <div className={classes.grow}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 9000,
        width: '100%'
      }}
    >
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Link to='/'
            style={{ textDecoration: 'none', color: customTheme.palette.secondary.dark }}>
            <img src={logo} className={classes.logo} />
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
              className={popoverClasses.popover}
              classes={{
                paper: popoverClasses.paper
              }}
              open={open}
              anchorEl={popOver}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",

              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right"

              }}
              onClose={handlePopoverClose}
              disableRestoreFocus
              style={{
                zIndex: 9002,
              }}
            >
              <CartPopover />
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
