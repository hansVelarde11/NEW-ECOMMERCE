
const createTransporter = require('./nodemailerConfig');

exports.sendEmail = async (user, subject, text) => {
    const mailOptions = {
        from: 'cameroza@gmail.com', 
        to: user.email,
        subject,
        text,
    };

    try {
        const transporter = createTransporter('tuemail@gmail.com', 'tupassword'); // Credenciales de tu app
        await transporter.sendMail(mailOptions);
        console.log(`Correo enviado a ${user.email}`);
    } catch (error) {
        console.error('Error al enviar el correo:', error);
        throw error; // Para manejarlo en el controlador
    }
};

