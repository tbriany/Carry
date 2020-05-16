const db = require("../database/db");

const getAllFromCart = async () => {
    const getAllQueries = `
    SELECT checkoutCart.checkoutcart_id,checkoutCart.size, checkoutCart.product_id , checkoutCart.quantity As cartQuantity, productImage_id.*,brands.brand_name, products.*, colors.color_name, materials.material_name,
    checkoutCart.quantity * products.product_price AS productTotal
    FROM products
    JOIN checkoutCart ON products.product_id = checkoutCart.product_id 
    JOIN colors ON  products.color_id  = colors.color_id
    JOIN materials ON products.material_id= materials.material_id
    JOIN brands ON products.brand_id = brands.brand_id 
    JOIN  productImage_id  ON  products.product_id = productImage_id.product_id 
    GROUP BY checkoutCart.checkoutcart_id, productimage_id.product_image_id, brands.brand_name, products.product_id, colors.color_name, materials.material_name
    ORDER BY checkoutcart_id ASC
    `;
    return await db.any(getAllQueries);
};


const getProductIdFromCart = async (product_id) => {
    const getcartQueriesByProdId = `
    SELECT products.*, checkoutCart.checkoutCart_id, checkoutCart.size, checkoutCart.quantity AS cartQuantity
    FROM checkoutCart
    JOIN products ON  checkoutCart.product_id  = products.product_id 
    WHERE products.product_id = $/product_id/;
    `;
    return await db.one(getcartQueriesByProdId, { product_id });
}


const getSumOfCheckout = async () => {
    const getTotalQueries = `
   SELECT SUM (checkoutCart.quantity * products.product_price) AS checkoutTotal
   FROM checkoutCart 
   JOIN products ON checkoutCart.product_id =  products.product_id 
   `
    return await db.one(getTotalQueries)
}


const getCheckoutCartId = async (id) => {
    const getQuery = `
    SELECT checkoutCart.checkoutcart_id, checkoutCart.product_id , checkoutCart.size, checkoutCart.quantity As cartQuantity,  productImage_id.*,brands.brand_name, products.*, colors.color_name, materials.material_name
    FROM products
    JOIN checkoutCart ON products.product_id = checkoutCart.product_id 
    JOIN colors ON  products.color_id  = colors.color_id
    JOIN materials ON products.material_id= materials.material_id
    JOIN brands ON products.brand_id = brands.brand_id 
    JOIN  productImage_id  ON  products.product_id = productImage_id.product_id 
    WHERE checkoutCart.checkoutCart_id = $/id/;
    `;
    return await db.one(getQuery, { id });
}


const addToCart = async (bodyObj) => {
    const postQuery = `
      INSERT INTO checkoutCart (
        product_id ,
        size,
        quantity
      )
      VALUES (
          $/product_id/,
          $/size/,
          $/quantity/
      )
      RETURNING *
   `;
    return await db.one(postQuery, bodyObj);
}

const updateCheckoutCart = async (checkoutCart_id) => {

    let updateQuery = `
        UPDATE checkoutCart
        SET product_id = $/product_id/,
        size = $/size/,
        quantity = $/quantity/
        WHERE checkoutCart_id = $/checkoutCart_id/
         RETURNING *
        ;
    `;
    return await db.one(updateQuery, checkoutCart_id);
}

const deleteCheckout = async (id) => {
    const deleteQuery = `
    DELETE FROM checkoutCart
    WHERE checkoutCart_id = $/id/`;
    return await db.none(deleteQuery, { id });
};

module.exports = {
    getAllFromCart,
    getProductIdFromCart,
    getSumOfCheckout,
    getCheckoutCartId,
    addToCart,
    updateCheckoutCart,
    deleteCheckout
};