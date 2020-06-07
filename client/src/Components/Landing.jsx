import React, { useState, useContext } from "react";
import { LandingContext } from "../Contexts/LandingPageDetailsContext";
import { landingStyles } from './styling/landingStyles';
import SingleLineGridListStores from "./LandingPageComponents/PopularStores.jsx";
import SingleLineGridListItems from "./LandingPageComponents/GeneralStores";
import Categories from "./LandingPageComponents/LandingPagecategories";
// import ProductsPage from "./ProductPage/productsPage";

const LandingPage = () => {
  const classes = landingStyles();
  const { latitude, longitude, SetLatitude, SetLongitude } = useContext(
    LandingContext
  );
  const [locationStatus, setLocationStatus] = useState(false);

  // Checks if Geolocation API is available on browser. This is only available on secure contexts (HTTPS).
  if ("geolocation" in navigator) {
   // console.log("Landing Page Notification: geolocation is available");
    // calls function get geolocation of client(user). Needs a call back- async.
    navigator.geolocation.getCurrentPosition((position) => {
      //position: a object that is returned with timestamp, lat/long coordinates of the user accessing carry, etc.
      //console.log(position)

      // keys into object position to return latitude value
      //console.log("Latitude", position.coords.latitude);

      // keys into object position to return longitude value
      //console.log("Longitude", position.coords.longitude);

      //Storing Latitude and Longitude values in Context.
      SetLatitude(position.coords.latitude);
      SetLongitude(position.coords.longitude);

      setLocationStatus(true);
    });
  } else {
    console.log("Geolocation IS NOT available");
  }

  return (
    <div className={classes.landingPage}>
      <div className={classes.mainContent}>
        <div className={classes.headerContainer}>
          <h1 className={classes.header}>
            {" "}
            Your favorite brands, delivered by Carry. {" "}
          </h1>{" "}
          <br></br>
        </div>
        <div className={classes.landingPageRows}>
          <div className="Categories">
            <Categories />
          </div>

          <div className={classes.popularItems}>
           {console.log('landing Page locationStatus', locationStatus)}
            {locationStatus ? (
              <SingleLineGridListStores
                latitude={latitude}
                longitude={longitude}
              />
            ) : (
              <SingleLineGridListItems />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
