const express = require('express');
const router = express.Router();
const { getStylists } = require('../controllers/stylistController');

router.get('/get', getStylists);
module.exports = router;
