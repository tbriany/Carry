import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

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


export default function NewArrivalsGridList({listTitle, storeId}) {
    const classes = useStyles();

    const [newArrivals, setNewArrivals] = useState([])
    
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
            <Typography variant='h4' display='block' paragraph='true'>
                {listTitle}
            </Typography>
            <GridList className={classes.gridList} cols={4} cellHeight={300} spacing={10}>
                {newArrivals.map((tile) => (
                    <GridListTile key={tile.img}>
                        <Link to={`/popup/${tile.product_id}`}>
                            <Box display="flex" justifyContent="center">
                                <img src={tile.product_image_url} alt={tile.product_name} />
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
                        </Link>
                    </GridListTile>
                ))}
            </GridList>
        </div>
    );
}
