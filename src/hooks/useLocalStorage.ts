
import { useEffect, useState } from "react";

// Definición del tipo genérico T para el valor almacenado en localStorage
export function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {
  // Estado local para almacenar y recuperar el valor desde localStorage
  const [value, setValue] = useState<T>(() => {
    // Intenta recuperar el valor almacenado en localStorage
    const jsonValue = localStorage.getItem(key);

    // Si el valor existe en localStorage, lo parsea y lo devuelve
    if (jsonValue != null) return JSON.parse(jsonValue);

    // Si el valor inicial es una función, la ejecuta y devuelve el resultado
    if (typeof initialValue === "function") {
      return (initialValue as () => T)();
    } else {
      // Si el valor inicial no es una función, lo devuelve directamente
      return initialValue;
    }
  });

  // Efecto secundario para actualizar localStorage cuando cambia el valor
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  // Devuelve un array con el valor y la función para establecer el valor
  return [value, setValue] as [typeof value, typeof setValue];
}
