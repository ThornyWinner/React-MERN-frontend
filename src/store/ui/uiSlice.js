//* Estos action creators son exportados para ser utilizados en el código, por ejemplo, en el hook useUiStore que despacha estas acciones para abrir o cerrar el modal.
//* createSlice: Esta función de Redux Toolkit es utilizada para crear un slice que contiene tanto el estado como los reducers que modifican su estado.
//* - name: El nombre del slice, en este caso es 'ui'. Este nombre es importante porque se utiliza para nombrar el estado dentro del store global de Redux.
//* - initialState: El estado inicial del slice, aquí se define que el modal (referido por isDateModalOpen) comienza como cerrado (valor false).
//* - reducers: Son las funciones que definen cómo cambia el estado cuando una acción es despachada. En este caso:
//*     + onOpenDateModal: Cambia el estado a true, lo que significa que el modal está abierto.
//*     + onCloseDateModal: Cambia el estado a false, lo que significa que el modal está cerrado.
//* Action creators: Redux Toolkit genera automáticamente los action creators (funciones que crean acciones) basados en los nombres de los reducers. 
//*                  En este caso, se generan onOpenDateModal y onCloseDateModal.


import { createSlice } from '@reduxjs/toolkit';

export const uiSlice = createSlice({
    name: 'ui', // Nombre del slice, se usa para identificarlo en el store
    initialState: {
        isDateModalOpen: false  // Estado inicial, donde el modal está cerrado (false)
    },
    reducers: {
        // Reducer para abrir el modal, establece isDateModalOpen en true
        onOpenDateModal: ( state ) => {
            state.isDateModalOpen = true;
        },
        // Reducer para cerrar el modal, establece isDateModalOpen en false
        onCloseDateModal: ( state ) => {
            state.isDateModalOpen = false;
        },
    }
});


// Exporta los action creators generados autómaticamente por Redux Toolkit
export const { onOpenDateModal, onCloseDateModal } = uiSlice.actions;