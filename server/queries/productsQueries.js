const db = require('../database/db')


const getProductImageById = async (id) => {
    const getQuery = `
    SELECT products.product_id, products.product_name, products.product_price, products.product_description, products.quantity, 
    products.store_id, brands.brand_name, categories.category_name, materials.material_name, colors.color_name, product_type.product_type_name, productImage_id.*,
    array_agg(sizes.product_size) AS product_size
    FROM products 
    JOIN brands ON brands.brand_id = products.brand_id
    JOIN categories ON categories.category_id = products.category_id
    JOIN materials ON materials.material_id = products.material_id
    JOIN colors ON colors.color_id = products.color_id
    JOIN product_type ON product_type.product_type_id = products.product_type
    JOIN  productImage_id  ON productImage_id.product_id = products.product_id
    JOIN sizes ON sizes.product_id = products.product_id 
    WHERE products.product_id = $/id/
    GROUP BY products.product_id, brands.brand_id, categories.category_name,materials.material_name,colors.color_name, product_type.product_type_name,
    productimage_id.product_image_id
    `
    return await db.one(getQuery, { id });
}

const getProductById = async (id) => {
    const getQuery = `
    SELECT products.product_id, products.product_name, products.product_price, products.product_description, products.quantity, brands.brand_name, categories.*, materials.material_name, colors.color_name, product_type.product_type_name, 
    productImage_id.*,
    array_agg(sizes.product_size) AS product_size
    FROM products 
    JOIN brands ON brands.brand_id = products.brand_id
    JOIN categories ON categories.category_id = products.category_id
    JOIN materials ON materials.material_id = products.material_id
    JOIN colors ON colors.color_id = products.color_id
    JOIN product_type ON product_type.product_type_id = products.product_type
    JOIN  productImage_id  ON productImage_id.product_id = products.product_id
    JOIN sizes ON sizes.product_id = products.product_id 
    WHERE products.product_id = $/id/
    GROUP BY products.product_id, brands.brand_id, categories.category_id,materials.material_name,colors.color_name, product_type.product_type_name,
    productimage_id.product_image_id
    `

    return await db.one(getQuery, { id });
}

// const getProductByType = async (product_type) => {
//     const getQuery = `
//     SELECT products.product_id, products.product_name, products.product_price, products.product_description, products.quantity, brands.brand_name, categories.category_name, materials.material_name, colors.color_name, product_type.product_type_name
//     FROM products 
//     JOIN brands ON brands.brand_id = products.brand_id
//     JOIN categories ON categories.category_id = products.category_id
//     JOIN materials ON materials.material_id = products.material_id
//     JOIN colors ON colors.color_id = products.color_id
//     JOIN product_type ON product_type.product_type_id = products.product_type
//     WHERE product_type.product_type_name= $/product_type/;
//     `
//     return await db.any(getQuery, { product_type });
// }


const getProductByName = async (name) => {
    const getQuery = `
    SELECT products.product_id, product_name, product_price, product_description,
    quantity, brand_name, category_name, material_name, color_name, product_type_name
    FROM products 
    JOIN brands ON brands.brand_id = products.brand_id
    JOIN categories ON categories.category_id = products.category_id
    JOIN materials ON materials.material_id = products.material_id
    JOIN colors ON colors.color_id = products.color_id
    JOIN product_type ON product_type.product_type_id = products.product_type
    WHERE products.product_name = $/name/;
    `
    return await db.any(getQuery, { name });
}

const getProductBySize = async (size) => {
    const getQuery = `
    SELECT products.product_id, product_name, product_price, product_description, quantity, brand_name, category_name, material_name, color_name, product_type_name, sizes.*
    FROM products 
    JOIN brands ON brands.brand_id = products.brand_id
    JOIN categories ON categories.category_id = products.category_id
    JOIN materials ON materials.material_id = products.material_id
    JOIN colors ON colors.color_id = products.color_id
    JOIN product_type ON product_type.product_type_id = products.product_type
    JOIN sizes ON sizes.product_id = products.product_id 
    WHERE sizes.product_size = $/size/;
    `
    return await db.any(getQuery, { size });
}


const getProductByColor = async (color) => {
    const getQuery = `
    SELECT products.product_id, product_name, product_price, product_description, 
    quantity, brand_name, category_name, material_name, color_name, product_type_name
    FROM products 
    JOIN brands ON brands.brand_id = products.brand_id
    JOIN categories ON categories.category_id = products.category_id
    JOIN materials ON materials.material_id = products.material_id
    JOIN colors ON colors.color_id = products.color_id
    JOIN product_type ON product_type.product_type_id = products.product_type
    WHERE colors.color_name= $/color/;
    `

    return await db.any(getQuery, { color });
}

const getProductByBrand = async (brand) => {
    const getQuery = `
    SELECT products.product_id, product_name, product_price, product_description, 
    quantity, brand_name, category_name, material_name, color_name, product_type_name
    FROM products 
    JOIN brands ON brands.brand_id = products.brand_id
    JOIN categories ON categories.category_id = products.category_id
    JOIN materials ON materials.material_id = products.material_id
    JOIN colors ON colors.color_id = products.color_id
    JOIN product_type ON product_type.product_type_id = products.product_type
    WHERE brands.brand_name= $/brand/;
    `

    return await db.any(getQuery, { brand });
}

const getProductByCategory = async (category, store_id) => {
    const getQuery = `
    SELECT products.product_id, products.product_name, products.product_price, products.product_description, products.quantity, products.store_id,
    brands.brand_name, categories.category_name, materials.material_name, colors.color_name, product_type.product_type_name, productImage_id.*,
    array_agg(sizes.product_size) AS product_size
    FROM products 
    JOIN brands ON brands.brand_id = products.brand_id
    JOIN categories ON categories.category_id = products.category_id
    JOIN materials ON materials.material_id = products.material_id
    JOIN colors ON colors.color_id = products.color_id
    JOIN product_type ON product_type.product_type_id = products.product_type
    JOIN  productImage_id  ON productImage_id.product_id = products.product_id
    JOIN sizes ON sizes.product_id = products.product_id 
    WHERE categories.category_name = $/category/ AND products.store_id = $/store_id/
    GROUP BY products.product_id, brands.brand_id, categories.category_name,materials.material_name,colors.color_name, product_type.product_type_name,
    productimage_id.product_image_id
    `
    return await db.any(getQuery, { category, store_id });
}

const getAllProductsByCategory = async (category_name) =>{
    const getQuery = `SELECT products.product_id, products.product_name, products.product_price, products.product_description, products.quantity, products.store_id,
    brands.brand_name, categories.category_name, materials.material_name, colors.color_name, 
    stores.store_name,product_type.product_type_name, productImage_id.*,
    array_agg(sizes.product_size) AS product_size
    FROM products 
    JOIN brands ON brands.brand_id = products.brand_id
    JOIN categories ON categories.category_id = products.category_id
    JOIN materials ON materials.material_id = products.material_id
    JOIN colors ON colors.color_id = products.color_id
    JOIN product_type ON product_type.product_type_id = products.product_type
    JOIN  productImage_id  ON productImage_id.product_id = products.product_id
    JOIN sizes ON sizes.product_id = products.product_id 
    JOIN stores ON stores.store_id = products.store_id
    WHERE categories.category_name = $/category_name/
    GROUP BY products.product_id, brands.brand_id, categories.category_name,materials.material_name,colors.color_name, stores.store_name,product_type.product_type_name,
    productimage_id.product_image_id;`

    return await db.any(getQuery, {category_name});
}




const getProductByType = async (type, store_id) => {
    const getQuery = `
    SELECT products.product_id, products.product_name, products.product_price, products.product_description, products.quantity, products.store_id,
    brands.brand_name, categories.category_name, materials.material_name, colors.color_name, product_type.product_type_name, productImage_id.*,
    array_agg(sizes.product_size) AS product_size
    FROM products 
    JOIN brands ON brands.brand_id = products.brand_id
    JOIN categories ON categories.category_id = products.category_id
    JOIN materials ON materials.material_id = products.material_id
    JOIN colors ON colors.color_id = products.color_id
    JOIN product_type ON product_type.product_type_id = products.product_type
    JOIN  productImage_id ON productImage_id.product_id = products.product_id
    JOIN sizes ON sizes.product_id = products.product_id 
    WHERE product_type.product_type_name = $/type/ AND products.store_id = $/store_id/
    GROUP BY products.product_id, brands.brand_id, categories.category_name,materials.material_name,colors.color_name, product_type.product_type_name,
    productimage_id.product_image_id
    `
    return await db.any(getQuery, { type, store_id });
}

const getCategories = async () => {
    const getCategoriesQuery = `
      SELECT * FROM categories
      `;
    return await db.any(getCategoriesQuery);
};
  
const getProductTypes = async () => {
    const getTypesQuery = `
      SELECT * FROM product_type
      `;
    return await db.any(getTypesQuery);
};
  
const getBrands = async () => {
    const getBrandsQuery = `
      SELECT * FROM brands
      `;
    return await db.any(getBrandsQuery);
};

const getColors = async () => {
    const getColorsQuery = `
      SELECT * FROM colors
      `;
    return await db.any(getColorsQuery);
};

const getSizes = async () => {
    const getSizesQuery = `
    SELECT DISTINCT
     product_size
    FROM
     sizes`;
    return await db.any(getSizesQuery);
};

// const getNewArrivals = async (id) => {
//     const getNewArrivalsQuery = `
//     SELECT *
//     FROM products
//     WHERE brand_id = $1
//     ORDER BY product_id DESC LIMIT 4;
//     `;
//     return await db.any(getNewArrivalsQuery, [id])
// }

const getNewArrivals = async (id) => {
    const getNewArrivalsQuery = `
    SELECT products.product_id, products.product_name, products.product_price, products.product_description, products.quantity, products.store_id, 
    brands.brand_name, categories.category_name, materials.material_name, colors.color_name, product_type.product_type_name, productImage_id.*,
    array_agg(sizes.product_size) AS product_size
    FROM products 
    JOIN brands ON brands.brand_id = products.brand_id
    JOIN categories ON categories.category_id = products.category_id
    JOIN materials ON materials.material_id = products.material_id
    JOIN colors ON colors.color_id = products.color_id
    JOIN product_type ON product_type.product_type_id = products.product_type
    JOIN  productImage_id  ON productImage_id.product_id = products.product_id
    JOIN sizes ON sizes.product_id = products.product_id 
    WHERE products.store_id = $1
    GROUP BY products.product_id, brands.brand_id, 
categories.category_name,materials.material_name,colors.color_name, product_type.product_type_name,
    productimage_id.product_image_id
    ORDER BY products.product_id DESC LIMIT 4
    `;
    return await db.any(getNewArrivalsQuery, [id])
}

module.exports = {
    getProductImageById,
    getProductById,
    getProductByType,
    getProductByName,
    getProductBySize,
    getProductByColor,
    getProductByBrand,
    getProductByCategory,
    getCategories,
    getProductTypes,
    getBrands,
    getColors,
    getSizes,
    getNewArrivals,
    getAllProductsByCategory
}