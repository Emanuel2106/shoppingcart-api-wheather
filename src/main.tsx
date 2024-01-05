import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";

// Utiliza createRoot para renderizar la aplicación
ReactDOM.createRoot(document.getElementById("root")!).render(
  // Envuelve la aplicación en StrictMode para detectar posibles problemas
  <React.StrictMode>
    {/* Utiliza BrowserRouter para habilitar el enrutamiento */}
    <BrowserRouter>
      {/* Renderiza el componente principal de la aplicación */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);






