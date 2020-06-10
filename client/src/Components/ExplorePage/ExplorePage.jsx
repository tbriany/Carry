import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import CategorySearch from "./StoreSearch";
import { LandingContext } from "../../Contexts/LandingPageDetailsContext";
import ExploreStores from './exploreStores'
import DiscreteSlider from "./DistanceInput";

const ExplorePage = () => {
  const { Latitude, Longitude } = useContext(LandingContext);
  const [stores, setStores] = useState([]);
 const [value, setNewValue] = useState(null)
 const [oneStore, setOneStore] = useState([])
 
  const fetchStores = async () => {
    try {
      const stores = await axios.get(`/stores`);
      setStores(stores.data.payload);
      console.log("All stores on Explore Page", stores);
    } catch (err) {
      console.log(err);
    }
  };

  const applyFilters = async (filter,value) => {
      // let url = `/stores/${filter.store_id}`
      // console.log('explore page filter', filter.store_id)
      try {
        const res = await axios.get(`/stores/${filter.store_id}`)
        console.log('response of filter', res)
        setStores(res.data.payload);
         setNewValue(filter.store_id)
         console.log(value)
      
      } catch (error) {
        setStores([])
        console.log(error);
      }
      
      return value
    }
  // }
  console.log('press filter', value)

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

console.log(oneStore, 'one store on explore page')


  useEffect(() => {
    const fetchData = async () => {
      await fetchStores();
      //await applyValue()
    };
    fetchData();
  }, []);

  return (
    <div className="Explore Page">
      <div className="Header">
        <div className="SearchBar">
          <CategorySearch 
          applyFilters={applyFilters}
          />
        </div>
      </div>
      <div className="Contents">
        {/* <div className="Filter"
        style={{
          margin: "25px", 
          float: "left", 
          padding: "35px"
        }}>
          <DiscreteSlider/>
        </div> */}

        <div className="Stores" style ={{float:'right', maxWidth:'800px', marginRight:'50px',   width: "70%"}}>
           <ExploreStores
          stores = {stores}
           value ={value}
          /> 
        </div>
      </div>
    </div>
  );
};

export default ExplorePage;
