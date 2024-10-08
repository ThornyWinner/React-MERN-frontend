/*
 * Este código es responsable de renderizar el componente principal CalendarApp 
 * dentro del elemento raíz (root) del HTML, aplicando los estilos y utilizando 
 * el modo estricto de React para detectar problemas potenciales en el código.
*/

import React from 'react';  // Importa React para crear componentes de la interfaz
import ReactDOM from 'react-dom/client';  // Importa ReactDOM para manipular el DOM de la página web

import { CalendarApp } from './CalendarApp';  // Importa el componente prinicpal de la aplicación, CalendarApp
import './styles.css';  // Importa el archivo de estilos CSS para aplicar el diseño a la aplicación

// Renderiza la aplicación dentro del elemento con el id 'root' en el DOM
ReactDOM.createRoot(document.getElementById('root')).render(
  // React.StrictMode es una herramienta de desarrollo que activa advertencias adicionales en el código
  <React.StrictMode>
    {/* CalendarApp es el componente principal que contiene toda la lógica de la aplicación */}
    <CalendarApp />
  </React.StrictMode>
)
