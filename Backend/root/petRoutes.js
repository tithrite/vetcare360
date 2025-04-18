const express = require('express');
const Pet = require('../models/Pet');
const router = express.Router();

// Ajouter un animal
router.post('/', async (req, res) => {
    const pet = new Pet(req.body);
    try {
        const newPet = await pet.save();
        res.status(201).json(newPet);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Modifier un animal
router.put('/:id', async (req, res) => {
    try {
        const pet = await Pet.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!pet) return res.status(404).json({ message: 'Animal non trouvé' });
        res.json(pet);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Supprimer un animal
router.delete('/:id', async (req, res) => {
    try {
        const pet = await Pet.findByIdAndDelete(req.params.id);
        if (!pet) return res.status(404).json({ message: 'Animal non trouvé' });
        res.json({ message: 'Animal supprimé avec succès' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
