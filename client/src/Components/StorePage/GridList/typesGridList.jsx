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


export default function TypesGridList({storeId}) {
  const classes = useStyles();

  const [types, setTypes] = useState([])

  useEffect(() => {
    async function fetchData() {
    try {
        const res = await axios.get(`/products/product_types/all`)
        setTypes(res.data.payload);
    } catch (error) {
        setTypes([])
        console.log(error);
    }
 }
  fetchData()
}, [])

// console.log(types)


  return (
    <div className={classes.root} style={{margin: "20px", padding: "15px"}}>
        <h3
              style={{
                fontFamily: "Palatino Linotype",
                textAlign: "left",
                fontSize: "20px",
                color: "black",
              }}
            >
              {" "}
              {"Shop By Type"}{" "}
            </h3>
      <GridList className={classes.gridList} cols={5} cellHeight={270} spacing={5}>
        {types.map((tile) => (
          <GridListTile key={tile.img}>
            <Link to={`/store/${storeId}/${tile.product_type_name}`}>
           <img src={tile.product_type_logo} alt={tile.product_type_name} />
           <span className={classes.imageButton}>
            <Typography
              component="span"
              variant="subtitle1"
              color="inherit"
              className={classes.imageTitle}
            >
              {tile.product_type_name}
            </Typography>
          </span>
            </Link>
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}