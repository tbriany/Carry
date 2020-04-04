const express = require('express');
const router = express.Router();
const customerQueries = require('../queries/customersQueries')

router.get('/', async(req, res, next) =>{
    try{
        let customers = await customerQueries.getAllCustomers()
        res.json({
            status: "success",
            message: 'All customers recieved',
            payload: customers
        })
    }catch(err){
        console.log("ERROR", err);
    }
})



module.exports = router;