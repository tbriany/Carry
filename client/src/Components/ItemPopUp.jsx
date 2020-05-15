import React, { useState, useEffect, useContext } from 'react';
import { ItemDetailsContext } from '../Contexts/ItemDetailsContexts';
import axios from 'axios';

//Material UI
import { ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, Button, InputLabel, MenuItem, Select, Typography, Paper, Grid, FormControl, NativeSelect } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useStyles, BootstrapInput } from './styling/popupTheme'
import "./ItemPopUp.css";


function ItemPopUp() {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };


    const { updateCurrQty, getProductPrice, productSize, updateProductQty, checkoutCart, addToCart, productId, productQty, addItemToBag, getProductSize } = useContext(ItemDetailsContext);


    const [itemInfo, setItemInfo] = useState({})
    const [size, setSize] = useState('')


    const handleItemInfo = async () => {
        try {
            const productInfo = await axios.get(`/products/${productId}`)
            let productInfoPayload = productInfo.data.payload
            setItemInfo(productInfoPayload)
            getProductPrice(productInfoPayload.product_price)
        } catch (err) {
            console.log("ERROR", err)
        }
    }

    useEffect(() => {
        if (productId !== 0) {
            handleItemInfo();
        }
    }, [productId])





    return (

        <div className="ItemPopUp-stage">
            <div className={classes.root}>
                <Grid container spacing={3} height="150px" style={{ justifyContent: "center", marginTop: '12px', padding: '10px' }}>
                    <Paper style={{
                        boxShadow: " 1px 1px 1px white",
                        padding: '2px'
                    }}
                        className={classes.paper}>  <img src={itemInfo.product_image_url} height="200px" /></Paper>
                </Grid>

                <Grid container spacing={3} height="100px" style={{ justifyContent: "center", padding: '6px' }}>

                    <Grid item xs={9}
                        style={{
                            borderBottom: "1px solid #eed7c1",
                            padding: '2px 2px 30px',
                          
                        }}>
                        <Paper className={classes.paper}
                            style={{
                                color: "black",
                                boxShadow: " 1px 1px 1px white",
                                justifyContent: 'center',
                                display: 'grid'
                            }}>
                            <p className="item-name">{itemInfo.brand_name}'s </p>
                            <p className="item-name">{itemInfo.product_name}</p>
                            <p className="item-price">${itemInfo.product_price}</p>
                            <p className="item-color" >Color: {itemInfo.color_name}</p>
                        </Paper>
                    </Grid>

                    <Grid item xs={9}>
                        <Paper className={classes.paper}
                            style={{
                                boxShadow: " 1px 1px 1px white",
                                padding: '2px'
                            }}>

                            <FormControl className={classes.margin}>
                                <InputLabel htmlFor="demo-customized-select-native">Size</InputLabel>
                                <NativeSelect
                                    style={{
                                        backgroundColor: "#eed7c1",
                                    }}
                                    id="demo-customized-select-native"
                                    value={productSize}
                                    onChange={e => {
                                        getProductSize(e.target.value)
                                    }}
                                    input={<BootstrapInput />}
                                >
                                    <option value="default" autoFocus disabled>Choose a size</option>
                                    <option value={itemInfo.product_size} >{itemInfo.product_size} </option>
                                </NativeSelect>
                            </FormControl>

                            <input
                                className="quantityInput"
                                type="number" placeholder="0"
                                min="0" max="100"
                                value={productQty}
                                onChange={e => {
                                    updateProductQty(e.target.value)
                                }}>
                            </input>
                            <br></br>
                            <Button
                                style={{
                                    margin: "10px",
                                    borderRadius: 35,
                                    backgroundColor: "#eed7c1",
                                    padding: "10px 24px",
                                    fontSize: "14px",
                                }}
                                variant="contained"
                                className="ItemInputSubmit" type="submit" value="ADD TO BAG"
                                onClick={addToCart}>ADD TO BAG</Button>


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
                                            className={classes.heading}>Description
                                            </Typography>
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails style={{
                                        border: '1px solid #eed7c1',
                                    }}>
                                        <Typography>
                                            Materials: {itemInfo.material_name}
                                            <br></br>
                                            Description: {itemInfo.product_description}
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




