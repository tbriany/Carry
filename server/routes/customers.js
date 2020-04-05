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


router.post("/register", async (req, res, next) => {
    try {
        const { firstname, lastname, phone_number, email, address, city, state, zip_code, avatar_url, password} = req.body
        const response = await customerQueries.addCustomer({ firstname, lastname, phone_number, email, address, city, state, zip_code, avatar_url, password });
        res.json({
            status: "success",
            message: `${firstname} ${lastname} successfully registered`,
            payload: response
        });
    } catch (err) {
        console.log("ERROR", err)
    }
});


router.get("/:id", async (req, res, next) => {
    try {
        const id = parseInt(req.params.id)
        const customerById = await customerQueries.getCustomerById(id);
        res.json({
            status: "success",
            message: `Customer ${id} retrieved`,
            payload: customerById
        });
    } catch (err) {
        console.log("ERROR", err)
    }
});


router.patch("/edit/:id", async (req, res, next) => {
    try {
        const customer_id = req.params.id
        const { firstname, lastname, phone_number, email, address, city, state, zip_code, avatar_url, password} = req.body

        const updatedInfo = await customerQueries.updateCustomerInfo({ customer_id, firstname, lastname, phone_number, email, address, city, state, zip_code, avatar_url, password });
        res.json({
            status: "success",
            message: `customers profile was edited`,
            payload: updatedInfo
        });
    } catch (err) {
        console.log("ERROR", err)
    }
});


router.delete("/delete/:id", async (req, res, next) => {
    try {
        const customer_id = parseInt(req.params.id);
        const deletedCustomer = await customerQueries.deleteCustomer(customer_id);
        res.json({
            status: "success",
            message: `Customer ${customer_id} deleted`,
            payload: deletedCustomer
        });
    } catch (err) {
        console.log("ERROR", err)
    }
});


module.exports = router;