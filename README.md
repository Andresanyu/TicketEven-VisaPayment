# TicketEven-VisaPayment

Visa Payment processor simulation for Payment Gateway.

## Inicialización

1. Instalar dependencias:
	```bash
	npm install
	```
2. Levantar el servicio:
	```bash
	npm start
	```

## Estructura

- src/constants/config.js
- src/controllers/visaController.js
- src/routes/visaRoutes.js
- src/app.js
- index.js

## Endpoints

- GET /health
- POST /api/v1/visa/validar

## Puerto

El servicio corre en 3001.
