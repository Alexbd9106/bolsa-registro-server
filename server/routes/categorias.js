const express = require("express");
const Categoria = require('../models/categoria');
const router = express.Router();

router.get('', (req, res, next) => {
  Categoria.find().then(documents => {
    res.status(200).json({
      message: "Categorias obtenidas exitosamente",
      categorias: documents
    });
  });
});

module.exports = router;
