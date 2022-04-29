const express = require("express");
const Estado = require('../models/estado');
const router = express.Router();

router.get('', (req, res, next) => {
  Estado.find().then(documents => {
    res.status(200).json({
      message: "Estados obtenidos exitosamente",
      estados: documents
    });
  });
});

module.exports = router;
