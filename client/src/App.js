import React from "react";
import "./App.css";
import { Switch, Route, withRouter, Redirect } from 'react-router-dom'
import Landing from "./Components/Landing";
import Navbar from './Components/NavBar';
import Checkout from './Components/Checkout';
import ItemPopUp from './Components/ItemPopUp'
import CheckoutCart from './Components/CheckoutCart'
import ItemDetailsContextProvider from './Contexts/ItemDetailsContexts'
import Login from './Components/Login';

function App() {
  return (
    <div className="App">
      <ItemDetailsContextProvider>
        <Navbar />
      </ItemDetailsContextProvider>
      <Switch>
        <ItemDetailsContextProvider>
          <Route exact path="/" component={Landing} />
          <Route exact path="/checkout" component={Checkout} />
          <Route exact path="/popup" component={ItemPopUp} />
          <Route exact path="/login" component={Login}/>
        </ItemDetailsContextProvider>
      </Switch>
      </div>
      );
    }
    
export default App;