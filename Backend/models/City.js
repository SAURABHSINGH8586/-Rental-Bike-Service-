const mongoose = require('mongoose');

const citySchema = new mongoose.Schema({
  _id: String, 
  name: {
    type: String,
    required: true,
    unique: true
  }
});

module.exports = mongoose.model('City', citySchema);

