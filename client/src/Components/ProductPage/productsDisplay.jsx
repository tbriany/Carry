import React, { useState, useEffect } from "react";
import axios from "axios";
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

export default function ProductsDisplay(props) {
  const classes = useStyles();

  const [products, setProducts] = useState([])




  useEffect(() => {
    const getProductByCategory = async () => {
      try {
        const res = await axios.get(`/products/category/${props.categoryName}/${props.storeId}`)
        setProducts(res.data.payload);
      } catch (error) {
        setProducts([])
        console.log(error);
      }
    }
    getProductByCategory()
  }, [])

  console.log(products)

  return (
    <div className={classes.root} style={{ margin: '20px', padding: '15px' }}>
      <Grid container className={classes.root} justify='center'>
        <Grid item md={10}>
          <Grid container justify="center" spacing={5}>
            {products.map((value) => (
              <Link to={`/popup/${value.product_id}`}>
                <Grid key={value} item>
                  <img alt="backpack" src={value.product_image_url} className={classes.image}></img>
                  <Grid item>
                    <Typography gutterBottom variant="subtitle1">{value.product_name}</Typography>
                    <Typography variant="subtitle1">$ {value.product_price}</Typography>
                  </Grid>
                </Grid>
              </Link>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

