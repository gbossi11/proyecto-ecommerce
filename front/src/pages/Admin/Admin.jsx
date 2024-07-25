import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "antd";

const Admin = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    stock: "",
    categoria: "",
    imagen: "",
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:8080/productos");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:8080/admin/products/create",
        formData,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      fetchProducts();
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  const handleUpdateProduct = async (id) => {
    try {
      await axios.put(
        `http://localhost:8080/admin/products/update/${id}`,
        formData,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      fetchProducts();
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/admin/products/delete/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div>
      <h1>Administración de Productos</h1>
      <div className="agregar-productos">
        <form onSubmit={handleCreateProduct} className="product-form">
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            onChange={handleInputChange}
            className="form-input"
          />
          <input
            type="text"
            name="descripcion"
            placeholder="Descripción"
            onChange={handleInputChange}
            className="form-input"
          />
          <input
            type="number"
            name="precio"
            placeholder="Precio"
            onChange={handleInputChange}
            className="form-input"
          />
          <input
            type="number"
            name="stock"
            placeholder="Stock"
            onChange={handleInputChange}
            className="form-input"
          />
          <input
            type="text"
            name="categoria"
            placeholder="Categoría"
            onChange={handleInputChange}
            className="form-input"
          />
          <input
            type="text"
            name="imagen"
            placeholder="URL de la Imagen"
            onChange={handleInputChange}
            className="form-input"
          />
          <Button type="primary">Agregar Producto</Button>
        </form>
      </div>
      <div className="editar-productos">
        <h1>Editar Productos</h1>
        <ul>
          {products.map((product) => (
            <li key={product.id} className="product-item">
              {product.nombre}
              <Button
                type="primary"
                onClick={() => handleUpdateProduct(product.id)}
                className="edit-button"
              >
                Editar
              </Button>
              <Button
                type="danger"
                onClick={() => handleDeleteProduct(product.id)}
                className="delete-button"
              >
                Eliminar
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Admin;
