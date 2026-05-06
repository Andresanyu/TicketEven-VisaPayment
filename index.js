const app = require('./src/app');
const { PORT } = require('./src/constants/config');

app.listen(PORT, () => {
  console.log(`Servidor de pagos de Visa operativo en puerto ${PORT}`);
});