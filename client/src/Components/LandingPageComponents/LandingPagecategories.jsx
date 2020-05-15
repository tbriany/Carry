import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
// styling 
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
// import IconButton from "@material-ui/core/IconButton";
// import StarBorderIcon from "@material-ui/icons/StarBorder";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
    boxSizing: "border-box",
  },
  gridList: {
    flexWrap: "nowrap",
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)",
    spacing: "20px"
  },
  title: {
    color: '#DEB887',
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

export default function Categories() {
  const classes = useStyles();

  const [categories, setCategories] = useState([]);
  // make network request to server to get all categories
  useEffect(() => {
     async function fetchCategories() {
      try {
        const res =  await axios.get('/products/categories/all')
        setCategories(res.data.payload);
      } catch (error) {
        setCategories([]);
        console.log(error);
      }
    }
    fetchCategories();
  }, []);

console.log(categories)
  return (
    <div>
      <div>
        <h3  style={{
            fontFamily: "Palatino Linotype",
            textAlign: "left",
            fontSize: "20px",
            color: "black",
          }}
        > Shop By Category </h3>
      </div>
    <div className={classes.root}>
      <GridList className={classes.gridList} cols={3.5} 
             item xs= {12} sm={6} md= {4} lg={3} xl= {2}
             spacing= {32} 
            >
        {categories.map((tile)  => (
          <GridListTile spacing={"100px"} cellHeight={"1px"} key={tile.category_id} >
            <img
              src={tile.category_landing_logo}
              alt={tile.title}
            />
            <Link to={`/categories/${tile.category_name}`}>
              <GridListTileBar
                title={tile.category_name}
                
                classes={{
                  root: classes.titleBar,
                  title: classes.title,
                }}
              />
            </Link>
          </GridListTile>
        ))}
      </GridList>
    </div>
    </div>
  );
}
