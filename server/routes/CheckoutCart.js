const express = require('express');
const router = express.Router();
const checkoutQueries = require('../queries/checkoutCartQueries')
const { handleErrors } = require('../helpers/helpers')

router.get('/', async (req, res, next) => {
    try {
        let allCheckoutCart = await checkoutQueries.getAllFromCart()
        res.status(200).json({
            status: "success",
            message: 'All checkout cart recieved',
            payload: allCheckoutCart
        })
    } catch (err) {
        handleErrors(res, err);
    }
})

router.get("/productId/:productId", async (req, res, next) => {
    try {
        const productId = parseInt(req.params.productId)
        const checkoutCartByProdId = await checkoutQueries.getProductIdFromCart(productId);
        res.status(200).json({
            status: "success",
            message: `Checkout Cart ${checkoutCartByProdId.checkoutcart_id} retrieved`,
            payload: checkoutCartByProdId
        });
    } catch (err) {
        handleErrors(res, err);
    }
});

router.get("/checkoutTotal", async (req, res, next) => {
    try {
        const checkoutTotal = await checkoutQueries.getSumOfCheckout();
        res.status(200).json({
            status: "success",
            message: `Checkout Cart Total retrieved`,
            payload: checkoutTotal
        });
    } catch (err) {
        handleErrors(res, err);
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
        handleErrors(t, err);
    }
});



router.post("/add", async (req, res, next) => {
    try {
        const { product_id, size, quantity } = req.body;
        const response = await checkoutQueries.addToCart({ product_id, size, quantity });

        res.status(200).json({
            status: "success",
            message: `Checkout cart ${response.checkoutCart_id} successfully added`,
            payload: response
        });
    } catch (err) {
        handleErrors(res, err);
    }
});

router.patch("/edit/:checkoutCart_id", async (req, res, next) => {
    try {
        const checkoutCart_id = parseInt(req.params.checkoutCart_id)
        const { product_id, size, quantity } = req.body
        const updatedCart = await checkoutQueries.updateCheckoutCart({ product_id, size, quantity, checkoutCart_id });

        res.status(200).json({
            status: "success",
            message: `Checkout ${checkoutCart_id} was edited`,
            payload: updatedCart
        });
    } catch (err) {
        handleErrors(res, err);
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
        handleErrors(res, err);
    }
})
module.exports = router;
