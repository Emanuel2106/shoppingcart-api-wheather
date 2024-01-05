import { Button, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import storeItems from "../data/items.json";
import { formatCurrency } from "../utilities/formatCurrency";

type CartItemProps = {
  id: number;
  quantity: number;
};

export function CartItem({ id, quantity }: CartItemProps) {
  // Extrae la función removeFromCart del contexto useShoppingCart
  const { removeFromCart } = useShoppingCart();
  
  // Busca el artículo en storeItems que coincide con el id proporcionado
  const item = storeItems.find(i => i.id === id);
  
  // Si el artículo no se encuentra, devuelve null y no renderiza nada
  if (item == null) return null;

  // Renderiza la información del artículo en una estructura de Stack de Bootstrap
  return (
    <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
      {/* Renderiza la imagen del artículo con estilos específicos */}
      <img
        src={item.imgUrl}
        style={{ width: "125px", height: "75px", objectFit: "cover" }}
      />

      {/* Contenedor principal de información del artículo */}
      <div className="me-auto">
        <div>
          {/* Renderiza el nombre del artículo */}
          {item.name}{" "}
          
          {/* Si la cantidad es mayor que 1, muestra la cantidad con un mensaje */}
          {quantity > 1 && (
            <span className="text-muted" style={{ fontSize: ".65rem" }}>
              x{quantity}
            </span>
          )}
        </div>
        
        {/* Renderiza el precio del artículo con un formato de moneda específico */}
        <div className="text-muted" style={{ fontSize: ".75rem" }}>
          {formatCurrency(item.price)}
        </div>
      </div>

      {/* Renderiza el costo total del artículo (precio * cantidad) */}
      <div> {formatCurrency(item.price * quantity)}</div>
      
      {/* Botón para eliminar el artículo del carrito */}
      <Button
        variant="outline-danger"
        size="sm"
        onClick={() => removeFromCart(item.id)}
      >
        &times;
      </Button>
    </Stack>
  );
}
