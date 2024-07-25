import React from "react";
import { Form, Input, Button, Checkbox, message } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";

const LogIn = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token); // Almacena el token en el localStorage
        message.success("Inicio de sesión exitoso");
        navigate("/"); // Redirige a la página principal después del inicio de sesión
      } else {
        message.error(
          data.error ||
            "Inicio de sesión fallido. Por favor intenta nuevamente."
        );
      }
    } catch (error) {
      console.error("Error:", error);
      message.error("Error de red. Por favor intenta nuevamente más tarde.");
    }
  };

  return (
    <div className="login">
      <h1>Iniciar Sesión</h1>
      <Form name="normal_login" className="login-form" onFinish={onFinish}>
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              type: "email",
              message: "Por favor ingresa tu email",
            },
          ]}
        >
          <Input
            prefix={<MailOutlined className="site-form-item-icon" />}
            placeholder="Email"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            { required: true, message: "Por favor ingresa tu contraseña" },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="Contraseña"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Recordarme</Checkbox>
          </Form.Item>

          <a className="login-form-forgot" href="">
            ¿Olvidaste tu contraseña?
          </a>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Iniciar Sesión
          </Button>
          o <Link to="/register">Regístrate ahora</Link>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LogIn;
