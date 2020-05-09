const express = require('express');
const router = express.Router();
const checkoutQueries = require('../queries/checkoutCartQueries')

router.get('/', async (req, res, next) => {
    try {
        let allCheckoutCart = await checkoutQueries.getAllFromCart()
        res.status(200).json({
            status: "success",
            message: 'All checkout cart recieved',
            payload: allCheckoutCart
        })
    } catch (err) {
        console.log("ERROR", err);
    }
})


router.get("/checkoutTotal", async(req,res,next) =>{
    try {
        const checkoutTotal = await checkoutQueries.getSumOfCheckout();
        res.status(200).json({
            status: "success",
            message: `Checkout Cart Total retrieved`,
            payload: checkoutTotal
        });
    } catch (err) {
        console.log("ERROR", err)
    }

})
router.get("/:id", async (req, res, next) => {
    try {
        const id = parseInt(req.params.id)
        const checkoutCartById = await checkoutQueries.getCheckoutCartId(id);

        res.status(200).json({
            status: "success",
            message: `Checkout Cart ${checkoutCartById} retrieved`,
            payload: checkoutCartById
        });
    } catch (err) {
        console.log("ERROR", err)
    }
});



router.post("/add", async (req, res, next) => {
    try {
        const { product_id, size, quantity, totalPrice } = req.body;
        const response = await checkoutQueries.addToCart({ product_id, size, quantity, totalPrice });

        res.status(200).json({
            status: "success",
            message: `Checkout cart ${response.checkoutCart_id} successfully added`,
            payload: response
        });
    } catch (err) {
        console.log("ERROR", err)
    }
});

router.patch("/edit/:id", async (req, res, next) => {
    try {
        const checkoutCart_id = req.params.id;
        const { product_id,  size , quantity, totalPrice} = req.body

        const updatedCart = await checkoutQueries.updateCheckoutCart({ checkoutCart_id, product_id,  size , quantity, totalPrice });

        res.status(200).json({
            status: "success",
            message: `Checkout ${checkoutCart_id} was edited`,
            payload: updatedCart
        });
    } catch (err) {
        console.log("ERROR", err)
    }
});

router.delete("/delete/:id", async (req, res, next) => {
    try {
        const checkoutCart_id = parseInt(req.params.id)
        const deletedCart = await checkoutQueries.deleteCheckout(checkoutCart_id)

        res.status(200).json({
            status: 'success',
            message: `Checkout ${checkoutCart_id} deleted`,
            payload: deletedCart
        })
    } catch (err) {
        console.log("ERROR", err)
    }
})
module.exports = router;
