import React, { useState, useEffect } from "react";
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
    spacing: "4px",
  },
  gridList: {
    flexWrap: "nowrap",
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)",
    spacing: "10",
  },
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background: "white",
    textAlign: "center",
    // 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
}));

export default function Categories() {
  const classes = useStyles();

  const categories = [
    {
      img:
        "https://cdn2.vectorstock.com/i/1000x1000/90/16/fashion-women-in-checkered-dress-drawing-outline-vector-27759016.jpg",
      title: "Women's",
      author: "author",
    },
    {
      img:
        "https://thumbs.dreamstime.com/b/fashion-man-men-sketches-white-background-autumn-127439059.jpg",
      title: "Men's",
      author: "author",
    },
    {
      img:
        "https://cdn.shopify.com/s/files/1/0580/0721/articles/iStock-1170104811_95fed370-9e0c-4fd8-a668-8d7e806c8f05_grande.jpg?v=1581195777",
      title: "Beauty",
      author: "author",
    },
    {
      img:
        "https://www.thestatesman.com/wp-content/uploads/2017/12/accessories.jpg",
      title: "Accessories",
      author: "author",
    },
  ];

  return (
    <div className={classes.root}>
      <GridList className={classes.gridList} cols={3.5}>
        {categories.map((tile) => (
          <GridListTile key={tile.img}>
            <img src={tile.img} alt={tile.title} />
            <a href ='http://google.com'>
              <GridListTileBar
                title={tile.title}
                classes={{
                  root: classes.titleBar,
                  title: classes.title,
                }}
                actionIcon={
                  <IconButton aria-label={`Heart ${tile.title}`}>
                    <StarBorderIcon className={classes.title} />
                  </IconButton>
                }
              />
            </a>
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}
