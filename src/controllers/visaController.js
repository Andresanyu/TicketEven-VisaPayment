const logger = require('../utils/logger');
const pool = require('../config/db');

/**
 * Valida una tarjeta de pago Visa
 * @param {Object} req - Objeto request de Express
 * @param {Object} res - Objeto response de Express
 */
const validarTarjeta = async (req, res) => {
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

    const queryText = 'SELECT id, pan_number, cvv2, saldo, estado FROM tarjetas_visa WHERE pan_number = $1 AND cvv2 = $2 LIMIT 1';
    const values = [pan_number, cvv2];

    const result = await pool.query(queryText, values);

    if (result.rows && result.rows.length > 0) {
      const card = result.rows[0];
      const estado = card.estado ? String(card.estado).toLowerCase() : '';
      const isActive = estado.startsWith('act');

      if (isActive) {
        logger.info(`Payment approved for card ${masked}. Remaining balance: ${card.saldo}`);
        return res.status(200).json({
          transaction_status: 'APPROVED',
          details: 'Pago aprobado por Visa',
          auth_code: 'V-0000'
        });
      }
    }

    logger.info(`Payment rejected for card ${masked}`);
    return res.status(200).json({
      transaction_status: 'DECLINED',
      details: 'Fondos insuficientes o tarjeta inválida',
      error_code: 'V-100'
    });
  } catch (error) {
    logger.error(`Validation error (DB): ${error.message}`);
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
