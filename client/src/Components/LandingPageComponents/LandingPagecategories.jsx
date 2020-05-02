import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
    spacing: "20px",
  },
  title: {
    color: theme.palette.primary.light,
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

  const categories = [
    {
      id: 1,
      img:
        "https://cdn2.vectorstock.com/i/1000x1000/90/16/fashion-women-in-checkered-dress-drawing-outline-vector-27759016.jpg",
      title: "Women",
      author: "author",
    },
    {
      id: 2,
      img:
        "https://thumbs.dreamstime.com/b/fashion-man-men-sketches-white-background-autumn-127439059.jpg",
      title: "Men",
      author: "author",
    },
    {
      id: 3,
      img:
        "https://cdn.shopify.com/s/files/1/0580/0721/articles/iStock-1170104811_95fed370-9e0c-4fd8-a668-8d7e806c8f05_grande.jpg?v=1581195777",
      title: "Beauty",
      author: "author",
    },
    {
      id: 4,
      img:
        "https://www.thestatesman.com/wp-content/uploads/2017/12/accessories.jpg",
      title: "Accessories",
      author: "author",
    },
    {
      id: 4,
      img:
        "https://www.thestatesman.com/wp-content/uploads/2017/12/accessories.jpg",
      title: "Home Decor ",
      author: "author",
    },
    {id: 4,
      img:
        "https://www.thestatesman.com/wp-content/uploads/2017/12/accessories.jpg",
      title: "Health & Wellness",
      author: "author",
    },
    {id: 4,
      img:
        "https://www.thestatesman.com/wp-content/uploads/2017/12/accessories.jpg",
      title: "Kids",
      author: "author",
    }
  ];

  return (
    <div className={classes.root}>
      <GridList className={classes.gridList} cols={3.5} >
        {categories.map((tile)  => (
          <GridListTile spacing={"100px"} cellHeight={"1px"} key={tile.img} style={{borderRadius:"50%"}}>
            <img
              
              src={tile.img}
              alt={tile.title}
            />
            <Link to={`/categories/${tile.id}`}>
              <GridListTileBar
                title={tile.title}
                s
                classes={{
                  root: classes.titleBar,
                  title: classes.title,
                }}
                // actionIcon={
                //   <IconButton aria-label={`Heart ${tile.title}`}>
                //     <StarBorderIcon className={classes.title} />
                //   </IconButton>}
              />
            </Link>
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}
