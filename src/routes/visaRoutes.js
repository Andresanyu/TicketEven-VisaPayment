/**
 * Rutas para la API de Visa
 */

const express = require('express');
const router = express.Router();
const { validarTarjeta } = require('../controllers/visaController');

/**
 * POST /api/v1/visa/validar
 * Endpoint para validar una tarjeta de pago
 */
router.post('/validar', validarTarjeta);

module.exports = router;
