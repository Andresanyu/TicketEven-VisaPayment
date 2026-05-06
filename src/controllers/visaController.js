
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
    const { pan_number, cvv2 } = body;

    if (!pan_number || !cvv2) {
      logger.info('Incoming payment validation request rejected due to missing pan_number or cvv2');
      return res.status(400).json({
        transaction_status: 'ERROR',
        details: 'pan_number y cvv2 son obligatorios'
      });
    }

    const masked = `****${String(pan_number).slice(-4)}`;

    logger.info(`Incoming payment validation request - card: ${masked}`);

    // En un MVP estático, respondemos basado en la constante MOCK_PAYMENT_SUCCESS
    if (MOCK_PAYMENT_SUCCESS) {
      logger.info(`Payment approved for card ${masked}`);
      return res.status(200).json({
        transaction_status: 'APPROVED',
        details: 'Pago aprobado por Visa',
        auth_code: 'V-0000'
      });
    } else {
      logger.info(`Payment rejected for card ${masked}`);
      return res.status(200).json({
        transaction_status: 'DECLINED',
        details: 'Tarjeta inválida',
        error_code: 'V-100'
      });
    }
  } catch (error) {
    logger.error(`Validation error: ${error.message}`);
    return res.status(500).json({
      transaction_status: 'ERROR',
      details: 'Error interno del servidor',
      error: error.message
    });
  }
};

module.exports = {
  validarTarjeta
};
