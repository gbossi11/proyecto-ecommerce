const express = require("express");
const router = express.Router();
const Product = require("../models/Product"); // Reemplaza con la ruta de tu modelo
const authMiddleware = require("../middleware/authMiddleware");
const checkAdmin = require("../middleware/checkAdmin");

// Crear producto
router.post("/create", authMiddleware, checkAdmin, async (req, res) => {
  const { nombre, descripcion, precio, stock, categoria, imagen } = req.body;

  try {
    const newProduct = await Product.create({
      nombre,
      descripcion,
      precio,
      stock,
      categoria,
      imagen,
    });
    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ error: "Error al crear el producto" });
  }
});

// Leer todos los productos
router.get("/", async (req, res) => {
  try {
    const products = await Product.findAll();
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Error al obtener los productos" });
  }
});

// Actualizar producto parcialmente
router.patch("/update/:id", authMiddleware, checkAdmin, async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  try {
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    // Actualiza solo los campos especificados
    Object.assign(product, updatedData);

    await product.save();
    res.json(product);
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ error: "Error al actualizar el producto" });
  }
});

// Eliminar producto
router.delete("/delete/:id", authMiddleware, checkAdmin, async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    await product.destroy();
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ error: "Error al eliminar el producto" });
  }
});

module.exports = router;
