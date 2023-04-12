const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    
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
