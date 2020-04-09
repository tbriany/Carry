const express = require('express');
const router = express.Router();
const couriersQueries = require('../queries/couriersQueries')
const { handleErrors } = require('../helpers/helpers');


router.get("/:id", async (req, res, next) => {
    try {
        const courier_id = parseInt(req.params.id);
        const courierById = await couriersQueries.getCourierById(courier_id);

        res.status(200).json({
            status: "success",
            message: `Courier ${courier_id} retrieved`,
            payload: courierById
        });
    } catch (err) {
        handleErrors(res, err)
    }
});


router.post("/register", async (req, res, next) => {
    try {
        const { firstname, lastname, phone_number, email, avatar_url, password, mode_of_transportation } = req.body;
        const newCourier = await couriersQueries.addCourier({ firstname, lastname, phone_number, email, avatar_url, password, mode_of_transportation });

        res.status(200).json({
            status: "success",
            message: `Courier ${newCourier.courier_id} successfully registered`,
            payload: newCourier
        });
    } catch (err) {
        handleErrors(res, err)
    }
});


router.patch("/edit/:id", async (req, res, next) => {
    try {
        const courier_id = parseInt(req.params.id);
        const { firstname, lastname, phone_number, email, avatar_url, password, mode_of_transportation } = req.body;

        const updatedInfo = await couriersQueries.updateCourierInfo({ courier_id, firstname, lastname, phone_number, email, avatar_url, password, mode_of_transportation });
        res.status(200).json({
            status: "success",
            message: `Courier ${courier_id} was edited`,
            payload: updatedInfo
        });
    } catch (err) {
        handleErrors(res, err)
    }
});


router.delete("/delete/:id", async (req, res, next) => {
    try {
        const courier_id = parseInt(req.params.id);
        const deletedCourier = await couriersQueries.deleteCourier(courier_id);
        res.status(200).json({
            status: "success",
            message: `Courier ${courier_id} deleted`,
            payload: deletedCourier
        });
    } catch (err) {
        handleErrors(res, err)
    }
});


module.exports = router;
