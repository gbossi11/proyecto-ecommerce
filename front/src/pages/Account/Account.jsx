import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import "../pages.css";

const Account = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await fetch("http://localhost:8080/account", {
          headers: {
            Authorization: token,
          },
        });

        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        } else {
          localStorage.removeItem("token");
          navigate("/login");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        localStorage.removeItem("token");
        navigate("/login");
      }
    };

    fetchUser();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (!user) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="account-container">
      <h1>Mi Cuenta</h1>
      <h2>Nombre de usuario: {user.username}</h2>
      <h2>Email: {user.email}</h2>
      <Button type="primary" onClick={handleLogout} className="button-account">
        Cerrar sesión
      </Button>
    </div>
  );
};

export default Account;
