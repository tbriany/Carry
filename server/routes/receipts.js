const express = require('express');
const router = express.Router();
const receiptsQueries = require('../queries/receiptsQueries')

const { loginRequired } = require('../auth/helpers')


router.get('/', loginRequired, async (req, res, next) => {
  try {
    let receipts = await receiptsQueries.getAll()
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

router.post('/', loginRequired, async (req, res, next) => {
  let receipt = {
    customer_id: req.user.id,
    ...req.body
  }


  try {
    let newReceipt = await receiptsQueries.saveReceipt(receipt)
    res.json({
      payload: newReceipt,
      msg: "Added new receipt",
      err: false
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({
      payload: null,
      msg: "Failed to add new receipt",
      err: true
    })
  }
});

router.post('/checkoutCart/:checkout_id/commit', loginRequired, async (req, res, next) => {
  const { checkout_id } = req.params
  try {
    let checkoutCart = await receiptsQueries.getCheckoutCartById(checkout_id)
    if (checkoutCart.session_id !== req.session.id) {
      return res.status(401).json({
        payload: null,
        msg: "Forbidden. Checkout does not belong to your session or checkout was created in a session other than the current session.",
        err: true
      })
    }

    let receipt = {
      customer_id: req.user.customer_id,
      reciept: checkout.cart
    }
    let newReceipt = await receiptsQueries.saveReceipt(receipt)


    res.json({
      payload: newReceipt,
      msg: "Committed/saved new reciept",
      err: false
    })


    await receiptsQueries.deleteCheckoutCartById(checkout_id)
  } catch (err) {
    console.log(err)
    res.status(500).json({
      payload: null,
      msg: "Failed to commit/save new checkout",
      err: true
    })
  }
});




router.post('/ ', async (req, res, next) => {
  console.log('session id:', req.session.id)
  let checkoutCart = {
    session_id: req.session.id,
    store_id:req.body.store_id
  }

  console.log('session_id KMDEIUHIHKj', req.session.id , req.body.store_id )
  // console.log(' store_id:req.body.store_id',   req.body.store_id)
  try {
    let checkout = await receiptsQueries.addCheckoutCart(checkoutCart)
    res.json({
      payload: checkout,
      msg: "Saved new cart",
      err: false
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({
      payload: null,
      msg: "Failed to save cart",
      err: true
    })
  }
});






router.get('/checkoutCart', async (req, res, next) => {
  const session_id = req.session.id
  try {
    console.log('session id:', req.session.id)
    let checkoutCart = await receiptsQueries.getCheckoutCartBySessionId(session_id)
    console.log("GET/checkouts ********", checkoutCart)
    res.json({
      session: req.session.id,
      payload: checkoutCart,
      msg: "Retrieved all checkout, for current session.",
      err: false
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({
      payload: null,
      msg: "Failed retrieving checkout",
      err: true
    })
  }
});


router.patch("/checkoutCart/edit/:checkout_id", async (req, res, next) => {
    try {
      const {checkout_id }= req.params
      const { cart} = req.body



      const checkoutCartUpdate = await receiptsQueries.updateCheckoutCart({checkout_id, cart});
  
      res.status(200).json({
        payload: checkoutCartUpdate,
        msg:`Checkout ${checkout_id} updated sucessfully.`,
        err: false
      });
    } catch (err) {
      console.log("ERROR", err);
      res.status(500).json({
        payload: null,
        msg: "Failed updating checkout",
        err: true
      })
    }
  });

module.exports = router;
