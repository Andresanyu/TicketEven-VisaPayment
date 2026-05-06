const express = require('express');
const cors = require('cors');
const visaRoutes = require('./routes/visaRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'Servidor de pagos de Visa operativo en puerto 3001'
  });
});

app.use('/api/v1/visa', visaRoutes);

module.exports = app;