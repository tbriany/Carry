const db = require('../database/db')

const getAll = async () => {
	const receipts = await db.any("SELECT * FROM receipts")
	return receipts;
}


const getreceiptByOrderId = async (order_id) => {
	const getQuery = `
	SELECT customers.city, customers.state, customers.zip_code,  customers.address, customers.firstname, customers.firstname,    customers.address, stores.stores_name, stores.store_logo, stores.address AS StoreAddress, stores.city AS storeCity,  stores.state AS storeState, stores.zip_code AS storeZipCode, 
	orders.order_id, orders.order_status, orders.required_date, orders.time_ordered,  orders.delivery_fee,  orders.total, receipts.reciept
	FROM orders  
	JOIN stores ON orders.store_id =stores.store_id
	JOIN customers ON orders.customer_id =  customers.customer_id
	JOIN receipts ON orders.receipt_id = receipts.receipt_id 
	WHERE orders.order_id =$/order_id/
	`;
	return await db.any(getQuery, { order_id });
  };

  
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
	getAll,
	getreceiptByOrderId
}
