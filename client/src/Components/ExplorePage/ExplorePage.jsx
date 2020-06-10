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

  const applyFilters = async (filter) => {

    if (!Object.keys(filter).length) {
      fetchStores()

    } else {
      let url = `/stores/${filter.store_id}`
      console.log('explore page filter', filter.store_id)
      if (Object.keys(filter).length) {
        let firstElem = Object.keys(filter)[0]
        for (let el in filter) {
          if (el === firstElem) {
            url += `?${el}=${filter[el]}`
          } else {
            url += `&${el}=${filter[el]}`
          }
        }
      }

      try {
        const res = await axios.get(url)
        setStores(res.data.payload);
        console.log('press filter', stores)
      } catch (error) {
        setStores([])
        console.log(error);
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
          applyFilters={applyFilters}/>
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
