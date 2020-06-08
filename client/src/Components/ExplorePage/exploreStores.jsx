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
    <h3> responsive </h3>
    <Grid
      container
      spacing={10}
      style={{ padding: "24px " }}
      alignItems='Stretch'
      justify="center"
      // direction ="column"
      
    >
      {/* {users.map((user) => ( */}
        <Grid 
       
        >

          {/* <PplCard
            key = {user.id}
            email={user.email}
            firstname={user.firstname}
            lastname={user.lastname}
            avatar={user.avatar}

          /> */}
          <SingleLineGridList
          /> 



        </Grid>
      {/* ))} */}
    </Grid>
  </div>
);
}
  










