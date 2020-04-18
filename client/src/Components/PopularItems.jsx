import React, {useState, useEffect} from 'react';
import {Link} from 'react'
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
    spacing: '4px'
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
    spacing: '10'
  },
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
}));



 
export default function SingleLineGridListItems() {
  const classes = useStyles();

  const [stores, setStores] = useState([])
  
//make network request to retrieve all stores
  useEffect(()=> {
    axios.get('http://localhost:4008/stores/')
    .then(res => {
      console.log(res)
      setStores(res.data.payload)
    })
    .catch(err => {
      console.log(err)
    })
  }, [])

  //  const tileData = [
  //     {
  //        img: '1',
  //        title: 'SHOES ',
  //        author: 'author',
  //      }, 
  //      {
  //       img: '2',
  //       title: 'PURSE',
  //       author: 'author',
  //     }, 
  //     {
  //       img: '3',
  //       title: 'BACKBAG',
  //       author: 'author',
  //     }, 
  //     {
  //       img: '4',
  //       title: 'HEELS',
  //       author: 'author',
  //     }, 
  //     {
  //       img: '5',
  //       title: 'SANDALS',
  //       author: 'author',
  //     } 
  //    ];

     console.log(stores)
  return (
    
    <div className={classes.root}>
      <GridList className={classes.gridList} cols={3.5}>
        {stores.map((store) => (
          
          <GridListTile  key={store.img}>
  
            <img src={store.img} alt={store.store_name} />
            <GridListTileBar
              title={store.store_name}
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
