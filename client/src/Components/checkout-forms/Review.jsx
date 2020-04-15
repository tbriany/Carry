import React, { useState, Fragment } from 'react';
import { TextField } from '@material-ui/core';

const Review = () => {
    return (
        <Fragment>
            <TextField required variant='outlined' label='Review'></TextField>
        </Fragment>
    )
};

export default Review;