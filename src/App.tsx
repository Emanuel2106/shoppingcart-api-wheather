import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Home } from "./pages/Home";
import { Store } from "./pages/Store";
import { Wheather } from "./pages/Wheather"
import { Navbar } from "./components/Navbar";
import { ShoppingCartProvider } from "./context/ShoppingCartContext";

function App() {
  return (
    // Envuelve la aplicación con el proveedor del carrito de compras
    <ShoppingCartProvider>
      {/* Componente Navbar que se mostrará en la parte superior */}
      <Navbar />

      {/* Contenedor principal de la aplicación con margen en la parte inferior */}
      <Container className="mb-4">
        {/* Configura las rutas para la navegación */}
        <Routes>
          {/* Ruta para la página de inicio */}
          <Route path="/" element={<Home />} />

          {/* Ruta para la página de la tienda */}
          <Route path="/store" element={<Store />} />

          {/* Ruta para la página del clima */}
          <Route path="/wheather" element={<Wheather />} />
        </Routes>
      </Container>
    </ShoppingCartProvider>
  );
}

export default App;

