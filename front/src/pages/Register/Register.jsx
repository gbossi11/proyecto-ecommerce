// Register.jsx
import React from "react";
import { Form, Input, Button, message } from "antd";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const response = await fetch("http://localhost:8080/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const data = await response.json();
      if (response.ok) {
        message.success("Registro exitoso. Por favor inicia sesión.");
        navigate("/login");
      } else {
        message.error(
          data.error || "Error en el registro. Por favor intenta nuevamente."
        );
      }
    } catch (error) {
      console.error("Error:", error);
      message.error("Error de red. Por favor intenta nuevamente más tarde.");
    }
  };

  return (
    <div className="register">
      <h1>Registro</h1>
      <Form name="register" onFinish={onFinish}>
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: "Por favor ingresa tu nombre de usuario",
            },
          ]}
        >
          <Input placeholder="Nombre de usuario" />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Por favor ingresa tu correo electrónico",
            },
          ]}
        >
          <Input placeholder="Correo electrónico" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            { required: true, message: "Por favor ingresa tu contraseña" },
          ]}
        >
          <Input.Password placeholder="Contraseña" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Registrarse
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;
