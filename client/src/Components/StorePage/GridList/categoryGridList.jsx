import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Typography from '@material-ui/core/Typography';
import customTheme from '../../styling/customTheme';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: 'nowrap',
    transform: 'translateZ(0)',
  },
  title: {
    color: theme.palette.primary.light,
  },
  imageButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'black',

  },
  imageTitle: {
    position: 'relative',
    padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${theme.spacing(1) + 6}px`,
    backgroundColor: 'white',
    fontWeight: 'bold'
  }
}));


export default function CategoriesGridList({storeId}) {
  const classes = useStyles();

  const [categories, setCategories] = useState([])

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`/products/categories/all`)
        setCategories(res.data.payload);
      } catch (error) {
        setCategories([])
        console.log(error);
      }
    }
    fetchData()
  }, [])

  // console.log(categories)

  return (
    <div className={classes.root} style={{ margin: "20px", padding: "15px"}}>
      <div> 
       <h2
              style={{
                fontFamily: "Palatino Linotype",
                textAlign: "left",
                color: "black",
              }}
            >
              Browse Categories
            </h2>
    </div>
      <GridList className={classes.gridList} cols={3} cellHeight={350} spacing={13} >
        {categories.map((tile) => (
          <GridListTile key={tile.category_id}>
            <Link to={`/store/${storeId}/${tile.categories_name}`}>
              <img src={tile.category_logo} alt={tile.category_logo} style={{ width: '100%' , height: '100%'}}/>
              <span className={classes.imageButton}>
                <Typography
                  component="span"
                  variant="subtitle1"
                  color="inherit"
                  className={classes.imageTitle}
                >
                  {tile.categories_name}
                </Typography>
              </span>
            </Link>
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}
