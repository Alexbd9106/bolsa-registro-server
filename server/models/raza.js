const mongoose = require('mongoose');

const razaSchema = mongoose.Schema({
  nombre: { type: String, required: true },
});

module.exports = mongoose.model('Raza', razaSchema);
