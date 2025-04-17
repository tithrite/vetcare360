const express = require('express');
const Visit = require('../models/Visit');
const router = express.Router();

// Ajouter une visite
router.post('/', async (req, res) => {
    const visit = new Visit(req.body);
    try {
        const newVisit = await visit.save();
        res.status(201).json(newVisit);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Récupérer les visites d'un animal spécifique
router.get('/pet/:petId', async (req, res) => {
    try {
        const visits = await Visit.find({ petId: req.params.petId });
        res.json(visits);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;