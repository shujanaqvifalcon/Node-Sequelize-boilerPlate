/**
 * User CRUD routes
 * @author Shuja Naqvi
 */
const router = require('express').Router();
const users = require('../controllers/users');
const { upload } = require('../middleware/multer');
const { checkAuth } = require('../middleware/checkAuth');
const { checkAdminAuth } = require('../middleware/adminAuth');
const { commonAuth } = require('../middleware/commonAuth');
const { validateUser, validateUserUpdate, isValidated } = require('../middleware/validators');

/**
 * ////////////////////////// Routes /////////////////////////
 * @method post user signup
 * @method get get all users
 * @method get get user by id
 * @method put update user
 * @method delete delete user
 */

// Create - User Signup
router.post('/', upload.single('image'), validateUser, isValidated, users.create);

// Read
router.get('/', checkAdminAuth, users.getAll); // Get all users at once
router.get('/:userId', commonAuth, users.getById); // Get one user by it's id

// Update
router.put('/:userId', checkAuth, validateUserUpdate, isValidated, users.update); // Update a specific user by it's id

// Delete
router.delete('/:userId', checkAuth, users.delete); // delete a specific user by it's id

// Export
module.exports = router;
