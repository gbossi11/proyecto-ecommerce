const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("ecommerce", "root", "", {
  host: "localhost",
  dialect: "mysql",
  logging: false, // Puedes deshabilitar los logs de SQL si lo prefieres
});

module.exports = sequelize;
