import React from "react";
import "./App.css";
import { Switch, Route, withRouter, Redirect } from 'react-router-dom'
import Landing from "./Components/Landing";
import Navbar from './Components/NavBar';
import Checkout from './Components/Checkout';

import ItemPopUp from './Components/ItemPopUp'
import CheckoutCart from './Components/CheckoutCart'
import ItemDetailsContextProvider from './Contexts/ItemDetailsContexts'

function App() {
  return (
    <div className="App">
      <ItemDetailsContextProvider>
        <Navbar />
      <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/checkout" component={Checkout} />
          <Route exact path="/popup" component={ItemPopUp} />
      </Switch>
      </ItemDetailsContextProvider>
      </div>
      );
    }
    
export default App;
