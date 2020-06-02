const db = require('../database/db')

const getAll = async () => {
	const receipts = await db.any("SELECT * FROM receipts")
	return receipts;
}

const getAllCheckoutCart = async () => {
	const checkoutCart = await db.any("SELECT * FROM checkout_cart")
	return checkoutCart;
}

const getCheckoutCartById = async (checkout_id) => {
	const checkoutCart = await db.one("SELECT * FROM checkout_cart WHERE checkout_cart_id  = $1", checkout_id)
	return checkoutCart;
}

const getCheckoutCartBySessionId = async (session_id) => {
	const checkoutCart = await db.oneOrNone(`SELECT * FROM checkout_cart WHERE session_id = $1
	`, session_id)


	return checkoutCart;
}





const deleteCheckoutCartById = async (checkout_id) => {
	const checkout = await db.one("DELETE FROM checkout_cart WHERE checkout_cart_id = $1 RETURNING *", checkout_id)
	return checkout;
}

const saveReceipt = async (rec) => {
	const newReceiptQuery = 
	`
		INSERT INTO receipts(customer_id, reciept)
			VALUES($/customer_id/, $/reciept/)
			RETURNING *
	`
	const newNote = await db.one(newReceiptQuery, rec)
	return newNote;
}

const addCheckoutCart = async (obj) => {
	const addCheckoutCart = 
	`
		INSERT INTO checkout_cart(
			session_id, 
			store_id
			)
			VALUES(
				$/session_id/, 
				$/store_id/
				)
			RETURNING *
	`;

	
	
	const cart = await db.one(addCheckoutCart, obj)
	return cart;


}

const getReceiptsByCustomerId = async (customer_id) => {
	const receipts = await db.any("SELECT * FROM receipts WHERE customer_id = $1", [customer_id])
	return receipts;
}

const updateCheckoutCart = async (checkoutObj) => {
	const updateQuery = `
		UPDATE checkout_cart
		SET cart = $/cart/
			RETURNING *`
	return await db.one(updateQuery, checkoutObj)
}


module.exports = {
	getAll,
	addCheckoutCart,
	saveReceipt,
	getReceiptsByCustomerId,
	getAllCheckoutCart,
	getCheckoutCartById,
	getCheckoutCartBySessionId,
	deleteCheckoutCartById,
	updateCheckoutCart
}
