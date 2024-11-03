//* initialState: Define el estado inicial de la interfaz de usuario, en este caso, con isDateModalOpen en false, 
//*               indicando que el modal de fecha está cerrado al inicio.
//* Reducers:
//*     - onOpenDateModal: Cambia el estado isDateModalOpen a true, abriendo el modal de fecha.
//*     - onCloseDateModal: Cambia el estado isDateModalOpen a false, cerrando el modal de fecha.
//* Exportación de acciones: Las acciones onOpenDateModal y onCloseDateModal se exportan para que puedan ser utilizadas en otros
//*                          componentes, facilitando el control del estado del modal desde cualquier parte de la aplicación.


import { createSlice } from '@reduxjs/toolkit';

export const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        isDateModalOpen: false  // Estado inicial del modal de fecha, cerrado por defecto
    },
    reducers: {
        // Abre el modal de fecha
        onOpenDateModal: ( state ) => {
            state.isDateModalOpen = true;
        },
        // Cierra el modal de fecha
        onCloseDateModal: ( state ) => {
            state.isDateModalOpen = false;
        },
    }
});

// Exporta los action creators generados autómaticamente por Redux Toolkit
export const { onOpenDateModal, onCloseDateModal } = uiSlice.actions;