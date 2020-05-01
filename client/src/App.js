import React from "react";
import "./App.css";
import { Switch, Route, withRouter, Redirect } from 'react-router-dom'
import Landing from "./Components/Landing";
import Navbar from './Components/NavBar';
import Checkout from './Components/Checkout';
import ItemPopUp from './Components/ItemPopUp'
import CategoryPage from './Components/LandingPageComponents/CategoryPage'
import CheckoutCart from './Components/CheckoutCart'
import ItemDetailsContextProvider from './Contexts/ItemDetailsContexts';
import CustomerContextProvider from './Contexts/CustomerContext';
import Login from './Components/Login';
import Signup from './Components/Signup';
import StorePage from './Components/StorePage/storePage';
import ProductsPage from './Components/ProductPage/productsPage';

function App() {
  return (
    <div className="App">
      <ItemDetailsContextProvider>
      <CustomerContextProvider>
        <Navbar />
      <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/checkout" component={Checkout} />
          <Route exact path="/popup" component={ItemPopUp} />
          <Route exact path="/login" component={Login}/>
          <Route exact path="/signup" component={Signup}/>
          <Route exact path="/categories/:type" component={CategoryPage}/>
          <Route exact path="/store/:id" component={StorePage} />
          <Route exact path="/store/:id/products" component={ProductsPage} />
      </Switch>
     </CustomerContextProvider>
     </ItemDetailsContextProvider>
    </div>
      );
    }
    
export default App;
