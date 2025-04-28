const Owner = require('../models/owner.model');
const Pet = require('../models/pet.model');

exports.getOwnerByLastName = async (req, res) => {
    try {
      const lastName = req.params.lastName;
      const owners = await Owner.find({ lastName: { $regex: lastName, $options: 'i' } })
        .populate({
          path: 'pets',
          model: 'Pet',
          select: 'name type birthDate'
        });
  
      if (owners.length === 0) {
        return res.status(404).json({ message: 'No owners found with that last name' });
      }
  
      const ownersWithDetails = owners.map(owner => {
        return {
          _id: owner._id,
          firstName: owner.firstName,
          lastName: owner.lastName,
          name: `${owner.firstName} ${owner.lastName}`,
          address: owner.address,
          city: owner.city,
          telephone: owner.telephone,
          pets: Array.isArray(owner.pets) ? owner.pets : []
        };
      });
  
      res.status(200).json(ownersWithDetails);
    } catch (err) {
      res.status(500).json({ message: 'Error retrieving owners', error: err.message });
    }
  };
  
  exports.getOwners = async (req, res) => {
    try {
      const owners = await Owner.find().populate({
        path: 'pets',
        model: 'Pet',
        select: 'name type birthDate'
      });
  
      const ownersWithDetails = owners.map(owner => ({
        _id: owner._id,
        firstName: owner.firstName,
        lastName: owner.lastName,
        name: `${owner.firstName} ${owner.lastName}`,
        address: owner.address,
        city: owner.city,
        telephone: owner.telephone,
        pets: Array.isArray(owner.pets) ? owner.pets : []
      }));
  
      res.status(200).json(ownersWithDetails);
    } catch (err) {
      res.status(500).json({ message: 'Error retrieving owners', error: err.message });
    }
  };
  
  exports.getOwnerById = async (req, res) => {
    try {
      const owner = await Owner.findById(req.params.id)
        .populate({
          path: 'pets',
          populate: { path: 'visits' }
        });
  
      if (!owner) {
        return res.status(404).json({ message: 'Owner not found' });
      }
  
      res.status(200).json(owner);
    } catch (err) {
      res.status(500).json({ message: 'Error retrieving owner', error: err.message });
    }
  };

  exports.createOwner = async (req, res) => {
    try {
      const newOwner = new Owner(req.body);
      await newOwner.save();
      res.status(201).json(newOwner);
    } catch (err) {
      res.status(500).json({ message: 'Error creating owner', error: err.message });
    }
  };
  
  exports.updateOwner = async (req, res) => {
    try {
      const updatedOwner = await Owner.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedOwner) {
        return res.status(404).json({ message: 'Owner not found for update' });
      }
      const updatedOwnerWithFullName = {
        name: `${updatedOwner.firstName} ${updatedOwner.lastName}`,
        address: updatedOwner.address,
        city: updatedOwner.city,
        telephone: updatedOwner.telephone
      };
      res.status(200).json(updatedOwnerWithFullName);
    } catch (err) {
      res.status(500).json({ message: 'Error updating owner', error: err.message });
    }
  };
  
