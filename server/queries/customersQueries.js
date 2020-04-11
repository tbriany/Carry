const db = require('../database/db')

const getCustomerByEmail = async (email) => {
    const getQuery = `SELECT * FROM customers
    WHERE email = $/email/;
    `
    return await db.one(getQuery, { email });
};

const getCustomerById = async (id) => {
    const getQuery = `
    SELECT  firstname,
            lastname,
            phone_number,
            email,address,
            city,
            state,
            zip_code,
            avatar_url
        FROM customers
        WHERE customer_id = $/id/;
      `;
    return await db.one(getQuery, { id });
}


const addCustomer = async (bodyObj) => {
    const postQuery = `
        INSERT INTO customers (
            firstname,
            lastname,
            phone_number,
            email,
            address,
            city,
            state,
            zip_code,
            avatar_url,
            password
        )
        VALUES (
            $/firstname/,
            $/lastname/,
            $/phone_number/,
            $/email/,
            $/address/,
            $/city/,
            $/state/,
            $/zip_code/,
            $/avatar_url/,
            $/password_digest/
        )
        RETURNING 
            customer_id,
            firstname,
            lastname,
            phone_number,
            email,
            address,
            city,
            state,
            zip_code,
            avatar_url
      `;
    return await db.one(postQuery, bodyObj);
}



const updateCustomerInfo = async (updateObj) => {
    let updateQuery = `
        UPDATE customers
        SET firstname = $/firstname/,
            lastname = $/lastname/,
            phone_number = $/phone_number/,
            email = $/email/,
            address = $/address/,
            city = $/city/,
            state = $/state/,
            zip_code = $/zip_code/,
            avatar_url = $/avatar_url/,
            password = $/password/
            WHERE customer_id = $/customer_id /
            RETURNING *
        ;
    `;
    return await db.one(updateQuery, updateObj);
}


const deleteCustomer = async (id) => {
    const deleteQuery = `DELETE FROM customers
    WHERE customer_id = $/id/`;
    return await db.none(deleteQuery, { id });
};


module.exports = {
    addCustomer,
    getCustomerByEmail,
    getCustomerById,
    updateCustomerInfo,
    deleteCustomer,
};