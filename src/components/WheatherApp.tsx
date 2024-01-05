
import { useState } from "react";

// Interfaz para describir la estructura de los datos meteorológicos
interface WeatherData {
  name: string;
  main: {
    temp: number;
  };
  weather: {
    description: string;
    icon: string;
  }[];
}

const WeatherApp: React.FC = () => {
  const urlBase = "https://api.openweathermap.org/data/2.5/weather";
  const API_KEY = "7d21f55b001b4268a97150a690cadd14";
  const difKelvin = 273.15;

  // Estado para almacenar la ciudad y los datos meteorológicos
  const [ciudad, setCiudad] = useState<string>('');
  const [dataClima, setDataClima] = useState<WeatherData | null>(null);

  // Manejador de cambio para actualizar el estado de la ciudad
  const handleCambioCiudad = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCiudad(e.target.value);
  };

  // Manejador de envío del formulario para realizar la búsqueda del clima
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (ciudad.length > 0) fetchClima();
  };

  // Función asincrónica para realizar la solicitud de datos meteorológicos
  const fetchClima = async () => {
    try {
      const response = await fetch(`${urlBase}?q=${ciudad}&appid=${API_KEY}`);
      const data = await response.json();
      setDataClima(data);
    } catch (error) {
      console.error('Ocurrió el siguiente problema: ', error);
    }
  };

  return (
    <div >
      {/* Formulario para buscar datos meteorológicos */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={ciudad}
          onChange={handleCambioCiudad}
        />
        <button type="submit">Search</button>
      </form>

      {/* Muestra los datos meteorológicos si están disponibles */}
      {dataClima && (
        <div>
          <br></br>
          <h2 className="">{dataClima.name}</h2>
          {/* Muestra la temperatura en grados Celsius */}
          <p>Temperatura: {parseInt((dataClima.main.temp - difKelvin).toString())}ºC</p>

          {/* Muestra la descripción de la condición meteorológica */}
          <p>Condición meteorológica: {dataClima.weather[0].description}</p>

          {/* Muestra el icono correspondiente a la condición meteorológica */}
          <img src={`https://openweathermap.org/img/wn/${dataClima.weather[0].icon}@2x.png`} alt="Weather Icon" />
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
