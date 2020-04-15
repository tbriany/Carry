import React from 'react';
import { Switch, Route, withRouter, Redirect, Link } from 'react-router-dom'
import ItemPopUp from './Components/ItemPopUp'
import CheckoutCart from './Components/CheckoutCart'
import ItemDetailsContextProvider from './Contexts/ItemDetailsContexts'
import './App.css';
import Navbar from './Components/NavBar';
import Checkout from './Components/Checkout';


function App() {
  return (
    <div className="App">
         <Navbar/>
      {/* <p>App.js</p> */}
      <ItemDetailsContextProvider>
        {/* <ItemPopUp /> */}
        {/* <Link to='/checkout'>
        <CheckoutCart />
        </Link> */}
     <Route exact path="/checkout" component={Checkout}/>
     <Route exact path="/popup" component={ItemPopUp}/>
      </ItemDetailsContextProvider>
      <Switch>
      {/* <Route exact path="/" component={Home}/> */}
     </Switch>
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

