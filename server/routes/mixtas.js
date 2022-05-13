const express = require("express");
const Mixta = require('../models/mixta');
const router = express.Router();

router.get('', (req, res, next) => {
  Mixta.find().then(documents => {
    res.status(200).json({
      message: "Mixtas obtenidas exitosamente",
      mixtas: documents
    });
  });
});

module.exports = router;
