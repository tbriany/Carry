const db = require('../database/db')

const getAll = async () => {
	const receipts = await db.any("SELECT * FROM receipts")
	return receipts;
}


const addReceipt = async (rec) => {
	const newReceiptQuery =
		`
		INSERT INTO receipts(customer_id, reciept)
			VALUES($/customer_id/, $/reciept/)
			RETURNING reciept, receipt_id
	`
	const newNote = await db.one(newReceiptQuery, rec)
	return newNote;
}

const getReceiptsByCustomerId = async (customer_id) => {
	const receipts = await db.any("SELECT * FROM receipts WHERE customer_id = $1", [customer_id])
	return receipts;
}

module.exports = {
	addReceipt,
	getReceiptsByCustomerId,
	getAll
}
