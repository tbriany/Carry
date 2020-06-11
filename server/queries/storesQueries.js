const db = require("../database/db");

const getAllStores = async () => {
  const getAllQueries = `
    SELECT * FROM stores ORDER BY store_name
    `;
  return await db.any(getAllQueries);
};

const getStoreById = async (id) => {
  const getQuery = `
  SELECT  store_name,
          store_logo,
          avatar_url,
          phone_number,
          email,
          address,
          city,
          state,
          zip_code
      FROM stores
      WHERE store_id = $/id/;
    `;
  return await db.one(getQuery, { id });
};

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
};

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
};

const deleteStore = async (id) => {
  const deleteQuery = `
  DELETE FROM stores
  WHERE store_id = $/id/`;

  return await db.none(deleteQuery, { id });
};



async function getStoresByLocation (user_latitude, user_longitude){
  console.log(user_latitude, user_longitude);

  const getQuery = `
  SELECT  lat,
          lng, 
          store_name, 
          avatar_url,
          store_id
  FROM stores
  WHERE  
  pow(lat - $1,2) + pow((lng - $2) * cos(radians($1)),2) < pow(20/ 110.25, 2);`;

  return await db.any(getQuery, [user_latitude, user_longitude]);
};


const getAllStoresByCity = async (city) => {
  const getQuery = `
  SELECT  store_name,
          store_id,
          store_logo,
          avatar_url,
          phone_number,
          email,
          address,
          state,
          zip_code
      FROM stores
      WHERE city = $/city/;
    `;
  return await db.any(getQuery, { city });
};

module.exports = {
  getAllStores,
  getStoreById,
  addStore,
  updateStoreInfo,
  deleteStore,
  getStoresByLocation,
  getAllStoresByCity
};
