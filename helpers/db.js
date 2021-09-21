const pool = require('./dbpool');

const db = {
    getAllProducts: async function(req, res) {
        let conn;
        try {
            conn = await pool.getConnection();
            const rows = await conn.query("SELECT * from products_tbl");
            res.status(200).json({
                message: 'Here is a list of all products.',
                rows: rows
            });
        } catch (err) {
            res.status(500).json({
                message: 'Database error occured.',
            });
            throw err;
        } finally {
            if (conn)
                conn.end();
        } 
    },

    getSpecifiedProduct: async function(req, res) {
        const id = req.params.product_id;

        let conn;
        try {
            conn = await pool.getConnection();
            const rows = await conn.query("SELECT * from products_tbl where product_id=?", [id]);
            if (rows.length > 0)
                res.status(200).json({
                    message: 'Product found.',
                    rows: rows
                });
            else
                res.status(200).json({
                    message: 'No such product.',
                });
        } catch (err) {
            res.status(500).json({
                message: 'Database error occured.',
            });
            throw err;
        } finally {
            if (conn)
                conn.end();
        } 
    },

    addNewProduct: async function(req, res) {
        const id = req.body.product_id;
        const name = req.body.product_name;

        if (!id) {
            res.status(400).json({
                message: 'Invalid JSON body. No product ID found.'
            });
            return;
        }

        if (!name) {
            res.status(400).json({
                message: 'Invalid JSON body. No product name found.'
            });
            return;
        }

        let conn;
        try {
            conn = await pool.getConnection();
            const rows = await conn.query("INSERT into products_tbl values (?, ?)", [id, name]);
            res.status(200).json({
                message: 'Product added.',
                rows: {
                    product_id: id,
                    product_name: name
                }
            });
        } catch (err) {
            res.status(500).json({
                message: 'Database error occured.',
            });
            throw err;
        } finally {
            if (conn)
                conn.end();
        } 
    },

    editProduct: async function(req, res) {
        const id = req.params.product_id;
        const name = req.body.product_name;

        if (!id) {
            res.status(400).json({
                message: 'Invalid JSON body. No product ID found.'
            });
            return;
        }

        if (!name) {
            res.status(400).json({
                message: 'Invalid JSON body. No product name found.'
            });
            return;
        }

        let conn;
        try {
            conn = await pool.getConnection();
            const rows = await conn
                .query("UPDATE products_tbl SET product_id=?, product_name=? WHERE product_id=?", 
                        [id, name, id]);
            res.status(200).json({
                message: 'Product updated.',
                rows: {
                    product_id: id,
                    product_name: name
                }
            });
        } catch (err) {
            res.status(500).json({
                message: 'Database error occured.',
            });
            throw err;
        } finally {
            if (conn)
                conn.end();
        } 
    },

    deleteProduct: async function(req, res) {
        const id = req.params.product_id;

        if (!id) {
            res.status(400).json({
                message: 'Invalid request. No product ID found.'
            });
            return;
        }

        let conn;
        try {
            conn = await pool.getConnection();
            const rows = await conn.query("DELETE FROM products_tbl WHERE product_id=?", [id]);
            res.status(200).json({
                message: 'Product removed.',
                rows: {
                    product_id: id
                }
            });
        } catch (err) {
            res.status(500).json({
                message: 'Database error occured.',
            });
            throw err;
        } finally {
            if (conn)
                conn.end();
        }
    }
}

module.exports = db;