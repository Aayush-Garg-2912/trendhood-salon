const express = require('express');
const router = express.Router();
const { login, updateCredentials } = require('../controllers/adminController');

router.post('/login', login);
router.put('/update-credentials', updateCredentials);

module.exports = router;
