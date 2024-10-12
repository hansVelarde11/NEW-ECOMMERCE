
const createTransporter = require('./nodemailerConfig');

const sendEmail = async (user, subject, text) => {
    const mailOptions = {
        from: process.env.EMAIL_USER, // Usar variable de entorno para el email
        to: user.email,
        subject,
        text,
    };

    try {
        const transporter = createTransporter(process.env.EMAIL_USER, process.env.EMAIL_PASS); // Usar variables de entorno para las credenciales
        await transporter.sendMail(mailOptions);
        console.log(`Correo enviado a ${user.email}`);
    } catch (error) {
        console.error('Error al enviar el correo:', error);
        throw error; // Para manejarlo en el controlador
    }
};

module.exports = sendEmail;
