import React, { useState, useEffect, useContext } from 'react';
import { CheckoutCartContext } from '../Contexts/CheckoutCartContext';
import axios from 'axios';
import { Link } from 'react-router-dom';

//Material UI
import { Button, InputLabel, Paper, Grid, FormControl, NativeSelect } from '@material-ui/core'
import { useStyles, BootstrapInput } from './styling/popoverTheme'
import "./ItemPopUp.css";

function ItemPopUp() {
    const classes = useStyles();

    const { getCheckout, productId } = useContext(CheckoutCartContext);
    const [productInfo, setProductInfo] = useState({})
    const [productSizes, setProductSizes] = useState([])
    const [selectProduct, setSelectProduct] = useState({
        storeId: null, productId: productId, productSize: 'default', productQty: 1,
    })


    useEffect(() => {
        const handleGetProductInfo = async () => {
            try {
                const productInfo = await axios.get(`/products/${productId}`)
                let productInfoPayload = productInfo.data.payload
                setProductInfo(productInfoPayload)
                setProductSizes(productInfoPayload.product_size)
                let storeId = productInfoPayload.store_id
                setSelectProduct({ ...selectProduct, storeId: storeId })
            } catch (err) {
                console.log("ERROR", err)
            }
        }
        handleGetProductInfo()
        setSelectProduct({ brandId: null, productId: productId, productSize: 'default', productQty: 1, })
    }, [productId])



    const addToCart = async () => {
        if (selectProduct.productSize !== 'default') {
            const productExistInCart = await axios.get(`/checkoutCart/items/productId/${productId}/${selectProduct.productSize}`)
            const productExistPayload = productExistInCart.data.payload

            if (!productExistPayload) {
                try {
                    await axios.post('/checkoutCart/items/add', { product_id: productId, size: selectProduct.productSize, quantity: selectProduct.productQty })
                } catch (err) {
                    console.log("ERROR", err)
                }
            } else {
                let updateQty = productExistPayload.cartquantity + parseInt(selectProduct.productQty)
                try {
                    await axios.patch(`/checkoutCart/items/edit`, { product_id: productExistPayload.product_id, size: productExistPayload.size, quantity: updateQty })
                } catch (err) {
                    console.log("ERROR", err)
                }
            }
            await getCheckout()

        }
    }


    return (
        <div className="ItemPopUp-stage"  >
            <Grid container className={classes.root} spacing={2} style={{ width: '100%', margin: "0px" }}>
                <Grid item xs={12} style={{ padding: '0px' }}>
                    <Grid container justify="center" spacing={3} style={{ width: '100%', margin: '0px', padding: '10% 0px 10% 0px', display: 'flex', alignContent: 'center' }} >

                        <Grid className='itemPopUp-image' item xs={6} style={{ width: '100%', padding: '0px 20px ', boxSizing: 'initial' }} >
                            <Paper style={{ boxShadow: " 1px 1px 1px white", height: '100%', paddingtop: '10px' }} className={classes.paper}>
                                <img src={productInfo.product_image_url} alt={productInfo.product_name} height='100%' width='100%' style={{ objectFit: 'scale-down' }} />
                            </Paper>
                        </Grid>
                        <Grid className='product-info' item sm={5} style={{ padding: '0px 12px' }} >
                            <Paper style={{ height: '100%', color: 'black', boxShadow: " 1px 1px 1px white", paddingtop: '10px' }} className={classes.paper}>
                                <div>
                                    <Link to={`/store/${productInfo.store_id}`} style={{ textDecoration: 'none', color: 'black' }}>
                                        <p className="item-brand">{productInfo.brands_name}'s</p>
                                    </Link>
                                    <p className="item-name">{productInfo.product_name}</p>
                                    <p className="item-price">${productInfo.product_price}</p>
                                    <p className="item-color" >Color: {productInfo.colors_name}</p>
                                </div>

                                <div className='productQtySize'>
                                    <FormControl className={classes.margin}>
                                        <InputLabel htmlFor="native-select">Size</InputLabel>
                                        <NativeSelect
                                            style={{ backgroundColor: "#eed7c1" }}
                                            className='native-select'
                                            value={selectProduct.productSize}
                                            onChange={e => {
                                                let currSize = e.target.value
                                                setSelectProduct(prevState => {
                                                    return { ...prevState, productSize: currSize }
                                                })
                                            }}
                                            input={<BootstrapInput />}
                                        >
                                            <option value="default" autoFocus disabled >Choose a size</option>
                                            {productSizes.map(function (size, i) {
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
                                        value={selectProduct.productQty}
                                        onChange={e => {
                                            const currQty = e.target.value
                                            setSelectProduct(prevState => {
                                                return { ...prevState, productQty: currQty }
                                            })
                                        }}>
                                    </input>
                                </div>
                                <div className='submitButton'>

                                    <Button
                                        style={{ margin: "10px", borderRadius: 35, backgroundColor: "#eed7c1", padding: "10px 24px", fontSize: "16px" }}
                                        variant="contained"
                                        className="ItemInputSubmit" type="submit" value="ADD TO BAG"
                                        disabled={selectProduct.productSize === 'default'}
                                        onClick={addToCart}>ADD TO BAG </Button>
                                </div>


                                <div style={{
                                    display: 'flex', textAlign: 'left', flexDirection: 'column',
                                }}>

                                    <p className='itemPopup-materials'>
                                        Materials: {productInfo.material_name}
                                    </p>
                                    <p className='itemPopup-descript' >
                                        Description: {productInfo.product_description}
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







