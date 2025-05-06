const mongoose = require('mongoose');
const Pet = require('../models/pet.model');
const Owner = require('../models/owner.model');

const PET_TYPES = [
  { id: 'bird', name: 'Bird' },
  { id: 'cat', name: 'Cat' },
  { id: 'dog', name: 'Dog' },
  { id: 'hamster', name: 'Hamster' },
  { id: 'lizard', name: 'Lizard' }
];

exports.createPet = async (req, res) => {
  try {
    const { ownerId, name, birthDate, type } = req.body;
    
    if (!ownerId || !name || !birthDate || !type) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (!PET_TYPES.some(t => t.id === type)) {
      return res.status(400).json({ message: 'Invalid pet type' });
    }

    const pet = await Pet.create({
      owner: ownerId,
      name,
      birthDate,
      type
    });

    await Owner.findByIdAndUpdate(ownerId, {
      $push: { pets: pet._id }
    });

    res.status(201).json(pet);
  } catch (err) {
    res.status(500).json({ 
      message: 'Error during creation',
      error: err.message 
    });
  }
};

exports.getPetById = async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id)
                         .populate('owner')
                         .populate({ path: 'visits' });

    if (!pet) {
      return res.status(404).json({ message: 'Pet not found' });
    }
    
    res.status(200).json(pet);
  } catch (err) {
    res.status(500).json({
      message: 'Server error',
      error: err.message
    });
  }
};

exports.updatePet = async (req, res) => {
  try {
    const updates = req.body;
    
    if (updates.type && !PET_TYPES.some(t => t.id === updates.type)) {
      return res.status(400).json({ message: 'Invalid type' });
    }

    const pet = await Pet.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    );
    
    if (!pet) {
      return res.status(404).json({ message: 'Pet not found' });
    }
    
    res.status(200).json(pet);
  } catch (err) {
    res.status(500).json({ 
      message: 'Error during update',
      error: err.message 
    });
  }
};

exports.getPetTypes = (req, res) => {
  res.status(200).json(PET_TYPES);
};
