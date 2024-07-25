import { useEffect, useState } from "react";
import { Collapse, Input, Select } from "antd";
import Card from "../../components/Card";
import "../pages.css";
import CarouselAuto from "../../CarouselAuto";

const { Panel } = Collapse;
const { Option } = Select;

const Products = ({ setIsLoggedIn }) => {
  const [productos, setProductos] = useState([]);
  const [filteredProductos, setFilteredProductos] = useState([]);
  const [nameFilter, setNameFilter] = useState("");
  const [minPriceFilter, setMinPriceFilter] = useState("");
  const [maxPriceFilter, setMaxPriceFilter] = useState("");
  const [sortOrder, setSortOrder] = useState(""); // "asc" or "desc"

  useEffect(() => {
    console.log("useEffect ejecutado");

    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, [setIsLoggedIn]);

  useEffect(() => {
    fetch("http://localhost:8080/productos")
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setProductos(data);
          setFilteredProductos(data);
        } else {
          console.error("Productos no es un arreglo:", data);
          setProductos([]);
          setFilteredProductos([]);
        }
      })
      .catch((error) => console.error("Error fetching productos:", error));
  }, []);

  useEffect(() => {
    filterAndSortProducts();
  }, [nameFilter, minPriceFilter, maxPriceFilter, sortOrder, productos]);

  const filterAndSortProducts = () => {
    let result = [...productos];

    if (nameFilter) {
      result = result.filter((producto) =>
        producto.nombre.toLowerCase().includes(nameFilter.toLowerCase())
      );
    }

    if (minPriceFilter) {
      result = result.filter(
        (producto) => producto.precio >= parseFloat(minPriceFilter)
      );
    }

    if (maxPriceFilter) {
      result = result.filter(
        (producto) => producto.precio <= parseFloat(maxPriceFilter)
      );
    }

    if (sortOrder) {
      result.sort((a, b) =>
        sortOrder === "asc" ? a.precio - b.precio : b.precio - a.precio
      );
    }

    setFilteredProductos(result);
  };

  return (
    <div>
      <CarouselAuto />

      <h1>Productos</h1>

      <Collapse>
        <Panel header="Filtros" key="1">
          <div className="filters">
            <Input
              placeholder="Filtrar por nombre"
              value={nameFilter}
              onChange={(e) => setNameFilter(e.target.value)}
              style={{ marginBottom: 10 }}
            />
            <Input
              type="number"
              placeholder="Precio mínimo"
              value={minPriceFilter}
              onChange={(e) => setMinPriceFilter(e.target.value)}
              style={{ marginBottom: 10 }}
            />
            <Input
              type="number"
              placeholder="Precio máximo"
              value={maxPriceFilter}
              onChange={(e) => setMaxPriceFilter(e.target.value)}
              style={{ marginBottom: 10 }}
            />
            <Select
              placeholder="Ordenar por precio"
              onChange={(value) => setSortOrder(value)}
              style={{ width: "100%", marginBottom: 0 }}
            >
              <Option value="asc">Ascendente</Option>
              <Option value="desc">Descendente</Option>
            </Select>
          </div>
        </Panel>
      </Collapse>

      <div>
        <ul className="products-container">
          {filteredProductos.map((producto) => (
            <li key={producto.id}>
              <Card
                id={producto.id} // Asegúrate de pasar el id aquí
                nombre={producto.nombre}
                imagen={producto.imagen}
                precio={producto.precio}
                descripcion={producto.descripcion}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Products;
