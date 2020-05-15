import React, { useState, Fragment } from 'react';
// import { TextField } from '@material-ui/core';

const Review = () => {
    return (

        <div >
            <div className='shipping' style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <input type="radio" className='rush' name='shipping'>
                </input>
                <label htmlFor="rush">Rush Delivery: $15
 <p>Recieve Items in less than 3 hours</p>
                </label>
            </div>

            <div className='shipping' style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <input type="radio" className='standard' name='shipping'>
                </input>
                <label htmlFor="standard">End of Day Delivery: $10
 <p>Recieve Items by the 9pm</p>
                </label>
            </div>

            <div className='shipping' style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <input type="radio" className='standard' name='shipping'>
                </input>
                <label htmlFor="standard">Next Day Delivery: $5
 <p>Recieve items tomorrow</p>
                </label>
            </div>





        </div>

    )
};

export default Review;