const User = require('../models/userModel');

//bcrypt to hash password
const bcrypt = require('bcrypt');

// Get all users
const getAllUsers = (async (req, res) => {
    const users = await User.find().select('-password');

    if(!users?.length){
        return res.status(400).json({
            message: 'No users found.'
        });
    }

    res.json(users);

});

//Create new user
const createNewUser = (async (req, res) => {
    const {firstname, lastname, email, password, roles} = req.body;

    // Confirm all data fields
    if (!firstname || !lastname || !email || !password || !Array.isArray(roles) || !roles.length) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Check for duplicate email
    const duplicate = await User.findOne({ email });

    if (duplicate) {
        return res.status(409).json({ message: 'User already exists' });
    }    

    // Hash password 
    const hashedPwd = await bcrypt.hash(password, 10); // salt rounds

    const userObject = { firstname, lastname, email, "password": hashedPwd, roles };

    // Create and store new user 
    const user = await User.create(userObject);

    if (user) { //created 
        res.status(201).json({ message: `New user ${firstname +' '+ lastname} created` });
    } else {
        res.status(400).json({ message: 'Invalid user data received' });
    }
});

// Update a user
const updateUser = (async (req, res) => {
    const { id, firstname, lastname, email, password, roles, active } = req.body

    // Confirm data 
    if (!id || !firstname || !lastname || !email || !Array.isArray(roles) || !roles.length || typeof active !== 'boolean') {
        return res.status(400).json({ message: 'All fields except password are required' })
    }

    // Does the user exist to update?
    const user = await User.findById(id);

    if (!user) {
        return res.status(400).json({ message: 'User not found' })
    }

    // Check for duplicate 
    const duplicate = await User.findOne({ email })

    // Allow updates to the original product
    if (duplicate) {
            return res.status(409).json({ message: 'Duplicate product id' })
        }

  

    user.firstname = firstname;
    user.lastname = lastname;
    user.email = email;
    user.roles = roles;
    user.active = active;

    if (password) {
        // Hash password for update
        user.password = await bcrypt.hash(password, 10) // salt rounds 
    }

    const updatedUser = await user.save()

    res.json({ message: `${updatedUser.firstname +' '+ updatedUser.lastname} updated` })
})

//DELETE /users
const deleteUser = (async (req, res) => {
    const { id } = req.body;

    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'User ID Required' })
    }

    
    // Does the user exist to delete?
    const user = await User.findById(id)

    if (!user) {
        return res.status(400).json({ message: 'User not found' })
    }

    const result = await user.deleteOne()

    const reply = `Username ${result.firstname +' '+ result.lastname} with ID ${result._id} deleted`

    res.json(reply)
})

module.exports = {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser
}