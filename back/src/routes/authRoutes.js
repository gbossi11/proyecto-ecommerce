const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();
const SECRET_KEY = "your_secret_key"; // Asegúrate de usar una clave secreta segura

// Ruta de registro
router.post("/register", async (req, res) => {
  const { username, password, email } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      password: hashedPassword,
      email,
    });
    res.status(201).json({ message: "Usuario registrado exitosamente" });
  } catch (error) {
    console.error("Error registrando usuario:", error);
    res.status(500).json({ error: "Error registrando usuario" });
  }
});

// Ruta de inicio de sesión
router.post("/login", async (req, res) => {
  const { email, password } = req.body; // Cambiar a email

  try {
    const user = await User.findOne({ where: { email } }); // Cambiar a email

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }

    const token = jwt.sign({ userId: user.id }, SECRET_KEY, {
      expiresIn: "1h",
    });
    res.json({ message: "Inicio de sesión exitoso", token });
  } catch (error) {
    console.error("Error iniciando sesión:", error);
    res.status(500).json({ error: "Error iniciando sesión" });
  }
});

module.exports = router;
