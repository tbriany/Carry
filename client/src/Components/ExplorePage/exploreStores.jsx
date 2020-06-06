import React, { useEffect, useState } from "react";
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
    maxHeight: '500px'
  },
  gridList: {
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
    <div className={classes.root}>
      <GridList
        className={classes.gridList}
         cols={1}
        item
        xs={12}
        sm={6}
        md={4}
        lg={3}
        xl={2}
        spacing={50}
        alignItems="vertical"
       
      >
        
     {storess.map((store) => (
  
          <GridListTile key={store.id}  style={{ maxWidth:"350px",
          maxHeight: '700px'}}>
  
            <PplCard
              storeid={store.store_id}
              email={store.email}
              store_name={store.store_name}
              avatar={store.avatar_url}
            />
            <GridListTileBar
              classes={{
                root: classes.titleBar,
                title: classes.title,
              }}
              actionIcon={
                <IconButton aria-label={`star ${store.store_name}`}>
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
