// controllers/productController.js
const Product = require('../models/product');

// getProducts -- get All Products
exports.getProducts = async (req, res) => {
    try {

        const products = await Product.find();

        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


// getProduct -- get a single product by ID
exports.getProduct = async (req, res) => {
    try {

        const product = await Product.findById(req.params.id);

        if (!product) return res.status(404).json({ message: 'Product not found' });

        res.json(product);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};



// createProduct -- create New Product
exports.createProduct = async (req, res) => {

    const { product_name, product_type, price, unit } = req.body;

    const product = new Product({ product_name, product_type, price, unit });

    try {//begin 
        const newProduct = await product.save();
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};


// updateProduct -- update a product by ID
exports.updateProduct = async (req, res) => {
    try {
        const { product_name, product_type, price, unit } = req.body;

        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            { product_name, product_type, price, unit },
            { new: true }
        );

        if (!updatedProduct) return res.status(404).json({ message: 'Product not found' });

        res.json(updatedProduct);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// deleteProduct -- delete a product by ID
exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);

        if (!product) return res.status(404).json({ message: 'Product not found' });
        
        res.json({ message: 'Product deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
