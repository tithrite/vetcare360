const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
  owner: {  
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Owner',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  birthDate: {
    type: Date,
    required: true,
  },
  type: {
    type: String,
    enum: ['bird', 'cat', 'dog', 'hamster', 'lizard'],
    required: true,
  },
});

petSchema.virtual('visits', {
  ref: 'Visit',
  localField: '_id',
  foreignField: 'pet',
  justOne: false 
});

petSchema.set('toJSON', { virtuals: true });
petSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Pet', petSchema);
