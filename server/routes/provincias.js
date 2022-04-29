const express = require("express");
const Provincia = require('../models/provincia');
const router = express.Router();

router.get('', (req, res, next) => {
  Provincia.find().then(documents => {
    res.status(200).json({
      message: "Provincias obtenidas exitosamente",
      provincias: documents
    });
  });
});

module.exports = router;
