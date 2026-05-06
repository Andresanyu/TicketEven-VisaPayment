/**
 * Configuración principal de la aplicación Express
 */

const express = require('express');
const cors = require('cors');
const visaRoutes = require('./routes/visaRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'Servidor de pagos de Visa está operativo'
  });
});

// Rutas
app.use('/api/v1/visa', visaRoutes);

// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({
    success: false,
    mensaje: "Ruta no encontrada"
  });
});

module.exports = app;
