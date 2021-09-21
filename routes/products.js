const express = require('express');
const router = express.Router();
const db = require('../helpers/db');

/*
 * Define routes for /products
 */

// READ all
router.get('/', db.getAllProducts);

// READ
router.get('/:product_id', db.getSpecifiedProduct);

// ADD
router.post('/', db.addNewProduct);

// EDIT
router.patch('/:product_id', db.editProduct);

// REMOVE
router.delete('/:product_id', db.deleteProduct);

module.exports = router;