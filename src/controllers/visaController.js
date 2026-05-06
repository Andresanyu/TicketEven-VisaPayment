const { MOCK_PAYMENT_SUCCESS } = require('../constants/config');

const validarPagoVisa = (req, res) => {
  if (MOCK_PAYMENT_SUCCESS) {
    return res.status(200).json({
      success: true,
      mensaje: 'Pago aprobado por Visa'
    });
  }

  return res.status(200).json({
    success: false,
    mensaje: 'Fondos insuficientes o tarjeta inválida'
  });
};

module.exports = {
  validarPagoVisa
};