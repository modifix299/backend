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
    const {productname, price, quantity} = req.body;

    // Confirm all data fields
    if ( !productname || !price || !quantity ) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Check for duplicate productid
    const duplicate = await Product.findById();

    if (duplicate) {
        return res.status(409).json({ message: 'Product already exists' });
    }    

    

    const productObject = { productname, price, quantity };

    // Create and store new user 
    const product = await Product.create(productObject);

    if (product) { //created 
        res.status(201).json({ message: `New product, ID_${productname} created` });
    } else {
        res.status(400).json({ message: 'Invalid data received' });
    }
});

// Update a product
const updateProduct = (async (req, res) => {
    const { _id, productname, price, quantity } = req.body

    // Confirm data 
    if ( !_id || !productname || !price || !quantity) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Does the product exist to update?
    const product = await Product.findById(_id);

    if (!product) {
        return res.status(400).json({ message: 'Product not found' })
    }

    // Check for duplicate 
    // const duplicate = await Product.findById();

    // Allow updates to the original product
    // if (!duplicate) {
    //     return res.status(409).json({ message: 'Duplicate product id' })
    // }


    product.productname = productname;
    product.price = price;
    product.quantity = quantity;

 

    const updatedProduct = await product.save()

    res.json({ message: `Product ${updatedProduct.productname} updated` })
})

//DELETE /products
const deleteProduct = (async (req, res) => {
    const {_id} = req.body;

    // Confirm data
    if (!_id) {
        return res.status(400).json({ message: 'Product ID Required' })
    }

    
    // Does the product exist to delete?
    const product = await Product.findById(_id)

    if (!product) {
        return res.status(400).json({ message: 'Product not found' })
    }

    const result = await product.deleteOne()

    const reply = `Product ${result.productname} deleted`

    res.json(reply)
})

module.exports = {
    getAllProducts,
    createNewProduct,
    updateProduct,
    deleteProduct
}