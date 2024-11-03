//* Reducer: Agrupa los slices en un solo objeto de reducers. 
//*     - auth: Gestiona el estado de autenticación.
//*     - calendar: Administra el estado del calendario, incluyendo eventos y la selección de eventos.
//*     - ui: Controla el estado de la UI, como la apertura y cierre de modales.
//* Middleware de verificación de serializabilidad: serializableCheck: false: Desactiva la verificación de serializabilidad para evitar advertencias o 
//*                                                 errores con objetos complejos (por ejemplo, fechas), permitiendo el uso de objetos que no son
//*                                                 estrictamente serializables, como las instancias de Date.


import { configureStore } from '@reduxjs/toolkit';

import { uiSlice, calendarSlice, authSlice } from './';


export const store = configureStore({
    
    reducer: {
        auth: authSlice.reducer,    // Reducer para la autenticación
        calendar: calendarSlice.reducer,    // Reducer para el calendario
        ui: uiSlice.reducer // Reducer para la interfaz de usuario
    },
    
    middleware: ( getDefaultMiddleWare ) => getDefaultMiddleWare({
        serializableCheck: false    // Desactiva la verificación de serializabilidad para evitar errores con objetos no serializables
    })
})