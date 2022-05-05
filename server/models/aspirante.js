const mongoose = require('mongoose');

const aspiranteSchema = mongoose.Schema({
  nombre: { type: String, required: true },
  apellidos: { type: String, required: true },
  alias: { type: String },
  ci: { type: String, required: true },
  edad: { type: String, required: true },
  sexo: { type: String, required: true },
  provincia: { type: String, required: true },
  municipio: { type: String, required: true },
  direccion: { type: String, required: true },
  correo: { type: String, required: true },
  telefono: { type: String },
  raza: { type: String, required: true },
  estatura: { type: String, required: true },
  peso: { type: String, required: true },
  estado_civil: { type: String, required: true },
  hijos: { type: String },
  licencia: { type: Boolean, required: true },
  categoria_licencia: { type: String },
  militancia: { type: String },
  nivel_escolaridad: { type: String, required: true },
  titulo_graduado: { type: String, required: true },
  experiencia_laboral: { type: String, required: true },
  otros_estudios: { type: String },
  trayectoria_laboral: { type: Array },
  situacion_laboral: { type: String, required: true },
  centro_trabajo: { type: String },
  organismo_trabajo: { type: String },
  cargo_trabajo: { type: String },
  categoria_trabajo: { type: String },
  direccion_trabajo: { type: String },
  telefono_trabajo: { type: String },
  otros_oficios: { type: String },
  estado: { type: String }
});

module.exports = mongoose.model('Aspirante', aspiranteSchema);
