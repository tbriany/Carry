import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, Route, Switch } from "react-router-dom";
import { OutlinedInput, Button } from "@material-ui/core";
import SingleLineGridList from "./LandingPageComponents/PopularStores.jsx";
import SingleLineGridListItems from "./LandingPageComponents/PopularItems";
import Categories from "./LandingPageComponents/LandingPagecategories";

const LandingPage = () => {
  // // storing zipCode being entered.
  // const [zipCode, setZipCode] = useState("");
  // // when first log in zipcode is not entered.
  // const [zipCodeEntered, setZipCodeEntered] = useState(false)
  // // store stores with zipcode entered.
  // const [stores, setStores] = useState([]);

  // //grab zipcode.
  // const handleZipCode = (event) => {
  //   setZipCode(event.target.value);
  // };

  //
  // const HandleOnSubmit = (event) => {
  //   setZipCodeEntered(true);
  //   event.preventDefault();
  //     alert("zipcode was entered")
  //   }

  //   if (zipCodeEntered !== false){ useEffect(() => {
  //     axios.get(`stores/location/${zipCode}`)
  //       .then((res) => {
  //         console.log(res);
  //         setStores(res.data.playload);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   }, [])
  // }


  // trying to write function to get geolocation 
  // function showLocation(position) {
  //   const latitude = position.coords.latitude;
  //   const longitude = position.coords.longitude;
  //   alert("Latitude : " + latitude + " Longitude: " + longitude);
  // }

  // function errorHandler(err) {
  //   if (err.code == 1) {
  //     alert("Error: Access is denied!");
  //   } else if (err.code == 2) {
  //     alert("Error: Position is unavailable!");
  //   }
  // }

  // function getLocation() {
  //   if (navigator.geolocation) {
  //     // timeout at 60000 milliseconds (60 seconds)
  //     var options = { timeout: 60000 };
  //     navigator.geolocation.getCurrentPosition(
  //       showLocation,
  //       errorHandler,
  //       options
  //     );
  //   } else {
  //     alert("Sorry, browser does not support geolocation!");
  //   }
  // }

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

        <div className="catergories" style={{ margin: "30px" }}>
          <div>
            <Categories />
          </div>

          {/* <div className="popularStores" style ={{marginTop: '50px'}}>
            <h3
              style={{ textAlign: "left", fontSize: "20px", color: "black" }}
            >
              {" "}
              Popular Stores Near you:{" "}
            </h3>
            <SingleLineGridList />
          </div> */}

          <div className="popularItems" style={{ marginTop: "50px" }}>
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
      <div
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
      </div>
    </div>
  );
};

export default LandingPage;
