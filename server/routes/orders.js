const express = require("express");
const router = express.Router();
const ordersQueries = require("../queries/ordersQueries");
const { loginRequired } = require('../auth/helpers')

// Add Order
router.post("/add", async (req, res, next) => {
  try {
    const {
      order_status,
      required_date,
      customer_id,
      store_id,
      courier_id,
      delivery_fee,
      total,
    } = req.body;
    const response = await ordersQueries.addOrder({
      order_status,
      required_date,
      customer_id,
      store_id,
      courier_id,
      delivery_fee,
      total,
    });
    res.status(200).json({
      status: "success",
      message: `Order id ${response.order_id} successfully registered`,
      payload: response,
    });
  } catch (err) {
    console.log("ERROR", err);
  }
});

// GET ORDER BY STORE ID
router.get("/store_orders/:store_id", async (req, res, next) => {
  try {
    const store_id = parseInt(req.params.store_id);
    const orderByStoreId = await ordersQueries.getOrderByStoreID(store_id);
    res.status(200).json({
      message: `Orders for store id ${store_id} retrieved.`,
      payload: orderByStoreId,
    });
  } catch (err) {
    console.log("ERROR", err);
  }
});

//GET ORDER BY CUSTOMER ID
router.get("/receipts/:customer_id", async (req, res, next) => {
  try {
    const customer_id = parseInt(req.params.customer_id);
    const orderByCustomerId = await ordersQueries.getOrderByCustomerId(customer_id);
    res.status(200).json({
      message: `Orders for customer id ${customer_id} retrieved.`,
      payload: orderByCustomerId,
      err: false
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({
      payload: null,
      message: "Failed retrieving receipts",
      err: true
    })
  }
});

//GET ORDER BY COURIER ID
router.get("/courier_orders/:courier_id", async (req, res, next) => {
  try {
    const courier_id = parseInt(req.params.courier_id);
    const orderByCourierId = await ordersQueries.getOrderByCourierId(
      courier_id
    );
    res.status(200).json({
      message: `Orders for courier id ${courier_id} retrieved.`,
      payload: orderByCourierId,
    });
  } catch (err) {
    console.log("ERROR", err);
  }
});

//GET ALL ORDER ITEMS by ORDER ID
router.get("/items/:order_id", async (req, res, next) => {
  try {
    const order_id = parseInt(req.params.order_id);
    const orderItems = await ordersQueries.getOrderItemsByOrderId(order_id);

    res.status(200).json({
      message: `All order items for order id ${order_id} retrieved. `,
      payload: orderItems
    });
  } catch (err) {
    console.log("ERROR", err);
  }
});

// UPDATE ORDER
router.patch("/update/:order_id", async (req, res, next) => {
  try {
    const order_id = parseInt(req.params.order_id);
    const orderUpdated = await ordersQueries.editOrder(order_id);

    res.status(200).json({
      message: `Order id ${order_id} updated sucessfully.`,
      payload: orderUpdated,
    });
  } catch (err) {
    console.log("ERROR", err);
  }
});

// DELETE ORDER
router.delete("/delete/:order_id", async (req, res, next) => {
  try {
    const order_id = parseInt(req.params.order_id);
    const orderDeleted = await ordersQueries.deleteOrder(order_id);

    res.status(200).json({
      message: `Order Id ${order_id}  deleted sucessfully.`,
      payload: orderDeleted,
    });
  } catch (err) {
    console.log("ERROR", err);
  }
});

module.exports = router;
