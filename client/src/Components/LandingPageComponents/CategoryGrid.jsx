// import React, { useEffect, useState } from "react";
// import axios from "axios";

// import { makeStyles } from "@material-ui/core/styles";
// import GridList from "@material-ui/core/GridList";
// import GridListTile from "@material-ui/core/GridListTile";
// import GridListTileBar from "@material-ui/core/GridListTileBar";
// import IconButton from "@material-ui/core/IconButton";
// import StarBorderIcon from "@material-ui/icons/StarBorder";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     display: "flex",
//     flexWrap: "wrap",
//     justifyContent: "space-around",
//     overflow: "hidden",
//     backgroundColor: theme.palette.background.paper,
//     spacing: "4px",
//   },
//   gridList: {
//     flexWrap: "nowrap",
//     // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
//     transform: "translateZ(0)",
//     spacing: "10",
//   },
//   title: {
//     color: theme.palette.primary.light,
//   },
//   titleBar: {
//     background: "white",
//     textAlign: "center",
//     // 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
//   },
// }));

// export default function CategoryGridList() {
//   const classes = useStyles();
//   const [categoryProducts, setCategoryProducts] = useState([]);
//   useEffect(() => {
//     async function getProductByCategory() {
//       await axios
//         .get("/products/category/4")
//         .then((res) => {
//           console.log('getting products by category', res.data.payload);
//           setCategoryProducts(res.data.payload);
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     }
//     getProductByCategory();
//   }, []);

//   return (
//     <div>
//       <div>
//         <h3> </h3>
//       </div>

//       <div className={classes.root}>
//         <GridList
//           className={classes.gridList}
//           cols={3.5}
//           item
//           xs={12}
//           sm={6}
//           md={4}
//           lg={3}
//           xl={2}
//           spacing={50}
//           alignItems="strech"
//         >
//           {categoryProducts.map((product) => (
//             <GridListTile key={product.product_id}>
//               <img src={product.product_image_url} alt={product.title} />
//               <GridListTileBar
//                 title={product.product_name}
//                 classes={{
//                   root: classes.titleBar,
//                   title: classes.title,
//                 }}
//                 actionIcon={
//                   <IconButton aria-label={`Heart ${product.product_name}`}>
//                     <StarBorderIcon className={classes.title} />
//                   </IconButton>
//                 }
//               />
//             </GridListTile>
//           ))}
//         </GridList>
//       </div>
//     </div>
//   );
// }


import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button";
import List from '@material-ui/core/List';
import clsx from 'clsx';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import ItemPopUp from '../ItemPopUp'


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  image: {
    height: 350,
    width: 300,
    maxHeight: '100%'
  },
}));


const sidePopUp = makeStyles({
  list: {
    width:' 400px',
  },
  fullList: {
    width: "50%"
  },

});



export default function CategoryGrid({product_name, getProductId, products}) {
  const classes = useStyles();

  // const [products, setProducts] = useState([])


  const popUp = sidePopUp();
  const [state, setState] = React.useState({
    right: false
  });

  const toggleDrawer = (right, open, prodId) => event => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
      
    ) {
      
   getProductId(prodId)
      return;
    }

   getProductId(prodId)
    setState({ ...state, right: open });
  };


  const list = (anchor) => (
    <div
      className={clsx(popUp.list, {
        [popUp.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"

      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ItemPopUp />
      </List>
    </div>
  );


  return (
    <div>
    <div className={classes.root} style={{ margin: '20px', padding: '15px' }}>
      <Grid container className={classes.root} justify='center'>
        <Grid item md={10}>
          <Grid container justify="center" spacing={5}>
            {products.map((value) => (

              <Button onClick={toggleDrawer("right", true, value.product_id)}>

                <Grid key={value} item>
                  <img alt="backpack" src={value.product_image_url} className={classes.image}></img>
                  <Grid item>
                    <Typography gutterBottom variant="subtitle1">{value.product_name}</Typography>
                    <Typography variant="subtitle1">$ {value.product_price}</Typography>
                  </Grid>
                </Grid>
              </Button>
            ))}

            <SwipeableDrawer
              anchor={"right"}
              open={state["right"]}
              onClose={toggleDrawer("right", false, 0)}
              onOpen={toggleDrawer("right", true)}  
            >
              {list('right')}
            </SwipeableDrawer>
          </Grid>
        </Grid>
      </Grid>
    </div>
    </div>
  );
}
