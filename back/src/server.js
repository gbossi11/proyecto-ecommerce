const express = require("express");
const app = express();
const PORT = 8080;
const cors = require("cors");
const sequelize = require("./db");
const authRoutes = require("./routes/authRoutes");
const authMiddleware = require("./middleware/authMiddleware");
const checkAdmin = require("./middleware/checkAdmin"); // Importa el middleware de verificación de administrador
const adminProductRoutes = require("./routes/adminProducts"); // Importa las rutas de administración
const Product = require("./models/Product");
const User = require("./models/User");

app.use(cors());
app.use(express.json());

// Manejo de errores global
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: "Internal server error" });
});

// Conexión a la base de datos
sequelize
  .authenticate()
  .then(() => {
    console.log("Conexión a la base de datos establecida correctamente.");
  })
  .catch((err) => {
    console.error("Error al conectar con la base de datos:", err);
    process.exit(1); // Salir del proceso si no se puede conectar a la base de datos
  });

// Rutas principales
app.use("/", authRoutes);
app.use("/admin/products", adminProductRoutes); // Usa las rutas de administración

// Ruta para obtener todos los productos
app.get("/productos", async (req, res) => {
  try {
    const productos = await Product.findAll();
    res.status(200).json(productos);
  } catch (error) {
    console.error("Error fetching productos:", error);
    res.status(500).json({ error: "Error al obtener los productos" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor en el puerto ${PORT}`);
});
