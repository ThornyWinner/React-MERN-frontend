//* Propiedades extraídas del estado del calendario:
//*     - events: Lista de eventos del calendario, obtenida desde el estado global.
//*     - activeEvent: Evento actualmente activo o seleccionado.
//* Funciones del hook:
//*     - setActiveEvent: Selecciona un evento como el evento activo en el estado.
//*     - startSavingEvent: Guarda el evento en el estado; si el evento tiene un _id, actualiza el evento existente,
//*                         de lo contrario, crea un nuevo evento y le asigna un ID único.
//*     - startDeletingEvent: Elimina el evento activo del estado.
//*     - startDeletingEvent: Elimina el evento activo del estado.
//*     - startLoadingEvents: Carga los eventos del calendario desde el servidor.
//* Retorno del hook: Propiedades y métodos que permiten a los componentes interactuar con el estado y realizar 
//*                   operaciones CRUD sobre los eventos del calendario desde cualquier lugar de la aplicación.

import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { calendarApi } from '../api';
import { convertEventsToDateEvents } from '../helpers';
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent, onLoadEvents } from '../store';


export const useCalendarStore = () => {
  
    const dispatch = useDispatch();
    const { events, activeEvent } = useSelector( state => state.calendar ); // Extraemos el estado del calendario desde Redux
    const { user } = useSelector( state => state.auth );

    // Establece un evento activo
    const setActiveEvent = ( calendarEvent ) => {
        dispatch( onSetActiveEvent( calendarEvent ) );
    }

    // Inicia la operación de guardar un evento, ya sea para actualizar o crear uno nuevo
    const startSavingEvent = async( calendarEvent ) => {
        
        try {
            
            if( calendarEvent.id ) {
                // Actualizando
                await calendarApi.put(`/events/${ calendarEvent.id }`, calendarEvent);
                dispatch( onUpdateEvent({ ...calendarEvent, user }) );
                return;
            }

            // TODO: Validar que el usuario sea el propietario del evento (no debe abrir el modal, la idea es que sea como el delete)
            


    
            // Creando
            const { data } = await calendarApi.post('/events', calendarEvent);
            dispatch( onAddNewEvent({ ...calendarEvent, id: data.evento.id, user}) );

        } catch (error) {
            console.log(error);
            Swal.fire('Error al guardar', error.response.data.msg, 'error');
        }
        
    }

    // Elimina el evento activo
    const startDeletingEvent = async() => {
        
        try {

            await calendarApi.delete( `/events/${ activeEvent.id }` );
            dispatch( onDeleteEvent() );

        } catch (error) {
            console.log(error);
            Swal.fire('Error al eliminar', error.response.data.msg, 'error');
        }

    }
    
    // Función para cargar/mostrar los eventos del calendario
    const startLoadingEvents = async() => {
        
        try {

            const { data } = await calendarApi.get('/events');
            const events = convertEventsToDateEvents( data.eventos );
            dispatch(onLoadEvents( events ));
            
        } catch (error) {
            console.log('Error cargando eventos');
            console.log(error);
        }
        
    }

    return {
        //* Propiedades
        activeEvent,    // Evento actualmente seleccionado
        events,     // Lista de eventos del calendario
        hasEventSelected: !!activeEvent,    // Verifica si hay un evento activo

        //* Métodos
        setActiveEvent, // Método para seleccionar un evento como activo
        startDeletingEvent, // Método para eliminar el evento activo
        startLoadingEvents,  // Método para cargar los eventos del calendario
        startSavingEvent   // Método para guardar o actualizar un evento
    }

}
