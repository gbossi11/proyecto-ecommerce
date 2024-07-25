import { useEffect } from "react";
import Card from "../../components/Card";
import CarouselAuto from "../../CarouselAuto";
import "../../pages/pages.css";

const Home = ({ productos, setIsLoggedIn }) => {
  useEffect(() => {
    console.log("useEffect ejecutado");

    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div className="home-container">
      <CarouselAuto />
      <h1>Bienvenido a nuestra tienda</h1>
      <h2 className="margin-center-title">Productos destacados</h2>
      <div className="products-container ">
        {productos.map((producto) => (
          <Card
            key={producto.id}
            nombre={producto.nombre}
            imagen={producto.imagen}
            precio={producto.precio}
            descripcion={producto.descripcion}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
