import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
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
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
}));


const tileData = [
    {
        img: 'https://www.marni.com/12/12386489MT_13_n_r.jpg',
        title: 'Image',
        author: 'author'
    }, 
    {
        img: 'https://nationalpostcom.files.wordpress.com/2018/07/tee1.jpg?quality=80&strip=all',
        title: 'Image',
        author: 'author'
    }, 
    {
        img: 'https://images.express.com/is/image/expressfashion/0036_05051421_1695?cache=on&wid=361&fmt=jpeg&qlt=75,1&resmode=sharp2&op_usm=1,1,5,0&defaultImage=Photo-Coming-Soon',
        title: 'Image',
        author: 'author'
    }, 
    {
        img: 'https://c.bonfireassets.com/thumb/design-image/1ab7656b-173f-4703-8f12-76329e8d2823/7329f207-b69c-4f7e-8322-9f628fd81358/?size=900',
        title: 'Image',
        author: 'author'
    }
]



export default function SingleLineGridList(props) {
  const classes = useStyles();

  return (
    <div className={classes.root} style={{margin: "20px"}}>
        <Typography variant="h4" align="left">
         {props.listTitle}
        </Typography>
      <GridList className={classes.gridList} cols={3} cellHeight={200}>
        {tileData.map((tile) => (
          <GridListTile key={tile.img}>
            <img src={tile.img} alt={tile.title} />
            <GridListTileBar
              title={tile.title}
              classes={{
                root: classes.titleBar,
                title: classes.title,
              }}
              actionIcon={
                <IconButton aria-label={`star ${tile.title}`}>
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
