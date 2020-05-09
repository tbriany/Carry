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


const checkCategories = async (req, res, next) => {
    const {product_category, store_id} = req.params
    const categories = ["Women's", "Men's", "Beauty", "Accessories"]
    try {
        if (categories.includes(product_category)) {
            const productByCategory= await productQueries.getProductByCategory(product_category, store_id);
            res.status(200).json({
                message: `Products by category: ${product_category} retrieved.`,
                payload: productByCategory
            });
        } else {
            next();
        }
    } catch (err) {
        handleErrors(res, err);
    }
}

const getProductsByType = async (req, res, next) => {
    try {
        const {product_category, store_id} = req.params
        const productByType = await productQueries.getProductByType(product_category, store_id);
        res.status(200).json({
            message: `Products by type: ${product_category} retrieved.`,
            payload: productByType
        });
    } catch (err) {
        handleErrors(res, err);
    }
}

router.get("/category/:product_category/:store_id", checkCategories, getProductsByType)


router.get("/categories/all", async (req, res, next) => {
    try {
        const categories = await productQueries.getCategories();
        res.status(200).json({
            message: `All Categories Retrieved`,
            payload: categories
        });
    } catch (err) {
        console.log("ERROR", err)
    }
})


router.get("/product_types/all", async(req, res, next) => {
    try {
        const product_types = await productQueries.getProductTypes();
        res.status(200).json({
            message: `All Product Types Retrieved`,
            payload: product_types
        });
    } catch (err) {
        console.log("ERROR", err)
    }
})

router.get("/brands/all", async(req, res, next) => {
    try {
        const brands = await productQueries.getBrands();
        res.status(200).json({
            message: `All Brands Retrieved`,
            payload: brands
        });
    } catch (err) {
        console.log("ERROR", err)
    }
})

router.get("/colors/all", async(req, res, next) => {
    try {
        const colors = await productQueries.getColors();
        res.status(200).json({
            message: `All Colors Retrieved`,
            payload: colors
        });
    } catch (err) {
        console.log("ERROR", err)
    }
})

router.get("/sizes/all", async(req, res, next) => {
    try {
        const sizes = await productQueries.getSizes();
        res.status(200).json({
            message: `All Sizes Retrieved`,
            payload: sizes
        });
    } catch (err) {
        console.log("ERROR", err)
    }
})

router.get("/new_arrivals/:store_id", async(req, res, next) => {
    try {
        const {store_id} = req.params
        const newArrivals = await productQueries.getNewArrivals(store_id);
        res.status(200).json({
            message: `New Arrivals for brand: ${store_id} retrieved.`,
            payload: newArrivals
        });
    } catch (err) {
        console.log("ERROR", err)
    }
})

module.exports = router;