const Customer = require('../models/customerModel');

//bcrypt to hash password
const bcrypt = require('bcrypt');

// Get all customers
const getAllCustomers = (async (req, res) => {
    const customers = await Customer.find().select('-password');

    if(!customers?.length){
        return res.status(400).json({
            message: 'No users found.'
        });
    }

    res.json(customers);

});

// Get One customer
const getOneCustomer = (async (req, res) => {
    const id = req.params['id'];

    const customer = await Customer.findById(id).select('-password');

    if (!customer) {
        return res.status(400).json({ message: 'User not found' })
    } else {
        return res.status(201).json(customer);
    } 

});  

//Create new customer
const createNewCustomer = (async (req, res) => {
    const {firstname, lastname, email, password, mobile, shippingaddress, city, zipcode} = req.body;

    // Confirm all data fields
    if (!firstname || !lastname || !email || !password || !mobile || !shippingaddress || !city || !zipcode) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Check for duplicate email
    const duplicate = await Customer.findOne({ email });

    if (duplicate) {
        return res.status(409).json({ message: 'User already exists' });
    }    

    // Hash password 
    const hashedPwd = await bcrypt.hash(password, 10); // salt rounds

    const customerObject = { firstname, lastname, email, "password": hashedPwd, mobile, shippingaddress, city, zipcode };

    // Create and store new customer 
    const customer = await Customer.create(customerObject);

    if (customer) { //created 
        res.status(201).json({ message: `New user ${firstname +' '+ lastname} created` });
    } else {
        res.status(400).json({ message: 'Invalid user data received' });
    }
});

// Update a customer
const updateCustomer = (async (req, res) => {
    const { id, firstname, lastname, email, password, mobile, shippingaddress, city, zipcode } = req.body

    // Confirm data 
    if (!id || !firstname || !lastname || !email || !mobile || !shippingaddress || !city || !zipcode) {
        return res.status(400).json({ message: 'All fields except password are required' })
    }

    // Does the customer exist to update?
    const customer = await Customer.findById(id);

    if (!customer) {
        return res.status(400).json({ message: 'User not found' })
    }

    // Check for duplicate 
    const duplicate = await Customer.findOne({ email })

    // Allow updates to the original product
    if (duplicate.id != id ) {
        return res.status(409).json({ message: 'Duplicate user id' })
    }

  

    customer.firstname = firstname;
    customer.lastname = lastname;
    customer.email = email;
    customer.mobile = mobile;
    customer.shippingaddress = shippingaddress;
    customer.city = city;
    customer.zipcode = zipcode;

    if (password) {
        // Hash password for update
        customer.password = await bcrypt.hash(password, 10) // salt rounds 
    }

    const updatedCustomer= await customer.save()

    res.json({ message: `${updatedCustomer.firstname +' '+ updatedCustomer.lastname} updated` })
})

//DELETE /customer
const deleteCustomer = (async (req, res) => {
    const { id } = req.body;

    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'User ID Required' })
    }

    
    // Does the customer exist to delete?
    const customer = await Customer.findById(id)

    if (!customer) {
        return res.status(400).json({ message: 'User not found' })
    }

    const result = await customer.deleteOne()

    const reply = `Username ${result.firstname +' '+ result.lastname} with ID ${result._id} deleted`

    res.json(reply)
})

module.exports = {
    getAllCustomers,
    getOneCustomer,
    createNewCustomer,
    updateCustomer,
    deleteCustomer
}  