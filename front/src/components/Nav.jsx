import { Link, useNavigate } from "react-router-dom";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Button, Drawer } from "antd";
import "./components.css";
import Logo from "../assets/images/return.png";
import useCartStore from "../store/useCartStore";

const Nav = ({ isOpen, setIsOpen, isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();
  const { cart, removeFromCart, clearCart } = useCartStore((state) => ({
    cart: state.cart,
    removeFromCart: state.removeFromCart,
    clearCart: state.clearCart,
  }));

  const toggleDrawer = () => setIsOpen(!isOpen);
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/"); // Redirige a la página principal después de cerrar sesión
  };

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.precio * item.quantity,
    0
  );

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
              <span>{totalItems}</span>
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
        {cart.length > 0 ? (
          <>
            <ul>
              {cart.map((item) => (
                <li key={item.id}>
                  <h3 className="color-carrito">{item.nombre}</h3>
                  <img src={item.imagen} alt={item.nombre} width={50} />
                  <p>
                    ${item.precio} x {item.quantity}
                  </p>
                  <Button onClick={() => removeFromCart(item.id)}>
                    Eliminar
                  </Button>
                </li>
              ))}
            </ul>
            <div>
              <p>Total Productos: {totalItems}</p>
              <p>Precio Total: ${totalPrice.toFixed(2)}</p>
              <Button type="primary" onClick={() => navigate("/checkout")}>
                Concretar Pedido
              </Button>
              <Button onClick={() => clearCart()}>Vaciar Carrito</Button>
            </div>
          </>
        ) : (
          <p>El carrito está vacío.</p>
        )}
      </Drawer>
    </div>
  );
};

export default Nav;
