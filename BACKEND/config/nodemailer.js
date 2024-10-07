const nodemailer = require('nodemailer');

export const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: false, // true for port 465, false for other ports
    auth: {
      user: "ramos213@gmail.com",
      pass: "avenidaCristo",
    },
  });

  transporter.verify().then(() =>{
    console.log('Ready for sends emails')
  })