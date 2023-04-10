const Product = require('../models/productModel');
const asynchandler = require('ecpress-async-handler');

//get products
const getAllProducts = asynchandler(async (req, res) => {
    const products = await Product.find().lean();

    if(!products?.length){
        return res.status(400).json({message: 'No products found'});
    }
    res.json(products);
});

//create product
const createNewProduct = asyncHandler(async(req, res) => {
    const {}
})