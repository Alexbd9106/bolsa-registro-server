const mongoose = require('mongoose');

const escolaridadSchema = mongoose.Schema({
  nombre: { type: String, required: true },
});

module.exports = mongoose.model('Escolaridad', escolaridadSchema);
