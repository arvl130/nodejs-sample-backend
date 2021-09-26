const express = require('express');
const PORT = process.env.PORT || 8000;
const app = express();

// Handle JSON bodies.
app.use(express.json());

// Allow Cross-Origin requests (CORS).
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
        res.header('Access-Control-Allow-Methods',
            'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

// Products route.
const products_route = require('./routes/products')
app.use('/products', products_route);

// Simple response for root route.
app.get('/', (req, res) => {
    res.status(404).json({
        message: 'You reached us!'
    });
});

// Error response for missing routes.
app.use((req, res) => {
    res.status(404).json({
        message: 'No such resource.'
    });
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT} ...`)
});