//* Este localizador permite mostrar las fechas en formato español y adecuarlas culturalmente en el calendario.
//* locales: Contiene el idioma configurado, en este caso se establece 'es' para español usando la localización esEs de la librería date-fns.
//* dateFnsLocalizer: Configura la lozalización para el calendario utilizando format, parse, startOfWeek y getDay de la librería date-fns para gestionar las fechas.
//* - format: Da formato a las fechas (ej. dd/mm/yyyy).
//* - parse: Convierte una cadena de texto en una fecha válida.
//* - startOfWeek: Establece el primer día de la semana, ajustado por la localización.
//* - getDay: Determina el día de la semana a partir de una fecha específica.


import { dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import esES from 'date-fns/locale/es';  // Importa la localización en español

// Definición de los locales para usar en el localizador, aquí solo 'es' para español
const locales ={
  'es': esES,
}

// Configuración del localizador de fechas usando date-fns
export const localizer = dateFnsLocalizer({
  format, // Función para formatear las fechas
  parse,  // Función para analizar fechas a partir de cadenas
  startOfWeek,  // Función que define el primer día de la semana
  getDay, // Función que obtiene el día de la semana a partir de una fecha
  locales,  // Objeto de locales, en este caso se incluye 'es' para español
});