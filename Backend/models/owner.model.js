const mongoose = require('mongoose');

const ownerSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  telephone: {
    type: String,
    required: true
  },
  pets: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pet',
    required: false 
  }],
  visits: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Visit',
    required: false
  }]
});

module.exports = mongoose.model('Owner', ownerSchema);
