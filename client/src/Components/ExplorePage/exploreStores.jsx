// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import { makeStyles } from "@material-ui/core/styles";
// import GridList from "@material-ui/core/GridList";
// import GridListTile from "@material-ui/core/GridListTile";
// import GridListTileBar from "@material-ui/core/GridListTileBar";
// import IconButton from "@material-ui/core/IconButton";
// import StarBorderIcon from "@material-ui/icons/StarBorder";
// import PplCard from "./StoreCard";
// import SelectedCard from "./SelectedSearch";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     display: "flex",
//     flexWrap: "wrap",
//     justifyContent: "space-around",
//     overflow: "hidden",
//     backgroundColor: theme.palette.background.paper,
//     maxWidth: "500px",
//     maxHeight: "800px",
//   },
//   gridList: {
//     width: 730,
//     height: 850,
//     //flexWrap: "nowrap",
//     // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
//     transform: "translateZ(0)",
//   },
//   title: {
//     color: theme.palette.primary.light,
//   },
//   titleBar: {
//     background: "white",
//     //   'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
//   },
// }));

// export default function ExploreStores({ stores, value }) {
//   const classes = useStyles();

//   console.log("store coming from apply filter", stores);
//   console.log("value on explore page", value);
//   const [storess, setStoress] = useState([]);
//   const [oneStore, setOneStore] = useState([]); 

//   const fetchStores = async () => {
//     try {
//       const response = await axios.get(`/stores`);
//       setStoress(response.data.payload);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const applyValue = async (value)=> {
//     if (value != null){
//       try {
//         const response = await axios.get(`/stores/${value}`);
//         setOneStore(response.data.payload);
//         console.log('getting one store', oneStore);
//       } catch (err) {
//         console.log(err);
//       }
//     }
//     return oneStore
//   }

//   useEffect(() => {
//     const fetchData = async () => {
//       await fetchStores();
//       await applyValue()
//     };
//     fetchData();
//   }, []);

//   console.log("gridlist current stores", stores);


//   return (
//     <div className="App">
    
//     </div>
//   );
// }
