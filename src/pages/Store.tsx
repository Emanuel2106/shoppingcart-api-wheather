import { Col, Row } from "react-bootstrap";
import { StoreItem } from "../components/StoreItem";
import storeItems from "../data/items.json";

export function Store() {
  return (
    <>
      {/* Encabezado de la página */}
      <h1>Store</h1>

      {/* Fila de elementos de la tienda */}
      <Row md={2} xs={1} lg={3} className="g-3">
        {/* Mapea sobre los elementos de la tienda y renderiza cada uno */}
        {storeItems.map((item) => (
          <Col key={item.id}>
            {/* Componente StoreItem que representa un artículo de la tienda */}
            <StoreItem {...item} />
          </Col>
        ))}
      </Row>
    </>
  );
}


