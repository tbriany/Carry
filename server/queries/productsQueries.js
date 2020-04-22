const db = require('../database/db')


const getProductImageById = async (id) => {
    const getQuery = `
    SELECT products.product_id, product_image_url, product_name, product_price, product_size, product_description,
    quantity, brand_name, category_name, material_name, color_name, product_type_name
    FROM products
    JOIN  productImage_id  ON productImage_id.product_id = products.product_id
    JOIN brands ON brands.brand_id = products.brand_id
    JOIN categories ON categories.category_id = products.category_id
    JOIN materials ON materials.material_id = products.material_id
    JOIN colors ON colors.color_id = products.color_id
    JOIN product_type ON product_type.product_type_id = products.product_type
    WHERE productImage_id.product_id = $/id/;
    `

    return await db.one(getQuery, {id});
}

const getProductById = async (id) => {
    const getQuery = `
    SELECT products.product_id, product_name, product_price, product_size, product_description, 
    quantity, brand_name, category_name, material_name, color_name, product_type_name
    FROM products 
    JOIN brands ON brands.brand_id = products.brand_id
    JOIN categories ON categories.category_id = products.category_id
    JOIN materials ON materials.material_id = products.material_id
    JOIN colors ON colors.color_id = products.color_id
    JOIN product_type ON product_type.product_type_id = products.product_type
    WHERE products.product_id = $/id/;
    `

    return await db.one(getQuery, {id});
}

const getProductByType = async (product_type) => {
    const getQuery = `
    SELECT products.product_id, product_name, product_price, product_size, product_description, 
    quantity, brand_name, category_name, material_name, color_name, product_type_name
    FROM products 
    JOIN brands ON brands.brand_id = products.brand_id
    JOIN categories ON categories.category_id = products.category_id
    JOIN materials ON materials.material_id = products.material_id
    JOIN colors ON colors.color_id = products.color_id
    JOIN product_type ON product_type.product_type_id = products.product_type
    WHERE product_type.product_type_name= $/product_type/;
    `

    return await db.any(getQuery, {product_type});
}


const getProductByName = async (name) => {
    const getQuery = `
    SELECT products.product_id, product_name, product_price, product_size, product_description,
    quantity, brand_name, category_name, material_name, color_name, product_type_name
    FROM products 
    JOIN brands ON brands.brand_id = products.brand_id
    JOIN categories ON categories.category_id = products.category_id
    JOIN materials ON materials.material_id = products.material_id
    JOIN colors ON colors.color_id = products.color_id
    JOIN product_type ON product_type.product_type_id = products.product_type
    WHERE products.product_name = $/name/;
    `

    return await db.any(getQuery, {name});
}

const getProductBySize = async (size) => {
    const getQuery = `
    SELECT products.product_id, product_name, product_price, product_size, product_description, 
    quantity, brand_name, category_name, material_name, color_name, product_type_name
    FROM products 
    JOIN brands ON brands.brand_id = products.brand_id
    JOIN categories ON categories.category_id = products.category_id
    JOIN materials ON materials.material_id = products.material_id
    JOIN colors ON colors.color_id = products.color_id
    JOIN product_type ON product_type.product_type_id = products.product_type
    WHERE products.product_size = $/size/;
    `

    return await db.any(getQuery, {size});
}


const getProductByColor = async (color) => {
    const getQuery = `
    SELECT products.product_id, product_name, product_price, product_size, product_description, 
    quantity, brand_name, category_name, material_name, color_name, product_type_name
    FROM products 
    JOIN brands ON brands.brand_id = products.brand_id
    JOIN categories ON categories.category_id = products.category_id
    JOIN materials ON materials.material_id = products.material_id
    JOIN colors ON colors.color_id = products.color_id
    JOIN product_type ON product_type.product_type_id = products.product_type
    WHERE colors.color_name= $/color/;
    `

    return await db.any(getQuery, {color});
}

const getProductByBrand = async (brand) => {
    const getQuery = `
    SELECT products.product_id, product_name, product_price, product_size, product_description, 
    quantity, brand_name, category_name, material_name, color_name, product_type_name
    FROM products 
    JOIN brands ON brands.brand_id = products.brand_id
    JOIN categories ON categories.category_id = products.category_id
    JOIN materials ON materials.material_id = products.material_id
    JOIN colors ON colors.color_id = products.color_id
    JOIN product_type ON product_type.product_type_id = products.product_type
    WHERE brands.brand_name= $/brand/;
    `

    return await db.any(getQuery, {brand});
}

const getProductByCategory = async (category) => {
    const getQuery = `
    SELECT products.product_id, product_name, product_price, product_size, product_description, 
    quantity, brand_name, category_name, material_name, color_name, product_type_name
    FROM products 
    JOIN brands ON brands.brand_id = products.brand_id
    JOIN categories ON categories.category_id = products.category_id
    JOIN materials ON materials.material_id = products.material_id
    JOIN colors ON colors.color_id = products.color_id
    JOIN product_type ON product_type.product_type_id = products.product_type
    WHERE categories.category_name= $/category/;
    `

    return await db.any(getQuery, {category});
}

module.exports = {
    getProductImageById, 
    getProductById, 
    getProductByType,
    getProductByName, 
    getProductBySize,
    getProductByColor,
    getProductByBrand,
    getProductByCategory
}