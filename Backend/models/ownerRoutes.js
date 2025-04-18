const express = require('express');
const Owner = require('../models/Owner');
const router = express.Router();

// Ajouter un propriétaire
router.post('/', async (req, res) => {
    const owner = new Owner(req.body);
    try {
        const newOwner = await owner.save();
        res.status(201).json(newOwner);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Rechercher un propriétaire par nom de famille
router.get('/search', async (req, res) => {
    const { lastName } = req.query;
    try {
        const owners = await Owner.find({ lastName });
        res.json(owners);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Modifier un propriétaire
router.put('/:id', async (req, res) => {
    try {
        const owner = await Owner.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!owner) return res.status(404).json({ message: 'Propriétaire non trouvé' });
        res.json(owner);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Supprimer un propriétaire
router.delete('/:id', async (req, res) => {
    try {
        const owner = await Owner.findByIdAndDelete(req.params.id);
        if (!owner) return res.status(404).json({ message: 'Propriétaire non trouvé' });
        res.json({ message: 'Propriétaire supprimé avec succès' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
