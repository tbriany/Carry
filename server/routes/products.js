const express = require('express');
const router = express.Router();
const productQueries = require('../queries/productsQueries')
const { handleErrors } = require('../helpers/helpers')

router.get("/:id", async (req, res, next) => {
    try {
        const id = parseInt(req.params.id)
        const productById = await productQueries.getProductById(id);
        res.status(200).json({
            message: `Product ${id} retrieved`,
            payload: productById
        });
    } catch (err) {
        handleErrors(res, err);
    }
});

router.get("/images/:id", async (req, res, next) => {
    try {
        const id = parseInt(req.params.id)
        const productImageById = await productQueries.getProductImageById(id);
        res.status(200).json({
            message: `Images for product ${id} retrieved`,
            payload: productImageById
        });
    } catch (err) {
        handleErrors(res, err);
    }
});


router.get("/type/:product_type", async (req, res, next) => {
    try {
        const {product_type} = req.params
        const productByType = await productQueries.getProductByType(product_type);
        res.status(200).json({
            message: `Products by type: ${product_type} retrieved.`,
            payload: productByType
        });
    } catch (err) {
        handleErrors(res, err);
    }
});

router.get("/name/:product_name", async (req, res, next) => {
    try {
        const {product_name} = req.params
        const productByName = await productQueries.getProductByName(product_name);
        res.status(200).json({
            message: `Products by name: ${product_name} retrieved.`,
            payload: productByName
        });
    } catch (err) {
        handleErrors(res, err);
    }
});

router.get("/size/:size", async (req, res, next) => {
    try {
        const size = req.params.size
        const productBySize = await productQueries.getProductBySize(size);
        res.status(200).json({
            message: `Products by size: ${size} retrieved.`,
            payload: productBySize
        });
    } catch (err) {
        handleErrors(res, err);
    }
});

router.get("/color/:product_color", async (req, res, next) => {
    try {
        const {product_color} = req.params
        const productByColor = await productQueries.getProductByColor(product_color);
        res.status(200).json({
            message: `Products by color: ${product_color} retrieved.`,
            payload: productByColor
        });
    } catch (err) {
        handleErrors(res, err);
    }
});

router.get("/brand/:product_brand", async (req, res, next) => {
    try {
        const {product_brand} = req.params
        const productByBrand= await productQueries.getProductByBrand(product_brand);
        res.status(200).json({
            message: `Products by brand: ${product_brand} retrieved.`,
            payload: productByBrand
        });
    } catch (err) {
        handleErrors(res, err);
    }
});

router.get("/category/:product_category", async (req, res, next) => {
    try {
        const {product_category} = req.params
        const productByCategory= await productQueries.getProductByCategory(product_category);
        res.status(200).json({
            message: `Products by category: ${product_category} retrieved.`,
            payload: productByCategory
        });
    } catch (err) {
        handleErrors(res, err);
    }
});

module.exports = router;