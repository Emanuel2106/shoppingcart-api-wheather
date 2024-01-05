import { CartItem } from "./CartItem";
import storeItems from "../data/items.json";
import { Offcanvas, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { formatCurrency } from "../utilities/formatCurrency";

type ShoppingCartProps = {
  isOpen: boolean;
};

export function ShoppingCart({ isOpen }: ShoppingCartProps) {
  // Extrae las funciones y valores necesarios del contexto useShoppingCart
  const { closeCart, cartItems } = useShoppingCart();

  return (
    // Componente Offcanvas de Bootstrap para mostrar el carrito de compras
    <Offcanvas show={isOpen} onHide={closeCart} placement="end">
      {/* Encabezado del Offcanvas con un botón para cerrar */}
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>

      {/* Cuerpo del Offcanvas con la lista de elementos en el carrito */}
      <Offcanvas.Body>
        {/* Stack de Bootstrap para organizar los elementos del carrito */}
        <Stack gap={3}>
          {/* Mapea cada elemento del carrito a un componente CartItem */}
          {cartItems.map((item) => (
            <CartItem key={item.id} {...item} />
          ))}

          {/* Muestra el total de la compra */}
          <div className="ms-auto fw-bold fs-5">
            Total{" "}
            {formatCurrency(
              // Calcula el total sumando el precio de cada artículo multiplicado por su cantidad
              cartItems.reduce((total, cartItem) => {
                const item = storeItems.find((i) => i.id === cartItem.id);
                return total + (item?.price || 0) * cartItem.quantity;
              }, 0)
            )}
          </div>
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  );
}
