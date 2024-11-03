//* Reducer: Agrupa los slices en un solo objeto de reducers. 
//*     - auth: Gestiona el estado de autenticación.
//*     - calendar: Administra el estado del calendario, incluyendo eventos y la selección de eventos.
//*     - ui: Controla el estado de la UI, como la apertura y cierre de modales.
//* Middleware de verificación de serializabilidad: serializableCheck: false: Desactiva la verificación de serializabilidad para evitar advertencias o 
//*                                                 errores con objetos complejos (por ejemplo, fechas), permitiendo el uso de objetos que no son
//*                                                 estrictamente serializables, como las instancias de Date.


import { configureStore } from '@reduxjs/toolkit';
<<<<<<< HEAD
=======
// Importa los slices (sub-reductores) para manejar las funcionalidadades de UI y calendario
import { uiSlice, calendarSlice, authSlice } from '../store/index';
>>>>>>> cff31ad35a421d0e15a73fcf2ee8031810f50dca

import { uiSlice, calendarSlice, authSlice } from './';


export const store = configureStore({
    
    reducer: {
<<<<<<< HEAD
        auth: authSlice.reducer,    // Reducer para la autenticación
        calendar: calendarSlice.reducer,    // Reducer para el calendario
        ui: uiSlice.reducer // Reducer para la interfaz de usuario
=======
        auth: authSlice.reducer,
        // El estado del calendario es manejado por el reducer calendarSlice
        calendar: calendarSlice.reducer,
        // El estado de UI es manejado por el reducer uiSlice
        ui: uiSlice.reducer
>>>>>>> cff31ad35a421d0e15a73fcf2ee8031810f50dca
    },
    
    middleware: ( getDefaultMiddleWare ) => getDefaultMiddleWare({
        serializableCheck: false    // Desactiva la verificación de serializabilidad para evitar errores con objetos no serializables
    })
})