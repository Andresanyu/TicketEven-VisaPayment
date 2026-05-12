-- init.sql: crea la tabla tarjetas_visa al iniciar el contenedor
CREATE TABLE IF NOT EXISTS tarjetas_visa (
  id SERIAL PRIMARY KEY,
  pan_number VARCHAR(255) NOT NULL,
  cvv2 VARCHAR(10) NOT NULL,
  saldo NUMERIC(12,2) DEFAULT 0,
  estado VARCHAR(50) DEFAULT 'ACTIVE'
);

-- Insert ejemplo (opcional)
INSERT INTO tarjetas_visa (pan_number, cvv2, saldo, estado)
VALUES ('4500000000000004', '123', 1000.00, 'ACTIVE')
ON CONFLICT DO NOTHING;
