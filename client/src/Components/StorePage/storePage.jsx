import React from 'react';

import MultipleSelect from './filterForm';
import SingleLineGridList from './gridList';

function StorePage() {
  return (
    <div className="StorePage">
      <div className="Banner" id="banner" style={{position: "relative", height: "40vh", width: "100vw"}}>
      <img alt="clothes" src="https://boutiquestoredesign.com/wp-content/uploads/2018/09/fashion-retail-womens-clothing-stores-design-ideas-layout-6.jpg" style={{height: "100%", width: "100%"}}></img>
       <div className="StoreInfo" id="storeInfo" style={{position: "absolute", top: "30%", width: "30%", backgroundColor: "white"}}>
        <p>Store Name</p>
        <p>Description</p>
        <p>Estimated Delivery time || Delivery fee</p>
        <p>Address</p>
        </div>
      </div>
      <br></br>
      <div>
      <SingleLineGridList
        listTitle="Shop By Category"
      />
      </div>
      <div>
      <SingleLineGridList
        listTitle="Shop By Type"
      />
      </div>
      <div>
      <SingleLineGridList
        listTitle="New Arrivals"
      />
      </div>
    </div>
  );
}


export default StorePage;
