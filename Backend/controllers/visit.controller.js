const Visit = require('../models/visit.model');

exports.createVisit = async (req, res) => {
  try {
    const newVisit = new Visit(req.body);
    await newVisit.save();
    res.status(201).json(newVisit);
  } catch (err) {
    res.status(500).json({ message: 'Error creating visit', error: err });
  }
};
