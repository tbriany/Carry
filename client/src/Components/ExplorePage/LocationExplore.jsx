import React, {useState, useEffect} from "react";
import axios from 'axios'
import { Link } from "react-router-dom";

export default function LocationExplore(props) {
  const city = props.match.params.city;
  console.log("explore location ", city);

const [storeByCity, setStoreByCity] =useState([]);

const fetchStores = async () => {
    try {
      const stores = await axios.get(`/stores/city/${city}`);
      setStoreByCity(stores.data.payload);
      console.log('All stores by City', stores);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchStores();
    
    };
    fetchData();
  }, []);

console.log('stores by city', storeByCity)











  return (
    <div className="ParentDiv">
      <div clasName="sideBar" style={{ float: "left", display:'block' }}>
        <div className="Header" style ={{display:'block' }}>
        <div
            className="Navigation"
            style={{
              color: "#CD853F",
              fontFamily: "Palatino Linotype",
              marginTop: "20px",
              display: "flex",
              justifyContent: "space-evenly",
              marginLeft: "20px",
              marginRight: "30px",
              textAlign: 'center'
            }}
          >
            <Link
              to={`/`}
              style={{
                textDecoration: "none",
                color: "#CD853F",
                active: "#FAEBD7",
                fontFamily: "Palatino Linotype",
              }}
            >
              CARRY  /  
            </Link>
            <Link
              to={`/explore`}
              style={{
                textDecoration: "none",
                color: "#CD853F",
                active: "#FAEBD7",
                fontFamily: "Palatino Linotype",
              }}
            >
              NEW YORK CITY / 
            </Link>

          </div>
          <h1> Browse {city}</h1>

         
        </div>
      </div>

      <div className="Content"></div>
    </div>
  );
}
