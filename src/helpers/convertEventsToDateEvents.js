//* Función para convertir un array de eventos en un array de objetos DateEvent, 
//* que se pueden usar en el calendario de React Big Calendar.
//* Para cada evento, se convierte la fecha de inicio y la fecha de fin a objetos Date usando la función parseISO.
//* Se devuelve el array de objetos DateEvent.

import { parseISO } from "date-fns";


export const convertEventsToDateEvents = ( events ) => {

    return events.map( event => {
        
        // Convierte las fechas en texto a objetos Date usando parseISO
        event.start = parseISO( event.start );
        event.end = parseISO( event.end );
       
        return event;
    })

}