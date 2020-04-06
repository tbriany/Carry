const db = require("../database/db");

const getAllStores = async () => {
  const getAllQueries = `
    SELECT * FROM stores
    `;
  return await db.any(getAllQueries);
};

const getStoreById = async (id) => {
  const getQuery = `
  SELECT  store_name,
          avatar_url,
          phone_number,
          email,
          address,
          city,
          state,
          zip_code,
          password
      FROM stores
      WHERE store_id = $/id/;
    `;
  return await db.one(getQuery, { id });
}

module.exports = {
  getAllStores, getStoreById
};