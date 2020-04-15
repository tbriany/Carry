import React from "react";
import { Link, Route, Switch } from "react-router-dom";

import SingleLineGridList from "./PopularStores.jsx";
import SingleLineGridListItems from "./PopularItems";

const landingPage = () => {
  return (
    <div className="LandingPage" style={{ marginTop: "30px" }}>

      <div className="mainContent" style={{ marginTop: "50px" }}>
        <div className="catergories" style={{ marginTop: "30px" }}>
          <div className = 'popularStores'>
            <h3
              style={{ textAlign: "left", fontSize: "20px", color: "#d9b382" }}
            >
              {" "}
              Popular Stores Near you:{" "}
            </h3>
            <SingleLineGridList />
          </div>
        </div>

        <div classname = 'popularItems' style={{ marginTop: "50px" }}>
          <h3 style={{ textAlign: "left", fontSize: "20px", color: "#d9b382" }}>
            {" "}
            Check out what these stores Carry:{" "}
          </h3>
          <SingleLineGridListItems />
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
          backgroundColor: "#f5e9dc",
          color: "white",
          textAlign: "center",
        }}
      >
        <Link to="/SignUp" style={{ color: "white" }}>
          {" "}
          SignUp As a Courier
        </Link>
      </div>
    </div>
  );
};

export default landingPage;
