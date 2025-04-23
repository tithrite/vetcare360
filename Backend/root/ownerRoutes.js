const express = require('express');
const router = express.Router();
const ownerController = require('../controllers/owner.controller');

router.get('/search/:lastName', ownerController.getOwnerByLastName); 

module.exports = router;
