
const nodemailer = require('nodemailer');

exports.createTransporter = (email, password) => {
    return nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: email,
            pass: password,
        },
    });
};


