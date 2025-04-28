const veterinarian = require('../models/veterinarian.model');

exports.getVeterinarians = async (req, res) => {
  try {
    const veterinarians = await veterinarian.find();
    res.status(200).json(veterinarians);
  } catch (err) {
    console.error('Error fetching veterinarians:', err);
    res.status(500).json({ message: 'Error fetching veterinarians', error: err });
  }
};