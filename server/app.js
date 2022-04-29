const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const aspirantesRoutes = require("./routes/aspirantes");
const categoriasRoutes = require("./routes/categorias");
const escolaridadesRoutes = require("./routes/escolaridades");
const estadosRoutes = require("./routes/estados");
const provinciasRoutes = require("./routes/provincias");
const razasRoutes = require("./routes/razas");
const situacionesesRoutes = require("./routes/situaciones");

const app = express();

mongoose.connect('mongodb://localhost:27017/bolsa')
  .then(() => {
    console.log('Conectado a la Base de Datos');
  })
  .catch(() => {
    console.log('Conexión Fallida');
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
  next();
});

app.use("/aspirantes", aspirantesRoutes);
app.use("/categorias", categoriasRoutes);
app.use("/escolaridades", escolaridadesRoutes);
app.use("/estados", estadosRoutes);
app.use("/provincias", provinciasRoutes);
app.use("/razas", razasRoutes);
app.use("/situaciones", situacionesesRoutes);

module.exports = app;
