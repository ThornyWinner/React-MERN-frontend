//* Propiedades extraídas del estado del calendario:
//*     - events: Lista de eventos del calendario, obtenida desde el estado global.
//*     - activeEvent: Evento actualmente activo o seleccionado.
//* Funciones del hook:
//*     - setActiveEvent: Selecciona un evento como el evento activo en el estado.
//*     - startSavingEvent: Guarda el evento en el estado; si el evento tiene un _id, actualiza el evento existente,
//*                         de lo contrario, crea un nuevo evento y le asigna un ID único.
//*     - startDeletingEvent: Elimina el evento activo del estado.
//* Retorno del hook: Propiedades y métodos que permiten a los componentes interactuar con el estado y realizar 
//*                   operaciones CRUD sobre los eventos del calendario desde cualquier lugar de la aplicación.

import { useDispatch, useSelector } from 'react-redux';
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from '../store';


export const useCalendarStore = () => {
  
    const dispatch = useDispatch();
    const { events, activeEvent } = useSelector( state => state.calendar ); // Extraemos el estado del calendario desde Redux
  
    // Establece un evento activo
    const setActiveEvent = ( calendarEvent ) => {
        dispatch( onSetActiveEvent( calendarEvent ) );
    }

    // Inicia la operación de guardar un evento, ya sea para actualizar o crear uno nuevo
    const startSavingEvent = async( calendarEvent ) => {
        // TODO: llegar al backend

        // Todo bien
        if( calendarEvent._id ) {
            // Actualizando
            dispatch( onUpdateEvent({ ...calendarEvent }) );
        } else {
            // Creando
            dispatch( onAddNewEvent({ ...calendarEvent, _id: new Date().getTime() }) );
        }
        
    }

    // Elimina el evento activo
    const startDeletingEvent = async() => {
        // Todo: Llegar al backend


        dispatch( onDeleteEvent() );
    }
    
    return {
        //* Propiedades
        activeEvent,    // Evento actualmente seleccionado
        events,     // Lista de eventos del calendario
        hasEventSelected: !!activeEvent,    // Verifica si hay un evento activo

        //* Métodos
        startDeletingEvent, // Método para eliminar el evento activo
        setActiveEvent, // Método para seleccionar un evento como activo
        startSavingEvent,   // Método para guardar o actualizar un evento
    }

}
