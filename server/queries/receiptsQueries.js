const db = require('../database/db')

const getAll = async () => {
	const receipts = await db.any("SELECT * FROM receipts")
	return receipts;
}

const getAllCheckout = async () => {
	const checkout = await db.any("SELECT * FROM checkouts")
	return checkout;
}

const getCheckoutById = async (checkout_id) => {
	const checkout = await db.one("SELECT * FROM checkouts WHERE checkout_id  = $1", checkout_id)
	return checkout;
}

const getCheckoutBySessionId = async (session_id) => {
	const checkout = await db.any("SELECT * FROM checkouts WHERE session_id = $1", session_id)
	return checkout;
}

const deleteCheckoutById = async (checkout_id) => {
	const checkout = await db.one("DELETE FROM checkouts WHERE checkout_id = $1 RETURNING *", checkout_id)
	return checkout;
}

const saveReceipt = async (rec) => {
	const newReceiptQuery = `
		INSERT INTO receipts(customer_id, reciept)
			VALUES($/customer_id/, $/reciept/)
			RETURNING *
	`
	const newNote = await db.one(newReceiptQuery, rec)
	return newNote;
}

const saveCheckout = async (cart) => {
	const newCheckoutQuery = `
		INSERT INTO checkouts(session_id, cart)
			VALUES($/session_id/, $/cart/)
			RETURNING *
	`
	const newCheckout = await db.one(newCheckoutQuery, cart)
	return newCheckout
}

const getReceiptsByCustomerId = async (customer_id) => {
	const receipts = await db.any("SELECT * FROM receipts WHERE customer_id = $1", [customer_id])
	return receipts;
}

const updateCheckout = async (checkoutObj) => {
	const updateQuery = `
		UPDATE checkouts
		SET cart = $/cart/
			RETURNING *`

	return await db.one(updateQuery,  checkoutObj )
}


module.exports = {
	getAll,
	saveCheckout,
	saveReceipt,
	getReceiptsByCustomerId,
	getAllCheckout,
	getCheckoutById,
	getCheckoutBySessionId,
	deleteCheckoutById,
	updateCheckout
}
