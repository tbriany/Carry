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
      FROM stores
      WHERE store_id = $/id/;
    `;
  return await db.one(getQuery, { id });
}

const addStore = async (bodyObj) => {
  const postQuery = `
      INSERT INTO stores (
          store_name,
          avatar_url,
          phone_number,
          email,
          address,
          city,
          state,
          zip_code,
          password
      )
      VALUES (
          $/store_name/,
          $/avatar_url/,
          $/phone_number/,
          $/email/,
          $/address/,
          $/city/,
          $/state/,
          $/zip_code/,
          $/password/
      )
      RETURNING 
          store_id,
          store_name,
          avatar_url
          phone_number,
          email,
          address,
          city,
          state,
          zip_code
   `;
  return await db.one(postQuery, bodyObj);
}

const updateStoreInfo = async (updateObj) => {
  let updateQuery = `
      UPDATE stores
      SET store_name = $/store_name/,
          avatar_url = $/avatar_url/,
          phone_number = $/phone_number/,
          email = $/email/,
          address = $/address/,
          city = $/city/,
          state = $/state/,
          zip_code = $/zip_code/,
          password = $/password/
          WHERE store_id = $/store_id/
          RETURNING *
      ;
  `;
  return await db.one(updateQuery, updateObj);
}

const deleteStore = async (id) =>{
  const deleteQuery = `
  DELETE FROM stores
  WHERE store_id = $/id/`; 

  return await db.none(deleteQuery, {id});
};

module.exports = {
  getAllStores, getStoreById, addStore, updateStoreInfo, deleteStore
};