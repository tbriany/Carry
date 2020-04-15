import React from 'react';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom'
import './App.css';

import Navbar from './Components/NavBar';

function App() {
  return (
    <div className="App">
     <Navbar/>
    </div>
  );
}

export default App;
