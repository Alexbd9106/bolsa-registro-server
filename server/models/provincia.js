const mongoose = require('mongoose');

const provinciaSchema = mongoose.Schema({
  nombre: { type: String, required: true },
});

module.exports = mongoose.model('Provincia', provinciaSchema);
