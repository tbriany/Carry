import React, { useState, useEffect }from 'react';
import axios from "axios";


function Banner({storeId}) {
  const [store, setStore] = useState([]);

  useEffect(() => {
    async function fetchData() {
        try {
            const res = await axios.get(`/stores/${storeId}`)
            setStore(res.data.payload);
        } catch (error) {
            setStore([])
            console.log(error);
        }
    }
  fetchData()
}, [setStore, storeId])

  return (
    <div className="BannerDiv" style={{textAlign: "center"}}>
    <div className="Banner" id="banner" style={{position: "relative", height: "50vh", width: "100vw", paddingBottom: "20px"}}>
    <img alt="clothes" src={store.store_logo} style={{height: "100%", width: "100vw"}}></img>
     <div className="StoreInfo" id="storeInfo" style={{position: "absolute", top: "30%", width: "30%", backgroundColor: "white"}}>
      <p>{store.store_name}</p>
      <p>{store.phone_number}</p>
      <p>{store.address}, {store.city}, {store.state}, {store.zip_code}</p>
      {/* <p>Estimated Delivery time || Delivery fee</p> */}
      </div>
    </div>
  </div>
  );
}



export default Banner;
