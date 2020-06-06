import React from "react";
import "./App.css";
import { Switch, Route, withRouter, Redirect } from 'react-router-dom'
import Landing from "./Components/Landing";
import Navbar from './Components/NavBar';
import ItemPopUp from './Components/ItemPopUp'
import CategoryPage from './Components/CategoryPage/CategoryPage'
import { Store } from './Contexts/CustomerContext';
import CheckoutCartContextProvider from './Contexts/CheckoutCartContext';
import LandingContextProvider from './Contexts/LandingPageDetailsContext'
import Login from './Components/Login';
import Signup from './Components/Signup';
import StorePage from './Components/StorePage/storePage';
import ProductsPage from './Components/ProductPage/productsPage';
import Checkout from './Components/Checkout';
import CheckoutLanding from './Components/CheckoutLanding.jsx'
import ProtectedRoute from './Components/util/ProtectedRoute';
import Account from './Components/Account';
import ExplorePage from './Components/ExplorePage/ExplorePage'

function App() {
  return (
    <div className="App">
      <LandingContextProvider>
      <Store>
      <CheckoutCartContextProvider>
        <Navbar />
      <Switch>
          <Route exact path="/" component={Landing} />
          <ProtectedRoute path='/checkout' component={CheckoutLanding} />
          <Route exact path="/checkout" component={CheckoutLanding} />
          <ProtectedRoute exact path="/account" component={Account}/>
          <Route exact path="/popup/:product_id" component={ItemPopUp} />
          <Route exact path="/login" component={Login}/>
          <Route exact path="/signup" component={Signup}/>
          <Route exact path="/categories/:type" component={CategoryPage}/>
          <Route exact path="/store/:id" component={StorePage} />
          <Route path="/store/:id/:category_name" component={ProductsPage} />
          <Route Path ='/explore' component={ExplorePage}/>
      </Switch>
     </CheckoutCartContextProvider>
     </Store>
    </LandingContextProvider>
    </div>
      );
    }
    
export default App;

//merge both checkout components 