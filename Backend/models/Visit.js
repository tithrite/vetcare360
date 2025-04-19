const mongoose = require('mongoose');

const visitSchema = new mongoose.Schema({
    petId: { type: mongoose.Schema.Types.ObjectId, ref: 'Pet', required: true },
    date: { type: Date, default: Date.now },
    description: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Visit', visitSchema);