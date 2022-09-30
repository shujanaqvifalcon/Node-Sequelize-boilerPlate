/**
 * All api routes handles here
 * @author Shuja Naqvi
 */
const router = require('express').Router();

// Parent Routes
router.use('/admins', require('./admins'));
router.use('/users', require('./users')); // All the user routes
router.use('/auth', require('./auth')); // All the auth routes

// Export
module.exports = router;
