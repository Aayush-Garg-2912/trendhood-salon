const express = require('express');
const router = express.Router();
const { getSettings, updateSettings } = require('../controllers/siteSettingsController');

router.get('/get', getSettings);
router.put('/update', updateSettings);

module.exports = router;
