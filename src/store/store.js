//* configureStore: Es una función proporcionada por Redux Toolkit para crear el store de manera simplificada, 
//*                 con soporte integrado para middlewares y herramientas de desarrollo.
//* reducer: Aquí se definen los slices que gestionan las diferentes partes del estado (en este caso, calendar y ui).
//* middleware: Se usa para deshabilitar la verificación de serialización, que normalmente lanza advertencias si 
//*             detecta valores no serializables en el estado o acciones. Esto puede ser útil cuando se manejan objetos como fechas, 
//*             que no son serializables por defecto.

// Importa la función configureStore de Redux Toolkit para crear el store de la aplicación
import { configureStore } from '@reduxjs/toolkit';
// Importa los slices (sub-reductores) para manejar las funcionalidadades de UI y calendario
import { uiSlice, calendarSlice, authSlice } from '../store/index';

// Configura el store de Redux
export const store = configureStore({
    // Define los reductores (reducers) que manejarán el estado de cada parte de la aplicación
    reducer: {
        auth: authSlice.reducer,
        // El estado del calendario es manejado por el reducer calendarSlice
        calendar: calendarSlice.reducer,
        // El estado de UI es manejado por el reducer uiSlice
        ui: uiSlice.reducer
    },
    // Configura el mmiddleware del store, deshabilitando la verificación de serialización
    middleware: ( getDefaultMiddleWare ) => getDefaultMiddleWare({
        serializableCheck: false
    })
})