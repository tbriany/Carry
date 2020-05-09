import React from 'react';
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
    background: 'white',
    textAlign: 'center'
      // 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
}));


export default function CategoryGridList() {
  const classes = useStyles();
   const tileData = [
      {
         img: 'https://logoeps.com/wp-content/uploads/2013/05/target-stores-vector-logo.png',
         title: 'Store 1 ',
         author: 'author',
       }, 
       {
        img: 'https://cdn.shopify.com/s/files/1/0082/3558/1504/files/pazlogo3_x45@2x.png?v=1555461745',
        title: 'PAZ Lifestyle',
        author: 'author',
      }, 
      {
        img: '4',
        title: 'Store 3',
        author: 'author',
      }, 
      {
        img: '5',
        title: 'Store 4',
        author: 'author',
      }, 
      {
        img: '6',
        title: 'Store 5',
        author: 'author',
      } 
     ];
  return (
    <div className={classes.root}>
      <GridList className={classes.gridList} cols={3.5}
        item xs= {12} sm={6} md= {4} lg={3} xl= {2}
        spacing= {50}
        alignItems= 'strech'
    
      
      >
        {tileData.map((tile) => (
          <GridListTile  key={tile.img}>
           <img  src={tile.img} alt={tile.title} />
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
          </GridListTile> 
        ))}
       
      </GridList>
    </div>
  );
}
