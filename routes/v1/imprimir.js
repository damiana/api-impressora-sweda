const express = require('express');
const router = express.Router();

const ctrl = require('../../controllers/imprimir');

router.post('/imprimirTexto', ctrl.getTexto);
router.get('/imprimirImagem', ctrl.getImagem);
router.get('/status', ctrl.getStatus);

module.exports = router;
