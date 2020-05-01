import React, { useState, useEffect}from 'react';
import axios from "axios";


function Banner({storeId}) {
  const [store, setStore] = useState([]);

  useEffect(() => {
    axios
      .get(`/stores/${storeId}`)
      .then((result) => {
        setStore(result.data.payload);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="BannerDiv" style={{textAlign: "center"}}>
    <div className="Banner" id="banner" style={{position: "relative", height: "40vh", width: "100vw", paddingBottom: "20px"}}>
    <img alt="clothes" src="https://boutiquestoredesign.com/wp-content/uploads/2018/09/fashion-retail-womens-clothing-stores-design-ideas-layout-6.jpg" style={{height: "100%", width: "100%"}}></img>
     <div className="StoreInfo" id="storeInfo" style={{position: "absolute", top: "30%", width: "30%", backgroundColor: "white"}}>
      <p>{store.store_name}</p>
      <p>{store.phone_number}</p>
      <p>{store.address}, {store.city}, {store.state}, {store.zip_code}</p>
      <p>Estimated Delivery time || Delivery fee</p>
      </div>
    </div>
  </div>
  );
}



export default Banner;