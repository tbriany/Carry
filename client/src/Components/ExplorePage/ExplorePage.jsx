import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import CategorySearch from "./StoreSearch";
import { LandingContext } from "../../Contexts/LandingPageDetailsContext";
import ExploreStores from './exploreStores'
import DiscreteSlider from "./DistanceInput";

const ExplorePage = () => {
  const { Latitude, Longitude } = useContext(LandingContext);
  const [stores, setStores] = useState();

  const fetchStores = async () => {
    try {
      const stores = await axios.get(`/stores`);
      setStores(stores.data.payload);
      console.log("All stores on Explore Page", stores);
    } catch (err) {
      console.log(err);
    }
  };

  const applyAllFilters = async (filter) => {
    let url = `/products/filterbyCategory/${stores.store_id}`;
console.log(filter)
    if (Object.keys(filter).length) {
      let firstElem = Object.keys(filter)[0];
      for (let el in filter) {
        if (el === firstElem) {
          url += `?${el}=${filter[el]}`;
        } else {
          url += `&${el}=${filter[el]}`;
        }
      }
    }
  }


  useEffect(() => {
    const fetchData = async () => {
      await fetchStores();
    };
    fetchData();
  }, []);

  return (
    <div className="Explore Page">
      <div className="Header">
        <div className="SearchBar">
          <CategorySearch 
          applyAllFilters={applyAllFilters}/>
        </div>
      </div>
      <div className="Contents">
        <div className="Filter"
        style={{
          margin: "25px", 
          float: "left", 
          padding: "35px"
        }}>
          <DiscreteSlider/>
        </div>

        <div className="Stores" style ={{float:'right', maxWidth:'800px', marginRight:'50px',   width: "70%"}}>
           <ExploreStores
          stores = {stores}
          /> 
        </div>
      </div>
    </div>
  );
};

export default ExplorePage;
