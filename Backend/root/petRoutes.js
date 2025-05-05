const express = require('express');
const router = express.Router();
const petController = require('../controllers/pet.controller');

router.post('/', petController.createPet);
router.get('/types', petController.getPetTypes); 
router.get('/:id', petController.getPetById);
router.put('/:id', petController.updatePet);

module.exports = router;
