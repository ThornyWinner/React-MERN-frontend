//* Este hook facilita la manipulación de eventos desde cualquier componente que necesite interactuar con el calendario. 
//* Por ejemplo, un componente podría usar setActiveEvent para seleccionar un evento, o startSavingEvent para guardar uno.
//* Este diseño deja espacio para futuras mejora, como agregar lógica para manejar interacciones con el backend (que está pendiente con los comentarios // TODO).
//* setActiveEvent(calendarEvent): Establece el evento que ha sido seleccionado como el "evento activo". 
//*                                Usa el dispatch para despachar la acción onSetActiveEvent con el evento que seleccionó.
//* startSavingEvent(calendarEvent): Dependiendo de si el evento tiene un _id o no, decide si debe agregar un nuevo evento o actualizar uno existente. 
//*                                  Si el evento tiene un _id, usa la acción onUpdateEvent para actualizar el evento. Si el evento no tiene un _id, 
//*                                  lo trata como un nuevo evetno y despacha la acción onAddNewEvent, asignando un _id único generado por newDate().getTime().
//* startDeletingEvent(): Elimina el evento activo actual utilizando la acción onDeleteEvent.
//* hasEventSelected: Propiedad booleana que verifica si existe un evento activo seleccionado. 
//*                   Es útil para habilitar o dehabilitar opciones como "Eliminar evento" en la interfaz.


import { useDispatch, useSelector } from "react-redux"
import Swal from "sweetalert2";
import { calendarApi } from "../api";
import { convertEventsToDateEvents } from "../helpers";
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from "../store";



export const useCalendarStore = () => {
  
    const dispatch = useDispatch();
    const { events, activeEvent } = useSelector( state => state.calendar ); //Obtiene el estado de eventos y evento activo desde Redux
    const { user } = useSelector( state => state.auth );

    // Establece el evento activo (seleccionado)
    const setActiveEvent = ( calendarEvent ) => {
        dispatch( onSetActiveEvent( calendarEvent ) );  // Despacha la acción para establecer el evento activo
    }

    // Guarda un evento, ya sea nuevo o actualizado
    const startSavingEvent = async( calendarEvent ) => {
        
        try {

            // Si el evento ya tiene un id, significa que debe actualizarse
            if( calendarEvent.id ) {
                // Actualizando
                await calendarApi.put(`/events/${ calendarEvent.id }`, calendarEvent );
                dispatch( onUpdateEvent({ ...calendarEvent, user }) );    // Despacha la acción para actualizar el evento
                return;
            } 

            // Creando
            const { data } = await calendarApi.post('/events', calendarEvent );
            dispatch( onAddNewEvent({ ...calendarEvent, id: data.evento.id, user }) ); // Despacha la acción para agregar un nuevo evento
        
        } catch (error) {
            console.log(error);
            Swal.fire('Error al guardar', error.response.data.msg, 'error');
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

    const startLoadingEvents = async() => {
        try {
            
            const {data} = await calendarApi.get('/events');
            const events = convertEventsToDateEvents( data.eventos );
            dispatch( onLoadEvents( events ) );

        } catch (error) {
            console.log('Error cargando eventos');
            console.log(error);
        }
    }
    
    return {
        //* Propiedades
        activeEvent,    // El evento activo actual
        events, // Lista de todos los eventos
        hasEventSelected: !!activeEvent,    // Verifica si hay un evento seleccionado

        //* Métodos
        startDeletingEvent, // Método para eliminar el evento activo
        setActiveEvent, // Método para establecer un evento como activo
        startLoadingEvents,
        startSavingEvent,   // Método para guardar un evento (crear o actualizar)
    }

}
