const Product = require('../models/productModel');



//Get all products
const getAllProducts = (async (req, res) => {
    const products = await Product.find();

    if(!products?.length){
        return res.status(400).json({
            message: 'No products found.'
        });
    }

    res.json(products);

});

//Create new product
const createNewProduct = (async (req, res) => {
    const {productid, productname, price, quantity} = req.body;

    // Confirm all data fields
    if (!productid || !productname || !price || !quantity ) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Check for duplicate productid
    const duplicate = await Product.findOne({ productid });

    if (duplicate) {
        return res.status(409).json({ message: 'Product already exists' });
    }    

    

    const productObject = { productid, productname, price, quantity };

    // Create and store new user 
    const product = await Product.create(productObject);

    if (product) { //created 
        res.status(201).json({ message: `New product, ID_${productid+' '+productname} created` });
    } else {
        res.status(400).json({ message: 'Invalid data received' });
    }
});

// Update a product
const updateProduct = (async (req, res) => {
    const { productid, productname, price, quantity } = req.body

    // Confirm data 
    if ( !productid || !productname || !price || !quantity) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Does the product exist to update?
    const product = await Product.findOne({productid});

    if (!product) {
        return res.status(400).json({ message: 'Product not found' })
    }

    // Check for duplicate 
    const duplicate = await Product.findOne({ productid })

    // Allow updates to the original product
    if (!duplicate) {
        return res.status(409).json({ message: 'Duplicate product id' })
    }

    product.productid = productid;
    product.productname = productname;
    product.price = price;
    product.quantity = quantity;

 

    const updatedProduct = await product.save()

    res.json({ message: `ID_${productid+' '+updatedProduct.productname} updated` })
})

//DELETE /products
const deleteProduct = (async (req, res) => {
    const { productid } = req.body;

    // Confirm data
    if (!productid) {
        return res.status(400).json({ message: 'Product ID Required' })
    }

    
    // Does the product exist to delete?
    const product = await Product.findOne({productid})

    if (!product) {
        return res.status(400).json({ message: 'Product not found' })
    }

    const result = await product.deleteOne()

    const reply = `Product with ID_${result.productid} ${result.productname} deleted`

    res.json(reply)
})

module.exports = {
    getAllProducts,
    createNewProduct,
    updateProduct,
    deleteProduct
}