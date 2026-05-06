
const { MOCK_PAYMENT_SUCCESS } = require('../constants/config');
const logger = require('../utils/logger');

/**
 * Valida una tarjeta de pago Visa
 * @param {Object} req - Objeto request de Express
 * @param {Object} res - Objeto response de Express
 */
const validarTarjeta = (req, res) => {
  try {
    const body = req.body || {};
    const rawNumber = body.cardNumber || body.pan || (body.card && (body.card.number || body.card.pan)) || '';
    const masked = rawNumber ? `****${String(rawNumber).slice(-4)}` : '****unknown';

    logger.info(`Incoming payment validation request - card: ${masked}`);

    // En un MVP estático, respondemos basado en la constante MOCK_PAYMENT_SUCCESS
    if (MOCK_PAYMENT_SUCCESS) {
      logger.info(`Payment approved for card ${masked}`);
      return res.status(200).json({
        success: true,
        mensaje: 'Pago aprobado por Visa'
      });
    } else {
      logger.info(`Payment rejected for card ${masked}`);
      return res.status(200).json({
        success: false,
        mensaje: 'Fondos insuficientes o tarjeta inválida'
      });
    }
  } catch (error) {
    logger.error(`Validation error: ${error.message}`);
    return res.status(500).json({
      success: false,
      mensaje: 'Error interno del servidor',
      error: error.message
    });
  }
};

module.exports = {
  validarTarjeta
};
