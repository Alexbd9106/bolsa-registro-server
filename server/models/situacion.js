const mongoose = require('mongoose');

const situacionSchema = mongoose.Schema({
  nombre: { type: String, required: true },
});

module.exports = mongoose.model('Situacion', situacionSchema);
