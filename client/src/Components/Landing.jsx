import React, { useState, use } from "react";
import axios from "axios";
import { Link, Route, Switch } from "react-router-dom";
import { OutlinedInput, Button } from "@material-ui/core";
import SingleLineGridList from "./PopularStores.jsx";
import SingleLineGridListItems from "./PopularItems";
import Categories from "./LandingPagecategories";
import { useEffect } from "react";

const LandingPage = () => {
  // storing zipCode being entered. 
  const [zipCode, setZipCode] = useState("");
  // when first log in zipcode is not entered. 
  const [zipCodeEntered, setZipCodeEntered] = useState(false)
  // store stores with zipcode entered. 
  const [stores, setStores] = useState([]);


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
  
// console.log(stores)


  return (
    <div className="LandingPage" style={{ marginTop: "30px" }}>
      <div
        className="mainContent"
        style={{ marginTop: "50px", marginLeft: "45px", marginRight: "45px" }}
      >
        <div className="zipCode" style={{ textAlign: "center" }}>
          <h1 style={{ fontFamily: "Palatino Linotype" }}>
            {" "}
            Start shopping TODAY{" "}
          </h1>{" "}
          
          <form >
            <OutlinedInput
              value={zipCode}
              label="zipCode"
              placeholder="Enter zipcode"
            />
            <Button
              type="submit"
              value="submit"
              variant="contained"
              size="large"
            >
              Submit
            </Button>
          </form>
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
}

export default LandingPage;
