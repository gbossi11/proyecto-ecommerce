import { Link, useNavigate } from "react-router-dom";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Button, Drawer } from "antd";
import "./components.css";
import Logo from "../assets/images/return.png";
import useCartStore from "../store/useCartStore"; // Importa el store

const Nav = ({ isOpen, setIsOpen, isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();
  const cart = useCartStore((state) => state.cart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  const toggleDrawer = () => setIsOpen(!isOpen);
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/"); // Redirige a la página principal después de cerrar sesión
  };

  return (
    <div>
      <nav className="nav-container">
        <ul>
          <li>
            <Link to="/">
              <img src={Logo} alt="logo" className="logo-img" />
            </Link>
          </li>
          <li>
            <Link to="/">Productos</Link>
          </li>
          <li>
            <Link to="/About">Nosotros</Link>
          </li>
          {isLoggedIn ? (
            <>
              <li>
                <Link to="/account">Mi Cuenta</Link>
              </li>
              <li>
                <Button onClick={handleLogout}>Cerrar Sesión</Button>
              </li>
            </>
          ) : (
            <li>
              <Link to="/Login">Login</Link>
            </li>
          )}
          <li>
            <Link to="/Administrador">Admin</Link>
          </li>
          <li className="nav-item">
            <Button onClick={toggleDrawer}>
              <ShoppingCartOutlined style={{ fontSize: "24px" }} />
              <span>{cart.length}</span>{" "}
              {/* Muestra la cantidad de productos */}
            </Button>
          </li>
        </ul>
      </nav>
      <Drawer
        title="Carrito de Compras"
        placement="right"
        closable={true}
        onClose={toggleDrawer}
        open={isOpen}
      >
        {/* Muestra los productos en el carrito */}
        {cart.length > 0 ? (
          <ul>
            {cart.map((item) => (
              <li key={item.id}>
                <h3>{item.nombre}</h3>
                <p>${item.precio}</p>
                <Button onClick={() => removeFromCart(item.id)}>
                  Eliminar
                </Button>
              </li>
            ))}
          </ul>
        ) : (
          <p>El carrito está vacío.</p>
        )}
      </Drawer>
    </div>
  );
};

export default Nav;
