import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import CategorySearch from "./StoreSearch";
import { LandingContext } from "../../Contexts/LandingPageDetailsContext";
import ExploreStores from "./exploreStores";
//import Location from './LocationExplore'
import DiscreteSlider from "./DistanceInput";
import { explorePageStyles} from '../styling/explorePageStyles';
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import PplCard from "./StoreCard";
import SelectedCard from "./SelectedSearch";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import { makeStyles } from "@material-ui/core/styles";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";

const filters = {};

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
    maxWidth: "500px",
    maxHeight: "800px",
  },
  gridList: {
    width: 730,
    height: 850,
    //flexWrap: "nowrap",
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)",
  },
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background: "white",
    //   'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
}));



const ExplorePage = () => {
  const classes = useStyles();
  const [stores, setStores] = useState([]);
  const [value, setNewValue] = useState(null);
  //console.log("location status on explore page", locationStatus);

  // get all stores 
  const fetchStores = async () => {
    try {
      const stores = await axios.get(`/stores`);
      setStores(stores.data.payload);
      // console.log("All stores on Explore Page", stores.data.payload);
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


   const Store = {
    options: stores,
    getOptionLabel: (option) => option.stores_name,
  };

  return (
    <div className="ExplorePage">
      <div className="Header" style={{ display: "block", float: "left" }}>
      <div style={{ width: 250, paddingLeft: "15px" }}>
      <div style={{margin:'25px', float: "left" }}>
        <Autocomplete
          {...Store}
          id="store"
          debug
          style={{ width: 500 }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search for stores here"
              margin="normal"
              fullWidth
            />
          )}
        //   onChange={(event, newValue) => {
        //     // console.log('value inside onchange',newValue);
        //     newValue == null ? 
        //       setNewValue(null)
        //     :
        //       filters["stores"] = newValue
        //       setNewValue(newValue.store_id)
        //   }}
        // />
        onChange={(event, newValue) => {
          // console.log('value inside onchange',newValue);
          if (newValue == null) {
            setNewValue(null)
          } else {
            filters["stores"] = newValue
            setNewValue(newValue.store_id)}
        }}
      />
      </div>
    </div>
        
        {/* <div className="SearchBar">
          <CategorySearch applyFilters={applyFilters}
          stores ={stores} />
        </div> */}
        <br></br>
        {/* <div className="SearchLocation" style={{ margin: "20px" }}>
          <h1
            style={{
              fontFamily: "Palatino Linotype",
              paddingLeft: "20px",
             color: '#CD853F'
            }}
          >
            {" "}
            Browse Stores in New York City
          </h1>
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
        </div> */}
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
           <div className ='Content' style= {{margin:'35px'}}>
        <div className='Header'>
          {" "}
          <h1
            style={{
              fontFamily: "Palatino Linotype",
              textAlign: "left",
              // fontSize: "20px",
              padding: '20px'
            }}
          >
            {" "}
            Stores On Carry 
          </h1>
        </div>
        <div className ="Stores"> 
        {value ? (
          <SelectedCard value={value} />
        ) : (
          <div className={classes.root}>
            <GridList
              className={classes.gridList}
              cellHeight={300}
              cellWidth={800}
              spacing={25}
              cols={1}
            >
              {stores.map((store) => (
                <GridListTile key={store.store_id}>
                  <Link to={`/store/${store.store_id}`}>
                    <div style ={{width:'500px'}}>
                    <PplCard
                      storeid={store.store_id}
                      email={store.store_email}
                      store_name={store.stores_name}
                      avatar={store.store_logo}
                      address={store.address}
                      city={store.city}
                      phone={store.phone}
                    />
                    </div>
                  </Link>
                </GridListTile>
              ))}
            </GridList>
          </div>
        )}
        </div>
      </div>
        </div>
      </div>
    </div>
  );
};

export default ExplorePage;
