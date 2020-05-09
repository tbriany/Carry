import React, { useState, useEffect } from "react";
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
  },
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:
      "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
  },
}));

export default function SingleLineGridListStores() {
  const classes = useStyles();

  const [stores, setStores] = useState([]);

  useEffect(() => {
    async function fetchData() {
      axios
        .get("/stores/location/40.760350/-73.975080")
        .then((response) => {
          console.log(response, 'getting stores by location');
          setStores(response.data.payload);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    fetchData();
  }, []);

  return (
    <div className={classes.root}>
      <GridList className={classes.gridList} cols={2.5}>
        {stores.map((store) => (
          <GridListTile key={store.store_id}>
            <img src={store.avatar_url} alt={store.title} />
            <GridListTileBar
              title={store.title}
              classes={{
                root: classes.titleBar,
                title: classes.title,
              }}
              actionIcon={
                <IconButton aria-label={`star ${store.title}`}>
                  <StarBorderIcon className={classes.title} />
                </IconButton>
              }
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}

