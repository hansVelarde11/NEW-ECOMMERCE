const express = require('express');
const cors = require("cors");
const session = require('express-session'); // Asegúrate de instalar express-session
const passport = require('./controllers/authController/passport'); // Asegúrate de que la ruta sea correcta
const sequelize = require("./config/database");
const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/product");


require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session()); // Para utilizar sesiones

app.use("/auth", authRoutes);
app.use("/api/products", productRoutes);

sequelize.sync().then(() => {
    app.listen(5000, () => {
        console.log("Servidor levantado en el puerto 5000");
    });
});
