const express = require('express');
const sequelize = require('./config/database'); // Importar la configuración de la base de datos
const productRoutes = require('./routes/product'); // Importar las rutas
const userRoutes = require('./routes/auth'); // Importar rutas de autenticación

// Importar modelos para la sincronización
const User = require('./models/User');
const Product = require('./models/Product');
const Cart = require('./models/Cart');
const Order = require('./models/Order');

const app = express();

// Middleware para analizar JSON
app.use(express.json());

// Definir las rutas de la aplicación
app.use('/api/products', productRoutes); // Ruta para productos
app.use('/api/auth', userRoutes); // Ruta para autenticación de usuarios

// Sincronización de modelos y conexión a la base de datos
sequelize.sync({ force: false }) // Cambia `force: true` si deseas recrear las tablas en cada inicio
  .then(() => {
    console.log('Tablas sincronizadas con éxito y base de datos conectada');
  })
  .catch((err) => {
    console.error('Error al sincronizar las tablas:', err);
  });

// Iniciar el servidor en el puerto 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
