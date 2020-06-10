import React, {useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import LandingContext from '../../Contexts/LandingPageDetailsContext'

const useStyles = makeStyles({
  root: {
    width: 300,
  },
});

function valuetext(value) {
  return `${value} km`;
}

export default function 
DiscreteSlider() {

  const classes = useStyles();

  return (
    <div className={classes.root}
    style={{margin:'20px'}}>
      {/* <Typography id="discrete-slider-small-steps" gutterBottom>
       Browse By Distance
      </Typography> */}
      <h2   style={{
              fontFamily: "Palatino Linotype", 
              color: '#CD853F'
            }}> Browse By Distance</h2>
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