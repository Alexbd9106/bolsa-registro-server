const express = require("express");
const Escolaridad = require('../models/escolaridad');
const router = express.Router();

router.get('', (req, res, next) => {
  Escolaridad.find().then(documents => {
    res.status(200).json({
      message: "Escolaridades obtenidas exitosamente",
      escolaridades: documents
    });
  });
});

module.exports = router;
