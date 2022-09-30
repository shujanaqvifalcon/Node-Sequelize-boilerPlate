/**
 * User CRUD controllers
 * @author Shuja Naqvi
 */
const Users = require('../models/Users');
const bcrypt = require('bcryptjs');
const User = require('../models/Users');
const bcryptSalt = process.env.BCRYPT_SALT || 10;

/**
 * Create User - Signup
 * @param {object} req
 * @param {object} res
 */
exports.create = async (req, res) => {
  try {
    let { email, password } = req.body; // Getting required fields from body
    if (req.file) {
      req.body.photo = req.file.path; // Creating a new property called photo in body object
    }

    const existingUser = await Users.findOne({ where: { email: email } }); // Finding already existing user

    // Extra Validations
    if (existingUser) {
      // If we found existing user in db
      return res.status(409).json({ success: false, message: 'User already exists.' });
    }

    // Getting url of the image

    // Creating User
    req.body.password = bcrypt.hashSync(password, parseInt(bcryptSalt)); // Hashing the password with salt 8

    const user = await Users.create(req.body); // Adding user in db

    // Done
    res.json({ success: true, user }); //Success
  } catch (err) {
    // Error handling
    console.log('Error ----> ', err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

/**
 * Get all users
 * @param {object} req
 * @param {object} res
 */
exports.getAll = async (req, res) => {
  try {
    const users = await Users.findAll(); // Finding all the users from db
    res.json({ success: true, users }); // Success
  } catch (err) {
    // Error handling
    console.log('Error ----> ', err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

/**
 * Get user by id
 * @param {object} req
 * @param {object} res
 */
exports.getById = async (req, res) => {
  try {
    const userId = req.params.userId; // Getting user id from URL parameter
    const user = await Users.findOne({ where: { id: userId } }); // Finding user by id
    res.json({ success: true, user }); // Success
  } catch (err) {
    // Error handling
    console.log('Error ----> ', err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

/**
 * Update user
 * @param {object} req
 * @param {object} res
 */
exports.update = async (req, res) => {
  try {
    const userId = req.params.userId; // Getting user id from URL parameter

    // If user want to update it's password
    if (req.body.password) {
      req.body.password = bcrypt.hashSync(req.body.password, parseInt(bcryptSalt));
    }
    //find user
    let user = await Users.findOne({ where: { id: userId } });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User Not Found' }); // Success
    }
    //update user if exists
    user.update(req.body);
    //save changings todb level
    await user.save();
    res.json({ success: true, user }); // Success
  } catch (err) {
    // Error handling
    console.log('Error ----> ', err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

/**
 * Delete user
 * @param {object} req
 * @param {object} res
 */
exports.delete = async (req, res) => {
  try {
    const userId = req.params.userId; // Getting user id from URL parameter
    //find user
    let user = await Users.findOne({ where: { id: userId } });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User Already Deleted' }); // Success
    }
    await user.destroy();
    res.json({ success: true, message: 'user deleted' }); // Success
  } catch (err) {
    // Error handling
    console.log('Error ----> ', err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
