import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Nav from "./components/Nav";
import About from "./pages/About/About";
import Products from "./pages/Products/Products";
import Home from "./pages/Home/Home";
import Footer from "./components/Footer";
import HeaderTop from "./components/HeaderTop";
import LogIn from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Account from "./pages/Account/Account";
import { FloatButton, ConfigProvider } from "antd";
import { WhatsAppOutlined } from "@ant-design/icons";
import Admin from "./pages/Admin/Admin";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  return (
    <Router>
      <div>
        <HeaderTop />
        <Nav
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          isLoggedIn={isAuthenticated}
          setIsLoggedIn={setIsAuthenticated}
        />

        <Routes>
          <Route path="/About" element={<About />} />
          <Route
            path="/"
            element={
              <Products
                isLoggedIn={isAuthenticated}
                setIsLoggedIn={setIsAuthenticated}
              />
            }
          />
          <Route
            path="/login"
            element={isAuthenticated ? <Navigate to="/account" /> : <LogIn />}
          />
          <Route
            path="/register"
            element={
              isAuthenticated ? <Navigate to="/account" /> : <Register />
            }
          />
          <Route
            path="/account"
            element={isAuthenticated ? <Account /> : <Navigate to="/login" />}
          />
          <Route path="/Administrador" element={<Admin />} />
        </Routes>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#00b96b",
            },
          }}
        >
          <FloatButton
            icon={<WhatsAppOutlined />}
            type="primary"
            href="https://wa.me/542214810700?text=Hola!%20Queria%20consultar%20sobre%20un%20producto."
            style={{ right: 94 }}
          />
        </ConfigProvider>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
