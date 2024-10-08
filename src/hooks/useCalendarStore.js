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
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from "../store";

export const useCalendarStore = () => {
  
    const dispatch = useDispatch();
    const { events, activeEvent } = useSelector( state => state.calendar ); //Obtiene el estado de eventos y evento activo desde Redux
  
    // Establece el evento activo (seleccionado)
    const setActiveEvent = ( calendarEvent ) => {
        dispatch( onSetActiveEvent( calendarEvent ) );  // Despacha la acción para establecer el evento activo
    }

    // Guarda un evento, ya sea nuevo o actualizado
    const startSavingEvent = async( calendarEvent ) => {
        // TODO: Llegar al backend para guardar el evento

        // Todo bien
        // Si el evento ya tiene un _id, significa que debe actualizarse
        if( calendarEvent._id ) {
            // Actualizando
            dispatch( onUpdateEvent({ ...calendarEvent }) );    // Despacha la acción para actualizar el evento
        } else{
            // Si no tiene _id, significa que es un nuevo evento
            // Creando
            dispatch( onAddNewEvent({ ...calendarEvent, _id: new Date().getTime() }) ); // Despacha la acción para agregar un nuevo evento
        }
    }

    // Elimina el evento activo
    const startDeletingEvent = () => {
        // TODO: Llegar al backend para eliminar el evento

        dispatch( onDeleteEvent() );    // Despacha la acción para eliminar el evento activo
    }
    
    return {
        //* Propiedades
        activeEvent,    // El evento activo actual
        events, // Lista de todos los eventos
        hasEventSelected: !!activeEvent,    // Verifica si hay un evento seleccionado

        //* Métodos
        startDeletingEvent, // Método para eliminar el evento activo
        setActiveEvent, // Método para establecer un evento como activo
        startSavingEvent,   // Método para guardar un evento (crear o actualizar)
    }

}
