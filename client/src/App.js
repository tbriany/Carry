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
      <Navbar/>
      <Landing/>
      {/* <p>App.js</p> */}
      <ItemDetailsContextProvider>
        <ItemPopUp />
        <CheckoutCart />
      </ItemDetailsContextProvider>
     <Route path="/checkout" component={Checkout}/>
    </div>
  );
}

export default App;



// import React from 'react';
// import { Switch, Route, withRouter, Redirect } from 'react-router-dom'
// import ItemPopUp from './Components/ItemPopUp'
// import CheckoutCart from './Components/CheckoutCart'
// import {ItemDetailsContext} from './Contexts/ItemDetailsContexts'
// import './App.css';




// function App() {
//   return (
//     <div className="App">
//       {/* <p>App.js</p> */}

//       <ItemDetailsContext.Provider>
//         <p>ITEM POP UP</p>
//         <ItemPopUp />


//         <p>CHECKOUT  </p>
//         <CheckoutCart />
//       </ItemDetailsContext.Provider>


//     </div>
//   );
// }

// export default App;

