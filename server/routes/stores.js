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



module.exports = router;