const db = require("../database/db");
const { getCheckoutCartBySessionId, addCheckoutCart } = require('./receiptsQueries')


const getAllFromCart = async () => {
    const getAllQueries = `
    SELECT checkout_items.checkout_items_id,checkout_items.size, checkout_items.product_id , checkout_items.quantity As cartQuantity, productImage_id.*,brands.brand_name, products.*, colors.color_name, materials.material_name,
    checkout_items.quantity * products.product_price AS productTotal, checkout_cart.*
    FROM products
    JOIN checkout_items ON products.product_id = checkout_items.product_id 
    JOIN checkout_cart ON checkout_items.checkout_cart_id = checkout_cart.checkout_cart_id
    JOIN colors ON  products.color_id  = colors.color_id
    JOIN materials ON products.material_id= materials.material_id
    JOIN brands ON products.brand_id = brands.brand_id 
    JOIN  productImage_id  ON  products.product_id = productImage_id.product_id 
    GROUP BY checkout_items.checkout_items_id, productimage_id.product_image_id, brands.brand_name, products.product_id, colors.color_name, materials.material_name, checkout_cart.checkout_cart_id
    ORDER BY checkout_items_id ASC
    `;
    return await db.any(getAllQueries);
};

const getAllFromCartSession = async (session_id) => {
    const getAllQueries = `
    SELECT checkout_items.checkout_items_id,checkout_items.size, checkout_items.product_id , checkout_items.quantity As cartQuantity, productImage_id.*,brands.brand_name, products.*, colors.color_name, materials.material_name,
    checkout_items.quantity * products.product_price AS productTotal, checkout_cart.checkout_cart_id
    FROM products
    JOIN checkout_items ON products.product_id = checkout_items.product_id 
    JOIN checkout_cart ON checkout_items.checkout_cart_id = checkout_cart.checkout_cart_id
    JOIN colors ON  products.color_id  = colors.color_id
    JOIN materials ON products.material_id= materials.material_id
    JOIN brands ON products.brand_id = brands.brand_id 
    JOIN  productImage_id  ON  products.product_id = productImage_id.product_id 
    WHERE checkout_cart.session_id= $/session_id/
    GROUP BY checkout_items.checkout_items_id, productimage_id.product_image_id, brands.brand_name, products.product_id, colors.color_name, materials.material_name, checkout_cart.checkout_cart_id
    ORDER BY checkout_items_id ASC
    `;
    return await db.any(getAllQueries, { session_id });
};




const getProductFromCartSession = async (obj, sessionId, getStoreId) => {
    let checkout = await getCheckoutCartBySessionId(sessionId)
    if (!checkout) {

        let addTocheckout_items = {
            session_id: sessionId,
            store_id: getStoreId.product_id
        }
        checkout = await addCheckoutCart(addTocheckout_items)
    }
    const getcartQueriesByProdId = `
    SELECT products.*, checkout_items.checkout_items_id, checkout_items.size, checkout_items.quantity AS cartQuantity, checkout_cart.*
    FROM checkout_items
    JOIN products ON  checkout_items.product_id  = products.product_id 
    JOIN checkout_cart ON checkout_cart.checkout_cart_id = checkout_items.checkout_cart_id
    WHERE 
    checkout_items.product_id = $/product_id/ AND 
    size = $/size/ AND 
    checkout_items.checkout_cart_id = $/checkout_cart_id/
    `;
    obj.checkout_cart_id = checkout.checkout_cart_id
    return await db.oneOrNone(getcartQueriesByProdId, obj);
}


const getSumOfCheckout = async () => {
    const getTotalQueries = `
   SELECT SUM (checkout_items.quantity * products.product_price) AS checkoutTotal
   FROM checkout_items 
   JOIN products ON checkout_items.product_id =  products.product_id 
   `
    return await db.one(getTotalQueries)
}


const getcheckoutCart = async (id) => {
    const getQuery = `
    SELECT checkout_items.checkout_items_id, checkout_items.product_id , checkout_items.size, checkout_items.quantity As cartQuantity,  productImage_id.*,brands.brand_name, products.*, colors.color_name, materials.material_name
    FROM products
    JOIN checkout_items ON products.product_id = checkout_items.product_id 
    JOIN colors ON  products.color_id  = colors.color_id
    JOIN materials ON products.material_id= materials.material_id
    JOIN brands ON products.brand_id = brands.brand_id 
    JOIN  productImage_id  ON  products.product_id = productImage_id.product_id 
    WHERE checkout_items.checkout_items_id = $/id/;
    `;
    return await db.one(getQuery, { id });
}


const getStoreIdByProdId = async (product_id) => {
    const getQuery = `
    SELECT product_id FROM products
    WHERE product_id = $/product_id/;
    `;
    return await db.one(getQuery, { product_id });
}

const addToCart = async (bodyObj, sessionId, getStoreId) => {
    let checkout = await getCheckoutCartBySessionId(sessionId)
    if (!checkout) {
        let addTocheckout_items = {
            session_id: sessionId,
            store_id: getStoreId


        }
        checkout = await addCheckoutCart(addTocheckout_items)
    }
    const postQuery = `
      INSERT INTO checkout_items (
        product_id ,
        size,
        quantity,
        checkout_cart_id
      )
      VALUES (
          $/product_id/,
          $/size/,
          $/quantity/,
          $/checkout_cart_id/
      )
      RETURNING *
   `;

    bodyObj.checkout_cart_id = checkout.checkout_cart_id
    return await db.one(postQuery, bodyObj);
}

const updatecheckoutItems = async (updateObj) => {
    let updateQuery = `
        UPDATE checkout_items
        SET 
        quantity = $/quantity/
        WHERE 
        product_id = $/product_id/ AND 
        size = $/size/ AND 
        checkout_cart_id = $/checkout_cart_id/
         RETURNING *
        ;
    `;
    return await db.one(updateQuery, updateObj);
}

const deleteCheckoutItems = async (checkout_items_id) => {
    const deleteQuery = `
    DELETE FROM checkout_items
    WHERE checkout_items_id = $/checkout_items_id/`
    return await db.none(deleteQuery, { checkout_items_id });
};

module.exports = {
    getAllFromCart,
    getAllFromCartSession,
    getProductFromCartSession,
    getSumOfCheckout,
    getcheckoutCart,
    addToCart,
    updatecheckoutItems,
    deleteCheckoutItems,
    getStoreIdByProdId
};