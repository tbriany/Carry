import React, { useState, useEffect, useContext } from 'react';
import { Button, InputLabel, MenuItem, Select } from '@material-ui/core';
import { ItemDetailsContext } from '../Contexts/ItemDetailsContexts';
import axios from 'axios';

//Material UI
import { makeStyles, withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';

import "./ItemPopUp.css";


const BootstrapInput = withStyles((theme) => ({
    root: {
        'label + &': {
            marginTop: theme.spacing(3),
        },
    },
    input: {
        borderRadius: 4,
        position: 'relative',
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #eed7c1',
        fontSize: 16,
        padding: '10px 26px 10px 12px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),

        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:focus': {
            borderRadius: 4,
            borderColor: '#80bdff',
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
    },
}))(InputBase);

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));
function ItemPopUp() {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    }; //Expnds ItemDescription

    const { updateId, itemId, qty, updateQty } = useContext(ItemDetailsContext)
    //Acts like ItemDetailsContext.consumer but allows the entire ItemPopUp.jsx access to the state in Contexts/ItemDeatilsContext.js. 
    // ItemDetailsContext.consumer is found in the return and wraps around all html tags (div, p, h1 etc.) It will only give those specific tags access to the state.


    const [itemInfo, setItemInfo] = useState([]) //Recieves all of the product info
    const [size, setSize] = useState(null)  //Changes based on the size picked by the user
    const [quantity, setQuantity] = useState(0) //Changes based on the quantity the user wants from a specific product

    const handleItemInfo = async () => {
        try {
            const itemInfo = await axios.get(`/products/images/${itemId}`)
            setItemInfo(itemInfo.data.payload)
        } catch (err) {
            console.log("ERROR", err)
        }

    }

    useEffect(() => {
        handleItemInfo();
    }, []) //Act like ComponentDidMount 

    return (

        <div className="ItemPopUp-stage">
            <p>ITEM POP UP</p>
            <div className={classes.root}>
                <Grid container spacing={2} height="100px">
                    <Grid item xs={5}>
                        <Paper style={{
                            boxShadow: " 1px 1px 1px white",
                        }}
                            className={classes.paper}>  <img src={itemInfo.product_image_url} height="300px" /></Paper>
                    </Grid>

                    <Grid item xs={7}
                        style={{
                            borderBottom: "1px solid #eed7c1",
                        }}>
                        <Paper className={classes.paper}
                            style={{
                                color: "black",
                                boxShadow: " 1px 1px 1px white",
                                // borderBottom: "1px solid #eed7c1",
                                height: "200px",
                            }}>

                            <p className="item-name">{itemInfo.brand_name}'s {itemInfo.product_name}</p>
                            <p className="item-price">${itemInfo.product_price}</p>
                            <p className="item-color" >Color: {itemInfo.color_name}</p>
                        </Paper>
                    </Grid>

                    <Grid item xs={5}>
                        <Paper>
                        </Paper>
                    </Grid>


                    <Grid item xs={7}>
                        <Paper className={classes.paper}
                            style={{
                                boxShadow: " 1px 1px 1px white",                             
                            }}>

                            <FormControl className={classes.margin}>
                                <InputLabel htmlFor="demo-customized-select-native">Size</InputLabel>
                                <NativeSelect
                                    style={{
                                        backgroundColor: "#eed7c1",
                                    }}
                                    id="demo-customized-select-native"
                                    // value={}
                                    onChange={(e) => setSize(e.target.value)}
                                    input={<BootstrapInput />}
                                >
                                    <option value="default" selected="true" disabled="disabled" >Choose a size</option>
                                    <option value={itemInfo.product_size} >{itemInfo.product_size} </option>
                                </NativeSelect>
                            </FormControl>

                            <input
                                className="quantityInput"
                                type="number" placeholder="0"
                                min="0" max="100"
                                value={qty}
                                // onChange={(e) => setQuantity(e.target.value)}
                                onChange={e => {
                                    updateQty(e.target.value)
                                }}> 
                                {/* Updates the parent state from the child component */}
                            </input>
                            <br></br>

                            <Button
                                style={{
                                    margin: "10px",
                                    borderRadius: 35,
                                    backgroundColor: "#eed7c1",
                                    padding: "18px 85px",
                                    fontSize: "14px",
                                }}
                                variant="contained"
                                className="ItemInputSubmit" type="submit" value="ADD TO BAG"
                                onClick={updateId}>ADD TO BAG</Button>



                            <div className="description">
                                <ExpansionPanel expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>

                                    <ExpansionPanelSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1bh-content"
                                        id="panel1bh-header"
                                        style={{
                                            border: '1px solid #eed7c1',
                                        }}>
                                        <Typography
                                            className={classes.heading}>Item Description
                                            </Typography>
                                    </ExpansionPanelSummary>


                                    <ExpansionPanelDetails style={{
                                        border: '1px solid #eed7c1',
                                    }}>
                                        <Typography>
                                            <p>Materials: {itemInfo.material_name}</p>
                                            <p>Description: {itemInfo.product_description}</p>
                                        </Typography>
                                    </ExpansionPanelDetails>

                                </ExpansionPanel>
                            </div>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
            <br></br>

        </div>
    )
}

export default ItemPopUp;

