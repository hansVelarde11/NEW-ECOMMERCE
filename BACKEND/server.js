const express = require('express');
const cors = require("cors");
const session = require('express-session'); 
const passport = require('passport'); 
const sequelize = require("./config/database");
const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/product");

require("dotenv").config();
require('./controllers/authController/Facebook'); // Asegúrate de que esta línea esté presente para cargar la estrategia
require('./controllers/authController/Google'); // Asegúrate de que esta línea esté presente para cargar la estrategia de Google
require('./controllers/authController/Instagram'); // Importar la estrategia de Instagram

const app = express();

app.use(cors());
app.use(express.json());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session()); 

app.use("/auth", authRoutes);
app.use("/api/products", productRoutes);

sequelize.sync().then(() => {
    app.listen(5000, () => {
        console.log("Servidor levantado en el puerto 5000");
    });
});
