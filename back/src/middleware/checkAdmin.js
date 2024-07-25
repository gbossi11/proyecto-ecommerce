const User = require("../models/User"); // Asegúrate de que la ruta sea correcta

const checkAdmin = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userId);
    if (user && user.role === "admin") {
      next();
    } else {
      res.status(403).json({ error: "No tienes permisos de administrador" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al verificar el rol de administrador" });
  }
};

module.exports = checkAdmin;
