import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import CategorySearch from "./StoreSearch";
import { LandingContext } from "../../Contexts/LandingPageDetailsContext";
import ExploreStores from "./exploreStores";
//import Location from './LocationExplore'
import DiscreteSlider from "./DistanceInput";

const ExplorePage = () => {
  const { Latitude, Longitude, locationStatus } = useContext(LandingContext);
  const [stores, setStores] = useState([]);
  const [value, setNewValue] = useState(null);
  const [oneStore, setOneStore] = useState([]);
  console.log("location status on explore page", locationStatus);

  const fetchStores = async () => {
    try {
      const stores = await axios.get(`/stores`);
      setStores(stores.data.payload);
      console.log("All stores on Explore Page", stores);
    } catch (err) {
      console.log(err);
    }
  };

  const applyFilters = async (filter, value) => {
    // let url = `/stores/${filter.store_id}`
    // console.log('explore page filter', filter.store_id)
    try {
      const res = await axios.get(`/stores/${filter.store_id}`);
      console.log("response of filter", res);
      setStores(res.data.payload);
      setNewValue(filter.store_id);
      console.log(value);
    } catch (error) {
      setStores([]);
      console.log(error);
    }

    return value;
  };
  // }
  console.log("press filter", value);

  // attempting to get value from the selected drop down menu.
  // const applyValue = async (value)=>{
  //   if (value != null){
  //     try {
  //       const response = await axios.get(`/stores/${value}`);
  //       setOneStore(response.data.payload);
  //       console.log('getting one store', oneStore);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }
  //   return oneStore
  // }

  console.log(oneStore, "one store on explore page");

  useEffect(() => {
    const fetchData = async () => {
      await fetchStores();
      //await applyValue()
    };
    fetchData();
  }, []);

  return (
    <div className="Explore Page">
      <div className="Header" style={{ display: "block", float: "left" }}>
        <div className="SearchBar">
          <CategorySearch applyFilters={applyFilters} />
        </div>
        <br></br>
        <div className="SearchLocation" style={{ margin: "20px" }}>
          <h2
            style={{
              fontFamily: "Palatino Linotype",
              paddingLeft: "20px",
             color: '#CD853F'
            }}
          >
            {" "}
            Browse Stores in New York City
          </h2>
          <div className="boroughLinks" style={{ paddingLeft: "20px" }}>
            <Link
              to={"/explore/New%20York"}
              style={{
                textDecoration: "none",
                color: "#CD853F",
                active: "#FAEBD7",
                fontFamily: "Palatino Linotype",
                fontSize: '20px'
              }}
            >
              {" "}
              <p> Manhattan</p>
            </Link>
            <Link
              to={"/explore/Brooklyn"}
              style={{
                textDecoration: "none",
                color: "#CD853F",
                active: "#FAEBD7",
                fontFamily: "Palatino Linotype",
                fontSize: '20px'
              }}
            >
              {" "}
              <p> Brooklyn</p>
            </Link>
            <Link
              to={"/explore/Queens"}
              style={{
                textDecoration: "none",
                color: "#CD853F",
                active: "#FAEBD7",
                fontFamily: "Palatino Linotype",
                fontSize: '20px'
              }}
            >
              {" "}
              <p> Queens</p>
            </Link>
          </div>
        </div>
        <div className="Filter"
        style={{
          margin: "25px", 
          float: "left"
        }}>
          <DiscreteSlider/>
        </div>
      </div>

      <div className="Contents">
      
        <div
          className="Stores"
          style={{
            float: "right",
            maxWidth: "800px",
            marginRight: "50px",
            width: "70%",
          }}
        >
          <ExploreStores stores={stores} value={value} />
        </div>
      </div>
    </div>
  );
};

export default ExplorePage;
