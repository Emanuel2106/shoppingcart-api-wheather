import { Button, Card } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { formatCurrency } from "../utilities/formatCurrency";

type StoreItemProps = {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
};

export function StoreItem({ id, name, price, imgUrl }: StoreItemProps) {
  // Extrae funciones y valores del contexto useShoppingCart
  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
  } = useShoppingCart();

  // Obtiene la cantidad del artículo en el carrito
  const quantity = getItemQuantity(id);

  return (
    // Componente Card de Bootstrap que muestra la información del artículo
    <Card className="h-100">
      {/* Imagen del artículo */}
      <Card.Img
        variant="top"
        src={imgUrl}
        height="200px"
        style={{ objectFit: "cover" }}
      />

      {/* Cuerpo del Card con información y botones */}
      <Card.Body className="d-flex flex-column">
        {/* Título del artículo con nombre y precio */}
        <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
          <span className="fs-2">{name}</span>
          <span className="ms-2 text-muted">{formatCurrency(price)}</span>
        </Card.Title>

        {/* Sección para agregar o manejar la cantidad en el carrito */}
        <div className="mt-auto">
          {quantity === 0 ? (
            // Botón para agregar al carrito si la cantidad es 0
            <Button className="w-100" onClick={() => increaseCartQuantity(id)}>
              + Add To Cart
            </Button>
          ) : (
            // Sección para mostrar la cantidad en el carrito y botones de manipulación
            <div
              className="d-flex align-items-center flex-column"
              style={{ gap: ".5rem" }}
            >
              {/* Sección para decrementar/incrementar la cantidad en el carrito */}
              <div
                className="d-flex align-items-center justify-content-center"
                style={{ gap: ".5rem" }}
              >
                <Button onClick={() => decreaseCartQuantity(id)}>-</Button>
                <div>
                  <span className="fs-3">{quantity}</span> in cart
                </div>
                <Button onClick={() => increaseCartQuantity(id)}>+</Button>
              </div>

              {/* Botón para quitar el artículo del carrito */}
              <Button
                onClick={() => removeFromCart(id)}
                variant="danger"
                size="sm"
              >
                Remove
              </Button>
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}

