import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { LandingContext } from "../../Contexts/LandingPageDetailsContext";
import axios from "axios";

import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import StarBorderIcon from "@material-ui/icons/StarBorder";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: "nowrap",
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)",
    spacing: "10px",
  },
  title: {
    color: theme.palette.primary.light,
    display: "flex",
    flexWrap: "wrap",
  },
  titleBar: {
    background: "white",
    textAlign: "center",
    display: "flex",
    flexWrap: "wrap",

    // "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
  },
}));

export default function SingleLineGridListStores() {
  const { Latitude, Longitude } = useContext(LandingContext);
  const classes = useStyles();

  const [stores, setStores] = useState([]);
  console.log();
  useEffect(() => {
    async function fetchData() {
      axios
        .get(`/stores/location/${Latitude}}/${Longitude}`)
        .then((response) => {
          console.log(response, "getting stores by location");
          setStores(response.data.payload);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    fetchData();
  }, []);

  return (
    <div>
      <div>
        {" "}
        <h3
          style={{
            fontFamily: "Palatino Linotype",
            textAlign: "left",
            fontSize: "20px",
            color: "black",
          }}
        >
          {" "}
          Popular Stores Near You{" "}
        </h3>
      </div>
      <div className={classes.root}>
        <GridList className={classes.gridList} cols={3.5}>
          {stores.map((store) => (
            <GridListTile key={store.store_id}>
              <img src={store.avatar_url} alt={store.title} />
              <Link to={`/store/${store.store_id}`}>
                <GridListTileBar
                  title={store.store_name}
                  classes={{
                    root: classes.titleBar,
                    title: classes.title,
                  }}
                  actionIcon={
                    <IconButton aria-label={`star ${store.store_name}`}>
                      <StarBorderIcon className={classes.store_name} />
                    </IconButton>
                  }
                />
              </Link>
            </GridListTile>
          ))}
        </GridList>
      </div>
    </div>
  );
}
