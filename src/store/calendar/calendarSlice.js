//* Este slice es útil en una aplicación de calendario donde se manejan eventos como citas, reuniones, etc., 
//* permitiendo la adición, actualización, y eliminación de eventos, así como la gestión del evento activo.
//* tempEvent: Es un evento temporal que se usa como ejemplo en el estado inicial. Contiene detalles como título, 
//*            notas, fecha de inicio, fin, color y el usuario asociado al evento.
//* initialState: 
//*     - events: Es un array que contiene todos los eventos. Inicialmente, contiene solo el tempEvent.
//*     - activeEvent: Es el evento seleccionado actualmente por el usuario, si existe. Comienza como null (ningún evento activo).
//* Reducers:
//*     - onSetActiveEvent: Establece el evento que ha sido seleccionado por el usuario como el "evento activo".
//*     - onAddNewEvent: Añade un nuevo evento al array de eventos y luego establece activeEvent a null.
//*     - onUpdateEvent: Actualiza un evento existente buscando el que coincida con el ID del payload.
//*     - onDeleteEvent: Elimina el evento activo actual si existe, filtrándolo del array de eventos.
//* Exportación de Action Creators: Redux Toolkit genera automáticamente los action creators que permiten despachar las acciones
//*                                 correspondientes a cada reducer (onSetActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent).


import { createSlice } from "@reduxjs/toolkit";
import { addHours } from "date-fns";

// Evento temporal para inicializar el estado
const tempEvent = {
    _id: new Date().getTime(),  // ID único generado con el timestamp actual
    title: 'Cumpleaños del Jefe',
    notes: 'Hay que comprar el pastel',
    start: new Date(),  // Fecha de inicio del evento
    end: addHours( new Date(), 2),  // Fecha de fin, 2 horas después del inicio
    bgColor: '#fafafa', // Color de fondo
    user: {
      _id: '123',   // ID del usuario asociado al evento 
      name: 'Héctor'
    }
  }

export const calendarSlice = createSlice({
    name: 'calendar',   // Nomrbe del slice
    initialState: {
        events: [
            tempEvent
        ],  // Estado inicial con un evento temporal
        activeEvent: null   // Evento activo inicialmente es nulo (ningún evento seleccionado)
    },
    reducers: {
        // Reducer para establecer el evento activo
        onSetActiveEvent: ( state, { payload } ) => {
            state.activeEvent = payload;
        },
        // Reducer para añadir un nuevo evento
        onAddNewEvent: ( state, { payload } ) => {
            state.events.push( payload );   // Añade el evento a la lista de eventos
            state.activeEvent = null;   // Limpia el evento activo
        },
        // Reducer para actualizar un evento existente
        onUpdateEvent: ( state, { payload } ) => {
            state.events = state.events.map( event => {
                if( event._id === payload._id ){
                    return payload; // Reemplaza el evento si los IDs coinciden
                }
                
                return event;   // Si no coinciden, retorna el evento tal como estaba
            });
        },
        // Reducer para eliminar el evento activo
        onDeleteEvent: ( state ) => {
            if ( state.activeEvent ){
                state.events = state.events.filter( event => event._id !== state.activeEvent._id ); // Filtra el evento activo
                state.activeEvent = null ;  // Limpia el evento activo 
            }
        }
    }
});


// Action creators generados automáticamente para cada función reductora
export const { onSetActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent } = calendarSlice.actions;