import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import clsx from "clsx";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import ItemPopUp from "../ItemPopUp";
import { sidePopUp } from "../styling/sidePopTheme";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  image: {
    height: 350,
    width: 300,
    maxHeight: "100%",
  },
}));

export default function CategoryGrid({
  product_name,
  getProductId,
  products,
  currentProdId,
}) {
  const classes = useStyles();

  // const [products, setProducts] = useState([])

  const popUp = sidePopUp();
  const [open, setOpen] = React.useState({ right: false });

  const toggleDrawer = (right, open, prodId) => (event) => {
    open ? getProductId(prodId) : getProductId(currentProdId);
    setOpen({ ...open, right: open });
  };

  return (
    <div>
      <div
        className={classes.root}
      //  style={{ margin: "20px", padding: "15px" }}
      >
        <Grid container className={classes.root} justify="center">
          <Grid item md={70} spacing={70}>
            <Grid container justify="center" spacing={70}>
              {products.map((value) => (
                <Button
                  key={value.product_id}
                  onClick={toggleDrawer(open.right, true, value.product_id)}
                  disableFocusRipple={true}
                  disableRipple={true}
                  disableElevation={true}
                >
                  <Grid key={value.product_id} item>
                    <img
                      alt="poduct_type"
                      src={value.product_image_url}
                      className={classes.image}
                      style={{
                        objectFit: "scale-down",
                        height: "350px",
                        maxWidth: "244px",
                      }}
                    ></img>
                    <Grid item>
                      <Typography gutterBottom variant="subtitle1">
                        {value.product_name}
                      </Typography>

                      <Typography variant="subtitle1">
                        <Link
                          to={`/store/${value.store_id}`}
                          style={{ textDecoration: "none", color: "black" }}
                        >
                          {value.store_name}{" "}
                        </Link>
                      </Typography>
                      <Typography variant="subtitle1">
                        $ {value.product_price}
                      </Typography>
                    </Grid>
                  </Grid>
                </Button>
              ))}

              <SwipeableDrawer
                anchor={"right"}
                open={open.right}
                onClose={toggleDrawer(open.right, false)}
                onOpen={toggleDrawer(open.right, true)}
                classes={{ paperAnchorRight: popUp.paperAnchorRight }}
              >
                <div
                  className={clsx(popUp.list)}
                  role="presentation"
                  onKeyDown={toggleDrawer(open.right, false)}
                >
                  <List>
                    <ItemPopUp />
                  </List>
                </div>
              </SwipeableDrawer>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
