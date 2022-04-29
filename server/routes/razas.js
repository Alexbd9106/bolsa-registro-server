const express = require("express");
const Raza = require('../models/raza');
const router = express.Router();

router.get('', (req, res, next) => {
  Raza.find().then(documents => {
    res.status(200).json({
      message: "Razas obtenidas exitosamente",
      razas: documents
    });
  });
});

module.exports = router;
