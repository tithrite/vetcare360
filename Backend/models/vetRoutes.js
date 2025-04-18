const express = require('express');
const Veterinarian = require('../models/Veterinarian');
const router = express.Router();

// Récupérer tous les vétérinaires
router.get('/', async (req, res) => {
    try {
        const vets = await Veterinarian.find();
        res.json(vets);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
