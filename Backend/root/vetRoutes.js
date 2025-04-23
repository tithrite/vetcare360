const express = require('express');
const router = express.Router();
const veterinarianController = require('../controllers/veterinarian.controller');

router.get('/', veterinarianController.getVeterinarians);

module.exports = router;
