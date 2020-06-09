import React, { useEffect, useState } from "react";
import {Link} from 'react-router-dom'
import axios from 'axios'
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import StarBorderIcon from "@material-ui/icons/StarBorder";
 import PplCard from './StoreCard'

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
    maxWidth: '500px',
    maxHeight: '800px'
  },
  gridList: {
    width:500,
    height:850,
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

export default function SingleLineGridList() {
const classes = useStyles();


  const [storess, setStores] = useState([]);


  const fetchTypes = async () => {
    try {
      const stores = await axios.get(`/stores`)
      setStores(stores.data.payload)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      await fetchTypes()
    }
    fetchData()
  }, [])




  

  return (
    <div className="App">
    <div>
      <div>
        {" "}
        <h2
          style={{
            fontFamily: "Palatino Linotype",
            textAlign: "left",
            // fontSize: "20px",
          }}
        >
          {" "}
          Stores On Carry{" "}
        </h2>
      </div>
      <div className={classes.root}>
        <GridList className={classes.gridList} 
        cellHeight= {300} 
        cellWidth ={700}
        spacing= {25} 
        cols={1}>
          {storess.map((store) => (
            <GridListTile key={store.store_id}>
         <Link to={`/store/${store.store_id}`} >
           <PplCard
          storeid = {store.store_id}
          email = {store.store_email}
          store_name ={store.store_name}
          avatar = {store.store_logo}
          address = {store.address}
          city = {store.city}
          phone = {store.phone}
          />
        </Link>
            </GridListTile>
          ))}
        </GridList>
      </div>
    </div>
   
  </div>
);
}
  










