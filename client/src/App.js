import React from 'react';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom'
import './App.css';
import Navbar from './Components/NavBar';
import Checkout from './Components/Checkout';

function App() {
  return (
    <div className="App">
     <Navbar/>
     <Route path="/checkout" component={Checkout}/>
    </div>
  );
}

export default App;
