//* El hook facilita la gestión del estado del modal de forma centralizada.
//* useSelector: Se utiliza para extraer el estado isDateModalOpen del store de Redux, que determina si el modal está abierto o cerrado.
//* useDispatch: Permite despachar acciones a Redux, en esta caso onOpenDateModal y onCloseDateModal.
//* openDateModal y closeDateModal: Son funciones que despachan las acciones correspondientes para abrir o cerrar el modal.
//* toggleDateModal: Esta función alterna el estado del modal, abriéndolo si está cerrado y cerrándolo si está abierto.


import { useDispatch, useSelector } from 'react-redux';
import { onCloseDateModal, onOpenDateModal } from '../store';


export const useUiStore = () => {

    const dispatch = useDispatch();

    // Selecciona la parte del estado que controla el modal del calendario desde el store de Redux.
    const { 
        isDateModalOpen
    } = useSelector( state => state.ui );

    // Abre el modal despachando la acción onOpenDateModal
    const openDateModal = () => {
        dispatch( onOpenDateModal() )
    }

    // Cierra el modal despachando la acción onCloseDateModal
    const closeDateModal = () => {
        dispatch( onCloseDateModal() )
    }

    // Alterna el estado del modal, abriéndolo o cerrándolo según el valor actual de isDateModalOpen
    const toggleDateModal = () => {
        (isDateModalOpen)
            ? openDateModal()   // Si el modal está abierto, lo vuelve a abrir (aunque este comportamiento podría parecer redundante)
            : closeDateModal(); // Si el modal está cerrado, lo cierra 
    }



    return {
        //* Propiedades
        isDateModalOpen,    // Esgado del modal, si está abierto o cerrado

        //* Métodos
        closeDateModal, // Método para cerrar el modal
        openDateModal,  // Método para abrir el modal
        toggleDateModal,    // Método para alternar el estado del modal
    }

}