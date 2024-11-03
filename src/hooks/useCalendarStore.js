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

import { useDispatch, useSelector } from "react-redux"
import Swal from "sweetalert2";
import { calendarApi } from "../api";
import { convertEventsToDateEvents } from "../helpers";
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from "../store";



export const useCalendarStore = () => {
  
    const dispatch = useDispatch();
<<<<<<< HEAD
    const { events, activeEvent } = useSelector( state => state.calendar ); // Extraemos el estado del calendario desde Redux
  
    // Establece un evento activo
=======
    const { events, activeEvent } = useSelector( state => state.calendar ); //Obtiene el estado de eventos y evento activo desde Redux
    const { user } = useSelector( state => state.auth );

    // Establece el evento activo (seleccionado)
>>>>>>> cff31ad35a421d0e15a73fcf2ee8031810f50dca
    const setActiveEvent = ( calendarEvent ) => {
        dispatch( onSetActiveEvent( calendarEvent ) );
    }

    // Inicia la operación de guardar un evento, ya sea para actualizar o crear uno nuevo
    const startSavingEvent = async( calendarEvent ) => {
        
        try {

            // Si el evento ya tiene un id, significa que debe actualizarse
            if( calendarEvent.id ) {
                // Actualizando
                await calendarApi.put(`/events/${ calendarEvent.id }`, calendarEvent );
                dispatch( onUpdateEvent({ ...calendarEvent, user }) );    // Despacha la acción para actualizar el evento
                return;
            } 

<<<<<<< HEAD
        // Si el evento ya tiene un ID, se actualiza; si no, se crea uno nuevo
        if( calendarEvent._id ) {
            // Actualizando
            dispatch( onUpdateEvent({ ...calendarEvent }) );
        } else{
            // Creando
            dispatch( onAddNewEvent({ ...calendarEvent, _id: new Date().getTime() }) );
=======
            // Creando
            const { data } = await calendarApi.post('/events', calendarEvent );
            dispatch( onAddNewEvent({ ...calendarEvent, id: data.evento.id, user }) ); // Despacha la acción para agregar un nuevo evento
        
        } catch (error) {
            console.log(error);
            Swal.fire('Error al guardar', error.response.data.msg, 'error');
>>>>>>> cff31ad35a421d0e15a73fcf2ee8031810f50dca
        }
        
    }

    // Elimina el evento activo
    const startDeletingEvent = async() => {
        try{
            await calendarApi.delete(`/events/${ activeEvent.id }` );
            dispatch( onDeleteEvent() );    // Despacha la acción para eliminar el evento activo
        } catch (error){
            console.log(error);
            Swal.fire('Error al eliminar', error.response.data.msg, 'error');
        }
    }

<<<<<<< HEAD
        dispatch( onDeleteEvent() );
=======
    const startLoadingEvents = async() => {
        try {
            
            const {data} = await calendarApi.get('/events');
            const events = convertEventsToDateEvents( data.eventos );
            dispatch( onLoadEvents( events ) );

        } catch (error) {
            console.log('Error cargando eventos');
            console.log(error);
        }
>>>>>>> cff31ad35a421d0e15a73fcf2ee8031810f50dca
    }
    
    return {
        //* Propiedades
        activeEvent,    // Evento actualmente seleccionado
        events,     // Lista de eventos del calendario
        hasEventSelected: !!activeEvent,    // Verifica si hay un evento activo

        //* Métodos
        startDeletingEvent, // Método para eliminar el evento activo
<<<<<<< HEAD
        setActiveEvent, // Método para seleccionar un evento como activo
        startSavingEvent,   // Método para guardar o actualizar un evento
=======
        setActiveEvent, // Método para establecer un evento como activo
        startLoadingEvents,
        startSavingEvent,   // Método para guardar un evento (crear o actualizar)
>>>>>>> cff31ad35a421d0e15a73fcf2ee8031810f50dca
    }

}
