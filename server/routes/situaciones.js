const express = require("express");
const Situacion = require('../models/situacion');
const router = express.Router();

router.get('', (req, res, next) => {
  Situacion.find().then(documents => {
    res.status(200).json({
      message: "Situaciones obtenidas exitosamente",
      situaciones: documents
    });
  });
});

module.exports = router;
