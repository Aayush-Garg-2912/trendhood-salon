const express = require('express');
const router = express.Router();
const { login, updateCredentials, resetAdmin } = require('../controllers/adminController');

router.post('/login', login);
router.put('/update-credentials', updateCredentials);
router.post('/reset', resetAdmin);

module.exports = router;
