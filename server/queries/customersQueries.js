const db = require ('../database/db')

const getAllCustomers = async () =>{
    const getAllQueries = `
    SELECT * FROM customers
    `;
    return await db.any(getAllQueries)
}

module.exports = {
    getAllCustomers
};