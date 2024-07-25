// C:\Users\gasto\Desktop\proyectoFinal\back\src\models\Product.js

const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../db");

const Product = sequelize.define(
  "Product",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    precio: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    categoria: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imagen: {
      type: DataTypes.STRING, // Aquí se guarda la ruta o nombre del archivo de imagen
      allowNull: true, // Puede ser nulo si no se agrega una imagen
    },
  },
  {
    tableName: "productos",
    timestamps: false,
  }
);

module.exports = Product;
