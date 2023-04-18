const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')


// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
  
    // Check for user email
    const user = await User.findOne({ email })

    if(user.active){
      if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
          _id: user.id,
          firstname: user.firstname,
          lastname: user.lastname,
          name: user.name,
          email: user.email,
          role: user.role,
          token: generateToken(user._id),
        })
      } else {
        res.status(401).json({ message: 'Invalid credentials' })
        throw new Error('Invalid credentials')
      }
    } else {
      res.status(401).json({ message: 'User is not active. Please contact you system administrator' })
      throw new Error('Invalid credentials')
    }
  
    
  })
  
  // @desc    Get user data
  // @route   GET /api/users/me
  // @access  Private
  const getMe = asyncHandler(async (req, res) => {
    res.status(200).json(req.user)
  })
  
  // Generate JWT
  const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    })
  }
  
  module.exports = {
    loginUser,
    getMe,
  }
  