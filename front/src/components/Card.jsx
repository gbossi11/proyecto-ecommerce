import { Button, Image } from "antd";
import "./components.css";
import useCartStore from "../store/useCartStore"; // Importa el store

const Card = ({ id, nombre, precio, descripcion, imagen }) => {
  const addToCart = useCartStore((state) => state.addToCart);

  const handleAddToCart = () => {
    addToCart({ nombre, precio, descripcion, imagen, id });
  };

  return (
    <div className="card-container">
      <h3>{nombre}</h3>
      <Image width={200} src={imagen} />
      <p>${precio}</p>
      <p>{descripcion}</p>
      <Button type="primary" onClick={handleAddToCart}>
        Agregar
      </Button>
    </div>
  );
};

export default Card;
