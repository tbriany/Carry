import React, { useState, useEffect} from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Typography from '@material-ui/core/Typography';

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


export default function CategoriesGridList(props) {
  const classes = useStyles();

  const [categories, setCategories] = useState([])

  useEffect(async () => {
  try {
      const res = await axios.get(`/products/categories/all`)
      setCategories(res.data.payload);
  } catch (error) {
      setCategories([])
      console.log(error);
  }
}, [])

// console.log(categories)

  return (
    <div className={classes.root} style={{margin: "20px", padding: "15px"}}>
        <Typography variant='h4' display='block' paragraph='true'>
         {props.listTitle}
        </Typography>
      <GridList className={classes.gridList} cols={4} cellHeight={300} spacing={10}>
        {categories.map((tile) => (
           <GridListTile key={tile.img}>
            <Link to={`/store/1/products`}>
              {/* <img src={tile.img} alt={tile.title} /> */}
              <img src={tile.category_logo} alt={tile.category_logo} />
              <span className={classes.imageButton}>
               <Typography
                 component="span"
                 variant="subtitle1"
                 color="inherit"
                 className={classes.imageTitle}
               >
                 {/* {tile.title} */}
                 {tile.category_name}
               </Typography>
             </span>
               </Link>
             </GridListTile>
        ))}
      </GridList>
    </div>
  );
}
