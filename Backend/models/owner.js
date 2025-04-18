const mongoose = require('mongoose');

const ownerSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Owner', ownerSchema);