const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

router.post('/add', async (req, res) => {
    try {
        const { productName, productPrice, productUnit, productDescription } = req.body;
        const productExist = await Product.findOne({ productName });
        if (productExist) {
            return res.json({
                status: false,
                message: "Product already exists"
            });
        }

        const productObj = new Product({
            productName,
            productPrice,
            productUnit,
            productDescription
        });

        await productObj.save();

        res.json({
            status: true,
            message: "Product added successfully",
            product: productObj
        });

    } catch (error) {
        res.json({
            status: false,
            message: "Server error"
        });
    }
});

router.get('/get', async (req, res) => {
    try {
        const products = await Product.find();
        res.json({
            status: true,
            products
        });
    } catch (error) {
        res.json({
            status: false,
            message: "Server error"
        });
    }
});

module.exports = router;
