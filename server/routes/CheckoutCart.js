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


router.get('/session', async (req, res, next) => {
    const sessionId = req.session.id
    try {
        let allCheckoutCart = await checkoutQueries.getAllFromCartSession(sessionId)
        res.status(200).json({
            status: "success",
            message: 'All checkout cart recieved',
            payload: allCheckoutCart
        })
    } catch (err) {
        handleErrors(res, err);
    }
})


router.get("/items/productId/:productId/:size", async (req, res, next) => {
    try {
        const sessionId = req.session.id
        const { productId, size } = req.params
        const productFromCart = {
            product_id: parseInt(productId),
            size: size,
        }
        const getStoreId = await checkoutQueries.getStoreIdByProdId(parseInt(productId))

        const checkoutCartByProdId = await checkoutQueries.getProductFromCartSession(productFromCart, sessionId, getStoreId);
        res.status(200).json({
            status: "success",
            message: `Checkout Cart retrieved`,
            payload: checkoutCartByProdId
        });
    } catch (err) {
        handleErrors(res, err);
    }
});


router.get("/items/checkoutTotal", async (req, res, next) => {
    const sessionId = req.session.id
    try {
        let checkout = await checkoutQueries.getCheckoutCartBySessionId(sessionId)
        const checkoutTotalBySession = await checkoutQueries.getSumOfCheckout(checkout.checkout_cart_id);
        res.status(200).json({
            status: "success",
            message: `Checkout Cart Total retrieved`,
            payload: checkoutTotalBySession
        });
    } catch (err) {
        handleErrors(res, err);
    }
})



router.post("/items/add", async (req, res, next) => {
    try {
        const { product_id, size, quantity } = req.body;
        const sessionId = req.session.id
        const checkoutCart = {
            product_id: parseInt(product_id),
            size: size,
            quantity: parseInt(quantity),
            sessionId: req.session.id
        }
        const getStoreId = await checkoutQueries.getStoreIdByProdId(parseInt(product_id))
        const response = await checkoutQueries.addToCart(checkoutCart, sessionId, getStoreId.product_id);
        res.status(200).json({
            status: "success",
            message: `Checkout cart ${response.checkout_items_id} successfully added`,
            payload: response
        });
    } catch (err) {
        handleErrors(res, err);
    }
});



router.patch("/items/edit", async (req, res, next) => {
    try {
        const sessionId = req.session.id
        const checkoutItemsId = parseInt(req.params.checkoutItemsId)
        const { product_id, size, quantity } = req.body

        let checkout = await checkoutQueries.getCheckoutCartBySessionId(sessionId)
        let cartItems = {
            product_id: parseInt(product_id),
            size: size,
            quantity: parseInt(quantity),
            checkout_cart_id: checkout.checkout_cart_id
        }
        const updatedCart = await checkoutQueries.updatecheckoutItems(cartItems);

        res.status(200).json({
            status: "success",
            message: `Checkout ${checkoutItemsId} was edited`,
            payload: updatedCart
        });
    } catch (err) {
        handleErrors(res, err);
    }
});


router.delete("/items/delete/:id", async (req, res, next) => {

    try {
        const checkoutCart_id = parseInt(req.params.id)
        const deletedCart = await checkoutQueries.deleteCheckoutItemsCartByCartId(checkoutCart_id)

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
