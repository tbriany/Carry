import React, { useState, Fragment } from 'react';
import { TextField } from '@material-ui/core';

const Review = () => {
    return (
        <Fragment>
            <TextField required variant='standard' label='Review'></TextField>
        </Fragment>
    )
};

export default Review;