const mongoose = require('mongoose');

const mixtaSchema = mongoose.Schema({
  nombre: { type: String, required: true },
});

module.exports = mongoose.model('Mixta', mixtaSchema);
