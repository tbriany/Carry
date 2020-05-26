import React, { useState, Fragment } from 'react';
// import { TextField } from '@material-ui/core';

const Review = ({ getShipping, shippingOption }) => {
    return (
        <div >
            <div className='shipping' style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <input type="radio" className='rush' name='shipping' value={15}
                    checked={shippingOption === 15}
                    onChange={() => {
                        getShipping(15)
                    }}>
                </input >
                <label style={{ textAlign: 'justify' }} htmlFor="rush">Rush Delivery: $15
                <p>Recieve Items in less than 3 hours</p>
                </label>
            </div>

            <div className='shipping' style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <input type="radio" className='standard' name='shipping' value={10}
                    checked={shippingOption === 10}
                    onChange={() => {
                        getShipping(10)
                    }}>
                </input>
                <label htmlFor="standard">End of Day Delivery: $10
                <p>Recieve Items by 9pm</p>
                </label>
            </div>

            <div className='shipping' style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <input type="radio" className='standard' name='shipping' value={5}
                    checked={shippingOption === 5}
                    onChange={() => {
                        getShipping(5)
                    }}>
                </input>
                <label htmlFor="standard">Next Day Delivery: $5
                <p>Recieve items tomorrow</p>
                </label>
            </div>





        </div>

    )
};

export default Review;