import React, { useState, useEffect } from 'react';
import { Link, Route, useHistory } from 'react-router-dom';
import axios from 'axios'

import { makeStyles } from "@material-ui/core/styles";
import { Typography, CardContent, Paper, Grid, Card } from "@material-ui/core";
import Receipt from './Receipt'


const gridStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        height: '100%',
        boxShadow: " white 1px 1px 1px"
    },
}));


const cardStyles = makeStyles({
    root: {
        minWidth: 275,
        border: 'none',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    }
});




function Orders() {
    let [orders, setOrders] = useState({})
    const grid = gridStyles();
    const classes = cardStyles()
    const history = useHistory();


    useEffect(() => {
        const handleCustomerOrders = async () => {

            try {
                const getAllOrders = await axios.get(`/orders/receipts/${2}`)

                // const getAllOrders = await axios.get(`/orders/receipts/${state.user.info.customer_id}`)
                const orders = getAllOrders.data.payload
                setOrders(orders)
                console.log("ALL ORDERS", orders)

            } catch (err) {
                console.log("ERROR", err)
            }
        }
        handleCustomerOrders()
    }, [])


    return (
        
        <div style={{ height: '100vh', padding: '3% 6% 3% 6% ' }}>
            <h1 style={{
                fontWeight: 500, fontSize: '24px', lineHeight: '1.166667', fontFamily: 'Helvetica Neue ,Helvetica,Arial,sans-serif'
            }}>Orders</h1>

            <hr style={{ marginBottom: '20px', marginTop: '12px', height: "1px", border: 'none', boxShadow: '#FAEBD7 0px 1px 0px 0px inset', }} />
            <div style={{ height: 'auto', padding: '3% 8% 3% 8%' }}>

                {orders.length > 0 ? (<div>
                    {orders.map(function (order, i) {
                        return (
                            <div>
                                <hr style={{ marginBottom: '25px', marginTop: '25px', height: "1px", border: 'none', boxShadow: '#FAEBD7 0px 1px 0px 0px inset', }} />
                                <Card className={classes.root} variant="outlined" >


                                    <div className={classes.root}>
                                        <div >
                                            <Grid container spacing={3}>
                                                <Grid item xs={6}  >

                                                    <Paper className={grid.paper} style={{ height: '100%' }}>

                                                        {order.reciept.map(function (products, i) {
                                                            return (
                                                                <div>

                                                                    {/* <h2 style={{ color: "black" }}>{products.brands_name}'s {products.product_name}</h2> */}
                                                                    <img src={products.product_image_url} alt={products.product_name} height="100px"></img>
                                                                </div>
                                                            )
                                                        })}
                                                    </Paper>
                                                </Grid>



                                                <Grid item xs={6}  >
                                                    <Paper className={grid.paper} stlye={{ height: '100%', boxShadow: "white 1px 1px 1px" }}>
                                                        <p style={{ color: 'black ', display: 'flex', justifyContent: 'flex-start' }}> {order.order_status}</p>
                                                        <p style={{ color: 'black ', display: 'flex', justifyContent: 'flex-start' }}> Ordered: {order.time_ordered}</p>
                                                        <p style={{ color: 'black ', display: 'flex', justifyContent: 'flex-start' }}>Order #{order.order_id}</p>
                                                        < button variant="btn btn-success" onClick={() => history.push(`/orders/receipt/${order.order_id}`)}
                                                            style={{ display: 'flex', justifyContent: 'flex-start' }}>View Receipt</button>

                                                    </Paper>
                                                </Grid>
                                            </Grid>
                                        </div>
                                    </div>
                                </Card>
                            </div>

                        )
                    })
                    }



                </div>
                ) : (<div>
             
                 
                    <hr style={{ marginBottom: '25px', marginTop: '25px', height: "1px", border: 'none', boxShadow: '#FAEBD7 0px 1px 0px 0px inset', }} />
                           
                   
                    
                    
                    No Previous Orders</div>)
                }


            </div>






        </div>
    )
}

export default Orders;
