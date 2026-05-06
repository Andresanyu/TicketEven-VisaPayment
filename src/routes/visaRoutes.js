const { Router } = require('express');
const { validarPagoVisa } = require('../controllers/visaController');

const router = Router();

router.post('/validar', validarPagoVisa);

module.exports = router;