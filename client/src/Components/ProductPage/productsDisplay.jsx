import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  image: {
    height: 350,
    width: 300,
  },
}));

const gridData = [
    {
        img: 'https://www.marni.com/12/12386489MT_13_n_r.jpg',
        name: 'Product Name',
        price: '$19'
    }, 
    {
        img: 'https://nationalpostcom.files.wordpress.com/2018/07/tee1.jpg?quality=80&strip=all',
        name: 'Product Name',
        price: '$19'
    }, 
    {
        img: 'https://images.express.com/is/image/expressfashion/0036_05051421_1695?cache=on&wid=361&fmt=jpeg&qlt=75,1&resmode=sharp2&op_usm=1,1,5,0&defaultImage=Photo-Coming-Soon',
        name: 'Product Name',
        price: '$19'

    }, 
    {
        img: 'https://cdn.shopify.com/s/files/1/0082/3558/1504/products/lima-sagrada-small-backpack-black_606x606_b48c910d-33ac-46ce-aeb0-8bb3f7b73f7f_1296x.jpg',
        name: 'Product Name',
        price: '$19'
    },
    {
        img: 'https://www.marni.com/12/12386489MT_13_n_r.jpg',
        name: 'Product Name',
        price: '$19'
    }, 
    {
        img: 'https://nationalpostcom.files.wordpress.com/2018/07/tee1.jpg?quality=80&strip=all',
        name: 'Product Name',
        price: '$19'
    }, 
    {
        img: 'https://images.express.com/is/image/expressfashion/0036_05051421_1695?cache=on&wid=361&fmt=jpeg&qlt=75,1&resmode=sharp2&op_usm=1,1,5,0&defaultImage=Photo-Coming-Soon',
        name: 'Product Name',
        price: '$19'
    }, 
    {
        img: 'https://nationalpostcom.files.wordpress.com/2018/07/tee1.jpg?quality=80&strip=all',
        name: 'Product Name',
        price: '$19'
    },
    {
        img: 'https://cdn.shopify.com/s/files/1/0082/3558/1504/products/lima-sagrada-small-backpack-black_606x606_b48c910d-33ac-46ce-aeb0-8bb3f7b73f7f_1296x.jpg',
        name: 'Product Name',
        price: '$19'
    }
]


export default function ProductsDisplay() {
  const classes = useStyles();

  return (
    <div className={classes.root} style={{margin: '20px', padding: '15px'}}>
    <Grid container className={classes.root} justify='center'>
      <Grid item md={10}>
        <Grid container justify="center" spacing={5}>
          {gridData.map((value) => (
                <Grid key={value} item>
                    <img alt="backpack" src={value.img} className={classes.image}></img>
                <Grid item>
                    <Typography gutterBottom variant="subtitle1">{value.name}</Typography>
                    <Typography variant="subtitle1">{value.price}</Typography>
                </Grid>
                </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
    </div>
  );
}

