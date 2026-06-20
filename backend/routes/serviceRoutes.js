const express = require('express');
const { addService, getAllServices, updateService, deleteService } = require('../controllers/serviceController');

const router = express.Router();

router.post('/add', addService);
router.get('/get', getAllServices);
router.put('/:id', updateService);
router.delete('/:id', deleteService);

module.exports = router;
