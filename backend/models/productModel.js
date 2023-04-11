const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productid: {
        type: Number,
        required: true
    },
    productname: {
        type: String, 
        required: true
    },
    // productimagepath: {
    //     type: String,
    //     required: true
    // },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        reqired: true,
    }
});

module.exports = mongoose.model('Product',productSchema);
