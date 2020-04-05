const db = require ('../database/db')

const getAllStores = async () =>{
    const getAllQueries = `
    SELECT * FROM stores
    `;
    return await db.any(getAllQueries)
}

module.exports = {
    getAllStores
};