//* Locales: Se define locales como un objeto que incluye la configuración en español (esES).
//* Configuración del Localizador:
//*   - format: formatea las fechas en el formato que se desea mostrar.
//*   - parse: analiza una cadena de texto y devuelve un objeto de fecha.
//*   - startOfWeek: determina el inicio de la semana según el idioma.
//*   - getDay: obtiene el día de la semana según el idioma.
//* Exportación: localizer se exporta para ser utilizado en el calendario, asegurando que las fechas y los días de la semana se adapten al idioma español.

// Importamos las funciones necesarias desde 'react-big-calendar' y 'date-fns'
import { dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import esES from 'date-fns/locale/es';  // Importa el idioma español para las fechas

// Definimos los locales para el idioma español
const locales ={
  'es': esES,
}

// Creamos y exportamos el localizador de 'react-big-calendar' configurado para español
export const localizer = dateFnsLocalizer({
  format, // Función de formateo de fechas
  parse,  // Función de análisis de cadenas a objetos de fechas
  startOfWeek,  // Función que determina el inicio de la semana
  getDay, // Función que obtiene el día de la semana
  locales,  // Locales, en este caso, español
});