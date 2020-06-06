import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles({
  root: {
    width: 300,
  },
});

function valuetext(value) {
  return `${value} km`;
}

export default function DiscreteSlider() {
  const classes = useStyles();

  return (
    <div className={classes.root}
    style={{margin:'20px'}}>
      <Typography id="discrete-slider-small-steps" gutterBottom>
        Distance? 
      </Typography>
      <Slider
        defaultValue={20}
        getAriaValueText={valuetext}
        aria-labelledby="discrete-slider-small-steps"
        step={5}
        marks
        min={10}
        max={30}
        valueLabelDisplay="auto"
      />
    </div>
  );
}