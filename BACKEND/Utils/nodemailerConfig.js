
const nodemailer = require('nodemailer');

const createTransporter = (email, password) => {
    return nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: email, // Usar el email pasado como argumento
            pass: password, // Usar la contraseña pasada como argumento
        },
    });
};

module.exports = createTransporter; // Exportar la función, no el objeto nodemailer
