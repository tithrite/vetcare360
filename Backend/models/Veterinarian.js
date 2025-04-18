const mongoose = require('mongoose');

const veterinarianSchema = new mongoose.Schema({
    name: { type: String, required: true },
    specialty: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Veterinarian', veterinarianSchema);