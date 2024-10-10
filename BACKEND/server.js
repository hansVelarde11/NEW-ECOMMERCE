const express = require('express');
const cors = require("cors");
const sequelize = require("./config/database");
const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/product");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

sequelize.sync().then(() => {
  app.listen(5000, () => {
    console.log("Servidor levantado en el puerto 5000");
  });
});