//* Immportaciones: Importamos axios y getEnvVariables, la cual extrae las variables de entorno.
//* Configuración base de la API: Creamos una instancia de axios configurada con la URL de la API (baseURL).
//* Interceptors: Añadimos un interceptor de solicitudes (request interceptor) para incluir un token de autenticación (x-token) en los encabezados de cada solicitud.
//* Exportación: Exportamos calendarApi para usar la instancia de Axios en otras partes de la aplicación.


// Importamos la librería axios para manejar las solicitudes HTTP y la función getEnvVariables
// desde el archivo ../helpers, la cual se usa para obtener las variables de entorno.
import axios from 'axios';
import { getEnvVariables } from '../helpers';

// Obtenemos la URL base de la API desde las variables de entorno
const { VITE_API_URL } = getEnvVariables();


// Creamos una instancia de axios configurada con la URL base de la API.
const calendarApi = axios.create({
    baseURL: VITE_API_URL
});

// Todo: configurar interceptores:
// Configuramos un interceptor para todas las solicitudes salientes de calendarApi.
// Este interceptor agrega el token de autenticación al encabezado 'x-token' de cada solicitud.
calendarApi.interceptors.request.use((config) => {
    
    config.headers = {
        ...config.headers,
        'x-token': localStorage.getItem('token')    // Token de autenticación almacenado en localStorage
    }

    return config;  // Retornamos la configuración modificada de la solicitud
})

// Exportamos la instancia calendarApi para su uso en otras partes de la aplicación.
export default calendarApi;