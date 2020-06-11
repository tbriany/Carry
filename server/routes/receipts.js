const express = require('express');
const router = express.Router();
const { deleteCheckoutCartById, deleteCheckoutItemByCart, getAllFromCartSession, getCheckoutCartById } = require('../queries/checkoutCartQueries')
const { loginRequired } = require('../auth/helpers')
const { addReceipt, getAll } = require('../queries/receiptsQueries')
const { addOrder } = require('../queries/ordersQueries')
const { updateProductQty } = require('../queries/productsQueries')


router.get('/', async (req, res, next) => {
  try {
    let receipts = await getAll()
    res.json({
      payload: receipts,
      msg: "Retrieved all receipts",
      err: false
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({
      payload: null,
      msg: "Failed retrieving receipts",
      err: true
    })
  }
});



// Saves the checkoutcart items into receipts table, Delete the items in the checkoutcart and update the order table
router.post('/checkoutCart/:checkoutItemsId/commit', loginRequired, async (req, res, next) => {
  const { checkoutItemsId } = req.params
  const { order_status, required_date, courier_id, delivery_fee, total, phone_number, address, city, state, zip_code } = req.body

  try {
    let checkoutCart = await getCheckoutCartById(checkoutItemsId)
    if (checkoutCart.session_id !== req.session.id) {
      return res.status(401).json({
        payload: null,
        message: "Forbidden. Checkout does not belong to your session or checkout was created in a session other than the current session.",
        err: true
      })
    }
    let getAllCheckoutItems = await getAllFromCartSession(checkoutCart.session_id)
    let receipt = {
      customer_id: req.user.customer_id,
      reciept: JSON.stringify(getAllCheckoutItems)
    }
    let allItemsInCart = getAllCheckoutItems
    //UPDATE  the quantity in the database
    await Promise.all(
      allItemsInCart.map(product => {
        updateProductQty(product.product_id, product.size, product.cartquantity)
      })

    );


    let newReceipt = await addReceipt(receipt)
    let createOrder = {
      order_status: order_status,
      required_date: required_date,
      receipt_id: newReceipt.receipt_id,
      customer_id: req.user.customer_id,
      store_id: checkoutCart.store_id,
      courier_id: courier_id,
      delivery_fee: delivery_fee,
      total: total
    }


    const updateCustomerInfo = {
      phone_number: phone_number,
      address: address,
      city: city,
      state: state,
      zip_code: zip_code,
      customer_id: req.user.customer_id,
    }
    await addOrder(createOrder, updateCustomerInfo)
    await deleteCheckoutItemByCart(checkoutItemsId)
    res.json({
      payload: newReceipt.reciept,
      message: "checkout saved into receipt and checkout cart cleared",
      err: false
    })

  } catch (err) {
    console.log(err)
    res.status(500).json({
      payload: null,
      message: "Failed to save checkout cart to receipt ",
      err: true
    })
  }
});


module.exports = router;
