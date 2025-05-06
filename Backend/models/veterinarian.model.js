const mongoose = require('mongoose');

const veterinarianSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  specialties: {
    type: [String], 
    required: true
  }
});

module.exports = mongoose.model('Veterinarian', veterinarianSchema);
