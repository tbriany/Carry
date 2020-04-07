const db = require('../database/db')


const getCourierById = async (id) => {
    const getQuery = `
    SELECT  firstname,
            lastname,
            phone_number,
            email,
            avatar_url,
            mode_of_transportation
        FROM couriers
        WHERE courier_id = $/id/;
      `;
    return await db.one(getQuery, { id });
}


const addCourier = async (bodyObj) => {
    const postQuery = `
        INSERT INTO couriers (
            firstname,
            lastname,
            phone_number,
            email,
            avatar_url,
            password,
            mode_of_transportation
        )
        VALUES (
            $/firstname/,
            $/lastname/,
            $/phone_number/,
            $/email/,
            $/avatar_url/,
            $/password/,
            $/mode_of_transportation/
        )
        RETURNING 
            courier_id,
            firstname,
            lastname,
            phone_number,
            email,
            avatar_url,
            mode_of_transportation
      `;
    return await db.one(postQuery, bodyObj);
}


const updateCourierInfo = async (updateObj) => {
    let updateQuery = `
        UPDATE couriers
        SET firstname = $/firstname/,
            lastname = $/lastname/,
            phone_number = $/phone_number/,
            email = $/email/,
            avatar_url = $/avatar_url/,
            password = $/password/,
            mode_of_transportation = $/mode_of_transportation/
            WHERE courier_id = $/courier_id /
            RETURNING *
        ;
    `;
    return await db.one(updateQuery, updateObj);
}


const deleteCourier = async (id) => {
    const deleteQuery = `DELETE FROM couriers
    WHERE courier_id = $/id/`;
    return await db.none(deleteQuery, { id });
};


module.exports = {
    getCourierById,
    addCourier,
    updateCourierInfo,
    deleteCourier
};