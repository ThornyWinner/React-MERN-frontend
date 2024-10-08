/*
 * Este componente CalendarApp envuelve toda la aplicación en un Provider
 * que conecta la aplicación con el store de Redux, y también utiliza 
 * BrowserRouter para permitir la navegación a través de las rutas 
 * definidas en AppRouter.
*/

import { Provider } from 'react-redux'; // Importa el componente Provider de react-redux para conectar la app con el store de Redux
import { BrowserRouter } from 'react-router-dom';   // Importa BrowserRouter de react-router-dom para manejar la navegación entre rutas
import { AppRouter } from './router';   // Importa AppRouter,el cual contiene la lógica de las rutas de la aplicación
import { store } from "./store";    // Importa el store de Redux, donde se almacenará el estado global de la aplicación

// Define el componente principal de la aplicación, CalendarApp
export const CalendarApp = () => {
    return (
        // Provider envuelve toda la aplicación y provee el store de Redux a todos los componentes
        <Provider store={ store }>
            {/* BrowserRouter envuelve la aplicación para permitir la navegación entre rutas */}
            <BrowserRouter>
                {/* AppRouter maneja las rutas definidas en la aplicación */}
                <AppRouter />
            </BrowserRouter>
        </Provider>
    )
}
