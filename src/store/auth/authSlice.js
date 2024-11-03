<<<<<<< HEAD
//* initialState: Define el estado inicial del slice, con status establecido en checking, user como un objeto vacío, y errorMessage como undefined.
//* Reducers:
//*     - onChecking: Configura el estado como "checking", limpiando el usuario y el mensaje de error.
//*     - onLogin: Configura el estado como "authenticated" y asigna la información del usuario en state.user.
//*     - onLogout: Cambia el estado a "not-authenticated", vacía el usuario y opcionalmente incluye un mensaje de error.
//*     - clearErrorMessage: Limpia cualquier mensaje de error previo en el estado.
//* Exportación de actions: Las acciones onChecking, onLogin, onLogout, y clearErrorMessage se exportan para su uso en otros lugares de la aplicación. Esto permite
//*                         despachar estas acciones desde componentes o hooks personalizados, actualizando el estado de autenticación según sea necesario.

import { createSlice } from '@reduxjs/toolkit';
=======
import { createSlice } from "@reduxjs/toolkit";
>>>>>>> cff31ad35a421d0e15a73fcf2ee8031810f50dca

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
<<<<<<< HEAD
        status: 'checking', // Estado inicial de autenticación: puede ser 'checking', 'authenticated', o 'not-authenticated'
        user: {},   // Objeto vacío para almacenar la información del usuario
        errorMessage: undefined,    // Mensaje de error, si existe
    },
    reducers: {
        // Actualiza el estado a "checking", representando que la autenticación está en proceso
        onChecking: ( state ) => {
            state.status = 'checking';
            state.user = {};    // Vacía los datos del usuario
            state.errorMessage = undefined; // Limpia cualquier mensaje de error
        },
        
        // Acción para iniciar sesión, estableciendo el estado como "authenticated"
        onLogin: ( state, { payload } ) => {
            state.status = 'authenticated'; // Cambia el estado a "authenticated"
            state.user = payload;   // Almacena los datos del usuario en el estado
            state.errorMessage = undefined; // Limpia cualquier mensaje de error
        },

        // Acción para cerrar sesión, estableciendo el estado como "not-authenticated"
        onLogout: ( state, { payload } ) => {
            state.status = 'not-authenticated'; // Cambia el estado a "not-authenticated"
            state.user = {};    // Vacía los datos del usuario
            state.errorMessage = payload;   // Almacena un mensaje de error si es pasado en el payload
        },
        
        // Acción para limpiar mensajes de error del estado
        clearErrorMessage: ( state ) => {
            state.errorMessage = undefined; // Limpia el mensaje de error en el estado
=======
        status: 'checking', // 'authenticated', 'not-authenticated'
        user: {},
        errorMessage: undefined
    },
    reducers: {
        onChecking: ( state ) => {
            state.status = 'checking';
            state.user = {};
            state.errorMessage = undefined;
        },
        onLogin: ( state, { payload } ) => {
            state.status = 'authenticated';
            state.user = payload;
            state.errorMessage = undefined;
        },
        onLogout: ( state, { payload } ) => {
            state.status = 'not-authenticated';
            state.user = {};
            state.errorMessage = payload;
        },
        clearErrorMessage: ( state ) => {
            state.errorMessage = undefined;
>>>>>>> cff31ad35a421d0e15a73fcf2ee8031810f50dca
        }
    }
});

// Action creators are generated for each case reducer function
export const { onChecking, onLogin, onLogout, clearErrorMessage } = authSlice.actions;