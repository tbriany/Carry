const express = require('express');
const router = express.Router();
const storesQueries = require('../queries/storesQueries')

router.get('/', async(req, res, next) =>{
    try{
        let stores = await storesQueries.getAllStores()
        res.json({
            status: "success",
            message: 'All stores recieved',
            payload: stores
        })
    }catch(err){
        console.log("ERROR retrieving all stores", err);
    }
})

router.get("/:id", async (req, res, next) => {
    try {
        const id = parseInt(req.params.id)
        const storeById = await storesQueries.getStoreById(id);
        res.json({
            status: "success",
            message: `Store ${id} retrieved`,
            payload: storeById
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
        res.json({
            status: "success",
            message: `Stores profile was edited`,
            payload: updatedInfo
        });
    } catch (err) {
        console.log("ERROR", err)
    }
  });

module.exports = router;