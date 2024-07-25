import React from "react";
import "./components.css";
import { Outlet, Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <div>
        <div className="logo-izq">
          <a href="">
            <img src="./assets/images/nav-blanco-09.png" alt="logo" />
          </a>
        </div>
        <div className="derecha">
          <ul>
            <li>
              <a href="">Productos</a>
            </li>
            <li>
              <a href="">Nosotros</a>
            </li>
            <li>
              <a href="">Login</a>
            </li>
            <li>
              <a href="">Carrito</a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Header;
