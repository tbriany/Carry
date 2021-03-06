const express = require('express');
const router = express.Router();
const storesQueries = require('../queries/storesQueries')

router.get('/', async(req, res, next) =>{
    try{
        let allStores = await storesQueries.getAllStores()

        res.status(200).json({
            status: "success",
            message: 'All stores recieved',
            payload: allStores
        })
    }catch(err){
        console.log("ERROR", err);
    }
})

router.get("/:id", async (req, res, next) => {
    try {
        const id = parseInt(req.params.id)
        const storeById = await storesQueries.getStoreById(id);

        res.status(200).json({
            status: "success",
            message: `Store ${id} retrieved`,
            payload: storeById
        });
    } catch (err) {
        console.log("ERROR", err)
        }
});



router.post("/register", async (req, res, next) => {
    try {
        const { store_name, avatar_url, phone_number, email, address, city, state, zip_code, password } = req.body;
        
        const response = await storesQueries.addStore({ store_name, avatar_url, phone_number, email, address, city, state, zip_code, password });

        res.status(200).json({
            status: "success",
            message: `Store ${response.store_id} successfully registered`,
            payload: response
        });
    } catch (err) {
        console.log("ERROR", err)
    }
});

router.patch("/edit/:id", async (req, res, next) => {
    try {
        const store_id = req.params.id;
        const { store_name, avatar_url, phone_number, email, address, city, state, zip_code, password } = req.body
  
        const updatedInfo = await storesQueries.updateStoreInfo({ store_id, store_name, avatar_url, phone_number, email, address, city, state, zip_code, password });

        res.status(200).json({
            status: "success",
            message: `Store ${store_id} profile was edited`,
            payload: updatedInfo
        });
    } catch (err) {
        console.log("ERROR", err)
    }
  });

router.delete("/delete/:id", async (req, res, next) =>{
    try{
        const store_id = parseInt(req.params.id)
        const deletedStore = await storesQueries.deleteStore(store_id)

        res.status(200).json({
            status: 'success', 
            message: `store ${store_id} deleted`,
            payload: deletedStore
        })
    }catch(err){
        console.log("ERROR deleting store", err)
    }
})


router.get("/location/:latitude/:longitude", async (req, res, next) => {
    try {
        const user_latitude = parseFloat(req.params.latitude)
        const user_longitude = parseFloat(req.params.longitude)
        const storeByLocation = await storesQueries.getStoresByLocation(user_latitude, user_longitude);
        res.status(200).json({
            status: "success",
            message: `Store within users ${user_latitude}
            ${user_longitude} retrieved`,
            payload: storeByLocation
        });
    } catch (err) {
        console.log("ERROR", err)
        }
});

router.get("/city/:city", async (req, res, next) => {
    try {
        const city = (req.params.city)
        const storeByCity = await storesQueries.getAllStoresByCity(city);

        res.status(200).json({
            status: "success",
            message: `Store ${city} retrieved`,
            payload: storeByCity
        });
    } catch (err) {
        console.log("ERROR not able to get store by City", err)
        }
});


module.exports = router;
