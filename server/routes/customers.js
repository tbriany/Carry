const express = require('express');
const router = express.Router();
const customerQueries = require('../queries/customersQueries')


router.post("/register", async (req, res, next) => {
    try {
        const { firstname, lastname, phone_number, email, address, city, state, zip_code, avatar_url, password } = req.body;
        const response = await customerQueries.addCustomer({ firstname, lastname, phone_number, email, address, city, state, zip_code, avatar_url, password });
        res.status(200).json({
            status: "success",
            message: `Customer ${response.customer_id} successfully registered`,
            payload: response
        });
    } catch (err) {
        console.log("ERROR", err)
    }
});


router.get("/:id", async (req, res, next) => {
    try {
        const customer_id = parseInt(req.params.id);
        const customerById = await customerQueries.getCustomerById(customer_id);
        res.status(200).json({
            status: "success",
            message: `Customer ${customer_id} retrieved`,
            payload: customerById
        });
    } catch (err) {
        console.log("ERROR", err)
    }
});


router.patch("/edit/:id", async (req, res, next) => {
    try {
        const customer_id = parseInt(req.params.id);
        const { firstname, lastname, phone_number, email, address, city, state, zip_code, avatar_url, password } = req.body

        const updatedInfo = await customerQueries.updateCustomerInfo({ customer_id, firstname, lastname, phone_number, email, address, city, state, zip_code, avatar_url, password });
        res.status(200).json({
            status: "success",
            message: `Customer ${customer_id} was edited`,
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
        res.status(200).json({
            status: "success",
            message: `Customer ${customer_id} was deleted`,
            payload: deletedCustomer
        });
    } catch (err) {
        console.log("ERROR", err)
    }
});


module.exports = router;
