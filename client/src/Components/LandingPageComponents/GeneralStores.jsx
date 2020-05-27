import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import customTheme from '../styling/customTheme';
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
    spacing: "4px",
  },
  gridList: {
    flexWrap: "nowrap",
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)",
    spacing: "10px",
  },
  title: {
    color: customTheme.palette.secondary.dark,
    display: "flex",
    flexWrap: "wrap",
  },
  titleBar: {
    background: "white",
    textAlign: "center",
    // 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  imgFullHeight: {
    height: "100%",
    transform: "translateX(-50%)",
    position: "relative",
    left: '50px',
    borderRadius: '50%'
  },
  imgFullWidth: {
    width: "100%",
    position: "relative",
    transform: "translateY(-50%)",
    top: "50%",
  },
}));

export default function SingleLineGridListItems() {
  const classes = useStyles();
  // get all the stores and store in array.
  const [stores, setStores] = useState([]);

  const [id, setId] = useState(0);

  //make network request to retrieve all stores
  useEffect(() => {
    async function getAllStores() {
      await axios
        .get("/stores/")
        .then((res) => {
          console.log(res);
          setStores(res.data.payload);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    getAllStores();
  }, []);

  return (

<div>
    <div> 
       <h2
              style={{
                fontFamily: "Palatino Linotype",
                textAlign: "left",
                // fontSize: "20px",
                color: customTheme.palette.secondary.dark,
              }}
            >
              {" "}
              Check Out What These Stores Carry{" "}
            </h2>
    </div>
    <div className={classes.root}>
         
      <GridList className={classes.gridList} 
          cellHeight= {290} 
          spacing= {25} 
          cols={3.5}>
        {stores.map((store) => (
          <GridListTile key={store.store_id}>
            <Link to={`/store/${store.store_id}`}>
            <img src={store.avatar_url} alt={store.store_name} style={{width: '90%' , height: '80%'}}/>
              {/* <GridListTileBar
                title={store.store_name}
                classes={{
                  root: classes.titleBar,
                  title: classes.title,
                }}
                actionIcon={
                  <IconButton aria-label={`star ${store.store_name}`}>
                  </IconButton>
                }
              /> */}
            </Link>
          </GridListTile>
        ))}
      </GridList>
    </div>
    </div>
  );
}
