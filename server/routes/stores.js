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
<<<<<<< HEAD
            message: `Store ${response.store_id} successfully registered`,
=======
            message: `${store_name} successfully registered`,
>>>>>>> cedc8b59c768aff5613414c763e21de111168def
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
<<<<<<< HEAD

        res.status(200).json({
            status: "success",
            message: `Store ${store_id} profile was edited`,
=======
        res.json({
            status: "success",
            message: `${store_name}'s profile was updated.`,
>>>>>>> cedc8b59c768aff5613414c763e21de111168def
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

<<<<<<< HEAD
        res.status(200).json({
            status: 'success', 
=======
        res.json({
            status: "success", 
>>>>>>> cedc8b59c768aff5613414c763e21de111168def
            message: `store ${store_id} deleted`,
            payload: deletedStore
        })
    }catch(err){
        console.log("ERROR deleting store", err)
    }
})
module.exports = router;
