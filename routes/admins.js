const router = require('express').Router();
const { validateLogin, validateAdmin, isValidated } = require('../middleware/validators');
const { register, login } = require('../controllers/admins');

// Admin Register
router.post('/', validateAdmin, isValidated, register);
router.post('/login', validateLogin, isValidated, login);

module.exports = router;
