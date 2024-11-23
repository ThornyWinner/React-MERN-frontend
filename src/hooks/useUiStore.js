//* Estados y disparadores de Redux: useDispatch y useSelector de Redux se utilizan para despachar acciones y 
//*                                  obtener el estado de isDateModalOpen, que controla la visibilidad del modal.
//* Métodos:
//*     - openDateModal: Abre el modal cambiando el estado mediante la acción onOpenDateModal.
//*     - closeDateModal: Cierra el modal utilizando la acción onCloseDateModal.
//*     - toggleDateModal: Alterna el estado del modal, abriendo si está cerrado y cerrando si está abierto.
//* Propiedades devueltas:
//*     - isDateModalOpen: Estado actual del modal (true si está abierto).
//*     - closeDateModal, openDateModal, y toggleDateModal: Métodos para controlar la visibilidad del modal.


import { useDispatch, useSelector } from 'react-redux';
import { onCloseDateModal, onOpenDateModal } from '../store';

export const useUiStore = () => {

    const dispatch = useDispatch();

    // Extrae el estado de visibilidad del modal de fechas desde Redux
    const { 
        isDateModalOpen
    } = useSelector( state => state.ui );

    // Método para abrir el modal
    const openDateModal = () => {
        dispatch( onOpenDateModal() )
    }

    // Método para cerrar el modal
    const closeDateModal = () => {
        dispatch( onCloseDateModal() )
    }

    // Método para alternar el estado del modal
    const toggleDateModal = () => {
        (isDateModalOpen)
            ? closeDateModal()
            : openDateModal(); 
    }

    return {
        //* Propiedades
        isDateModalOpen,    

        //* Métodos
        closeDateModal,
        openDateModal, 
        toggleDateModal,  
    }

}