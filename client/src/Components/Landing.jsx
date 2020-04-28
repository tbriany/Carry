import React, { useState, useEffect } from "react";
import axios from "axios";

import SingleLineGridList from "./LandingPageComponents/PopularStores.jsx";
import SingleLineGridListItems from "./LandingPageComponents/PopularItems";
import Categories from "./LandingPageComponents/LandingPagecategories";

const LandingPage = () => {
  // Checks if Geolocation API is available on browser. This is only available on secure contexts (HTTPS).
  if ("geolocation" in navigator) {
    console.log("Landing Page Notification: geolocation is available");
    // calls function get geolocation of client(user). Needs a call back- async.
    navigator.geolocation.getCurrentPosition((position) => {
      //position: a object that is returned with timestamp, lat/long coordinates of the user accessing carry, etc. 
      //console.log(position)

      // keys into object position to return latitude value 
      const lat = position.coords.latitude
      console.log( "Latitude", position.coords.latitude);


      // keys into object position to return longitude value
      const lon = position.coords.longitude
      console.log("Longitude", position.coords.longitude);

      const coordinates = {lat, lon}
      console.log(coordinates)

    });
  } else {
    console.log("geolocation IS NOT available");
  }

  return (
    <div className="LandingPage" style={{ marginTop: "30px" }}>
      <div
        className="mainContent"
        style={{ marginTop: "50px", marginLeft: "45px", marginRight: "45px" }}
      >
        {/* <div className="Testing">
          <form>
            <input type="button" />
          </form>
        </div> */}

        <div className="zipCode" style={{ textAlign: "center" }}>
          <h1 style={{ fontFamily: "Palatino Linotype" }}>
            {" "}
            Start shopping TODAY{" "}
          </h1>{" "}
          {/* <form>
            <OutlinedInput label="zipCode" placeholder="Enter zipcode" />
            <Button
              type="submit"
              value="submit"
              variant="contained"
              size="large"
            >
              Enter
            </Button>
          </form> */}
        </div>

        <div className="LandingPageRows" style={{ margin: "30px" }}>
          <div className="Categories">
            <Categories />
          </div>

          <div className="PopularItems" style={{ marginTop: "50px" }}>
            <h3
              style={{
                fontFamily: "Palatino Linotype",
                textAlign: "left",
                fontSize: "20px",
                color: "black",
              }}
            >
              {" "}
              Check out what these stores Carry:{" "}
            </h3>
            <SingleLineGridListItems />
          </div>
        </div>
      </div>

      {/* <div
        className="footer"
        style={{
          border: "10px",
          padding: "10px",
          bottom: "0",
          position: "fixed",
          width: "100%",
          backgroundColor: "#white",
          color: "white",
          textAlign: "center",
          boxShadow: "black",
        }}
      >
        <Link to="/SignUp" style={{ color: "black" }}>
          {" "}
          SignUp As a Courier
        </Link>
      </div> */}
    </div>
  );
};

export default LandingPage;
