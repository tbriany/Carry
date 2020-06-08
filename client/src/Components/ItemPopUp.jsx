import React, { useState, useEffect, useContext } from 'react';
import { CheckoutCartContext } from '../Contexts/CheckoutCartContext';
import axios from 'axios';
import { Link } from 'react-router-dom';

//Material UI
import { ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, Button, InputLabel, MenuItem, Select, Typography, Paper, Grid, FormControl, NativeSelect } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useStyles, BootstrapInput } from './styling/popoverTheme'
import "./ItemPopUp.css";

function ItemPopUp() {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);


    const { updateCurrQty, updateProductQty, checkoutCart, addToCart, producstSize, productId, productQty, addItemToBag, productSize, getProductSize } = useContext(CheckoutCartContext);
    const [itemInfo, setItemInfo] = useState({}) //Recieves all of the product info
    const [allSizes, setAllSizes] = useState([])
    const [curreBrandId, setCurrBrandId] = useState(0)

    const handleItemInfo = async () => {
        try {
            const productInfo = await axios.get(`/products/${productId}`)
            let productInfoPayload = productInfo.data.payload
            setItemInfo(productInfoPayload)
            setAllSizes(productInfoPayload.product_size)
            setCurrBrandId(productInfoPayload.store_id)
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
        <div className="ItemPopUp-stage"  >
            <Grid container className={classes.root} spacing={2} style={{ width: '100%', margin: "0px" }}>
                <Grid item xs={12} style={{ padding: '0px' }}>
                    <Grid container justify="center" spacing={3} style={{ width: '100%', margin: '0px', padding: '10% 0px 10% 0px', display: 'flex', alignContent: 'center' }} >

                        <Grid className='itemPopUp-image' item xs={6} style={{ width: '100%', padding: '0px 20px ', boxSizing: 'initial' }} >
                            <Paper style={{ boxShadow: " 1px 1px 1px white", height: '75%', paddingtop: '10px' }} className={classes.paper}>
                                <img src={itemInfo.product_image_url} height='100%' width='100%'/>
                            </Paper>
                        </Grid>
                        <Grid className='product-info' item sm={5} style={{ padding: '0px 12px' }} >
                            <Paper style={{ height: '100%', color: 'black', boxShadow: " 1px 1px 1px white", paddingtop: '10px' }} className={classes.paper}>
                                <div>
                                    <Link to={`/store/${1}`} style={{ textDecoration: 'none', color: 'black' }}>
                                        <p className="item-brand">{itemInfo.brands_name}'s</p>
                                    </Link>
                                    <p className="item-name">{itemInfo.product_name}</p>
                                    <p className="item-price">${itemInfo.product_price}</p>
                                    <p className="item-color" >Color: {itemInfo.colors_name}</p>
                                </div>

                                <div className='productQtySize'>
                                    <FormControl className={classes.margin}>
                                        <InputLabel htmlFor="native-select">Size</InputLabel>
                                        <NativeSelect
                                            style={{ backgroundColor: "#eed7c1" }}
                                            className='native-select'
                                            value={productSize}
                                            onChange={e => {
                                                getProductSize(e.target.value)
                                            }}
                                            input={<BootstrapInput />}
                                        >
                                            <option value="default" autoFocus disabled >Choose a size</option>
                                            {allSizes.map(function (size, i) {
                                                return (
                                                    <option key={i} value={size}
                                                    >{size} </option>
                                                )
                                            })}
                                        </NativeSelect>
                                    </FormControl>

                                    <input
                                        className="quantityInput"
                                        type="number" placeholder="1"
                                        min="1" max="100"
                                        value={productQty}
                                        onChange={e => {
                                            updateProductQty(e.target.value)
                                        }}>

                                    </input>
                                </div>
                                <div className='submitButton'>

                                    <Button
                                        style={{ margin: "10px", borderRadius: 35, backgroundColor: "#eed7c1", padding: "10px 24px", fontSize: "16px" }}
                                        variant="contained"
                                        className="ItemInputSubmit" type="submit" value="ADD TO BAG"
                                        disabled={productSize === 'default'}
                                        onClick={addToCart}>ADD TO BAG </Button>
                                </div>


                                <div style={{
                                    display: 'flex', textAlign: 'left', flexDirection: 'column',
                                }}>

                                    <p className='itemPopup-materials'>
                                        Materials: {itemInfo.material_name}
                                    </p>
                                    <p className='itemPopup-descript' >
                                        Description: {itemInfo.product_description}
                                    </p>
                                </div>
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>

            </Grid>
        </div >
    )
}
export default ItemPopUp;







