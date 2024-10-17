const { Sequelize } = require('sequelize');
require('dotenv').config(); // Cargar las variables de entorno desde el archivo .env

// Crear una nueva instancia de Sequelize con los detalles de conexión a la base de datos
const sequelize = new Sequelize(
  process.env.DB_NAME,          // Nombre de la base de datos
  process.env.DB_USER,          // Usuario de la base de datos
  process.env.DB_PASSWORD,      // Contraseña del usuario
  {
    host: process.env.DB_HOST,  // Host del servidor de base de datos
    dialect: 'postgres',        // El dialecto que estamos utilizando (PostgreSQL en este caso)
    logging: false              // Desactivar el logging de SQL en la consola (puedes cambiarlo si deseas ver las consultas)
  }
);

// Función para probar la conexión a la base de datos
sequelize.authenticate()
  .then(() => {
    console.log('Conectado exitosamente a la base de datos PostgreSQL.');
  })
  .catch((err) => {
    console.error('No se pudo conectar a la base de datos:', err.message);
  });

// Exportar la instancia de Sequelize para usarla en otras partes de la aplicación
module.exports = sequelize;