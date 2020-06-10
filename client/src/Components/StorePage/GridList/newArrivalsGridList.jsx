import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from "@material-ui/core/Button";
import List from '@material-ui/core/List';
import clsx from 'clsx';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import { sidePopUp } from '../../styling/sidePopTheme'
import ItemPopUp from '../../ItemPopUp'



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
        backgroundColor: 'rgba(255, 255, 255, 0.54)',
        fontWeight: 'bold'
    }
}));



export default function NewArrivalsGridList({ storeId, getProductId, currentProdId }) {
    const classes = useStyles();
    const [newArrivals, setNewArrivals] = useState([])

    const popUp = sidePopUp();
    const [open, setOpen] = React.useState({ right: false });

    const toggleDrawer = (right, open, prodId) => event => {
        open ? getProductId(prodId) : getProductId(currentProdId)
        setOpen({ ...open, right: open });
    };

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await axios.get(`/products/new_arrivals/${storeId}`)
                setNewArrivals(res.data.payload);
            } catch (error) {
                setNewArrivals([])
                console.log(error);
            }
        }
        fetchData()
    }, [storeId])

    // console.log(newArrivals)

    return (
        <div className={classes.root} style={{ margin: "20px", padding: "15px" }}>
            <h2
                style={{
                    fontFamily: "Palatino Linotype",
                    textAlign: "left",
                    color: "black",
                }}
            >
                New Arrivals
            </h2>
            <GridList className={classes.gridList} cols={4} cellHeight={300} spacing={10}>
                {newArrivals.map((tile) => (
                    <GridListTile key={tile.product_id}>
                        <Button key={tile.product_id} className='button' onClick={toggleDrawer(open.right, true, tile.product_id)}
                            disableFocusRipple={true}
                            disableRipple={true}
                            disableElevation={true}
                        >
                            <Box display="flex" justifyContent="center">
                                <img src={tile.product_image_url} alt={tile.product_name}
                                    style={{ width: '100%', height: '310px' }}
                                />
                                <span className={classes.imageButton}>
                                    <Typography
                                        component="span"
                                        variant="subtitle1"
                                        color="inherit"
                                        className={classes.imageTitle}
                                    >
                                        {tile.product_name}
                                    </Typography>
                                </span>
                            </Box>
                        </Button>


                    </GridListTile>
                ))}

                <SwipeableDrawer
                    anchor={"right"}
                    open={open.right}
                    onClose={toggleDrawer(open.right, false)}
                    onOpen={toggleDrawer(open.right, true)}
                    classes={{ paperAnchorRight: popUp.paperAnchorRight }}
                >
                    <div className={clsx(popUp.list)} role="presentation" onKeyDown={toggleDrawer(open.right, false)}
                    >
                        <List>
                            <ItemPopUp />
                        </List>
                    </div>

                </SwipeableDrawer>
            </GridList>
        </div >
    );
}
