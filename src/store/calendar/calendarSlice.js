//* tempEvent: Evento de ejemplo para la inicialización, que incluye detalles como título,
//*            notas, fecha de inicio y fin, color de fondo, y el usuario asociado.
//* initialState: Contiene un arreglo events inicializado con tempEvent y una propiedad activeEvent 
//*               inicializada como null, indicando que ningún evento está activo al cargar.
//* Reducers:
//*     - onSetActiveEvent: Marca un evento como activo, permitiendo su edición o eliminación.
//*     - onAddNewEvent: Agrega un nuevo evento y desactiva cualquier evento activo.
//*     - onUpdateEvent: Busca y actualiza un evento existente en el arreglo events.
//*     - onDeleteEvent: Elimina el evento activo y lo desactiva.
//* Exportación de acciones: Las acciones onSetActiveEvent, onAddNewEvent, onUpdateEvent y onDeleteEvent 
//*                          se exportan para que puedan ser utilizadas desde otras partes de la aplicación.


import { createSlice } from "@reduxjs/toolkit";
// import { addHours } from "date-fns";

<<<<<<< HEAD
// Evento temporal de ejemplo para inicializar el estado
const tempEvent = {
    _id: new Date().getTime(),
    title: 'Cumpleaños del Jefe',
    notes: 'Hay que comprar el pastel',
    start: new Date(),
    end: addHours( new Date(), 2),
    bgColor: '#fafafa',
    user: {
      _id: '123',
      name: 'Héctor'
    }
  }
=======
// Evento temporal para inicializar el estado
// const tempEvent = {
//     _id: new Date().getTime(),  // ID único generado con el timestamp actual
//     title: 'Cumpleaños del Jefe',
//     notes: 'Hay que comprar el pastel',
//     start: new Date(),  // Fecha de inicio del evento
//     end: addHours( new Date(), 2),  // Fecha de fin, 2 horas después del inicio
//     bgColor: '#fafafa', // Color de fondo
//     user: {
//       _id: '123',   // ID del usuario asociado al evento 
//       name: 'Héctor'
//     }
//   }
>>>>>>> cff31ad35a421d0e15a73fcf2ee8031810f50dca

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        isLoadingEvents: true,
        events: [
<<<<<<< HEAD
            tempEvent   // Inicialización del evento temporal
        ],
        activeEvent: null   // Ningun evento activo	por defecto
=======
            // tempEvent
        ],  // Estado inicial con un evento temporal
        activeEvent: null   // Evento activo inicialmente es nulo (ningún evento seleccionado)
>>>>>>> cff31ad35a421d0e15a73fcf2ee8031810f50dca
    },
    reducers: {
        // Activa un evento seleccionándolo
        onSetActiveEvent: ( state, { payload } ) => {
            state.activeEvent = payload;
        },
        // Añade un evento nuevo a la lista de eventos
        onAddNewEvent: ( state, { payload } ) => {
            state.events.push( payload );
            state.activeEvent = null;   // Desactiva el evento activo
        },
        // Actualiza un evento en la lista de eventos
        onUpdateEvent: ( state, { payload } ) => {
            state.events = state.events.map( event => {
<<<<<<< HEAD
                if( event._id === payload._id ){    // Identifica el evento a actualizar
                    return payload; // Retorna el evento actualizado
=======
                if( event.id === payload.id ){
                    return payload; // Reemplaza el evento si los IDs coinciden
>>>>>>> cff31ad35a421d0e15a73fcf2ee8031810f50dca
                }
                
                return event;   // Retorna el evento sin cambios
            });
        },
        // Elimina el evento activo
        onDeleteEvent: ( state ) => {
            if ( state.activeEvent ){
<<<<<<< HEAD
                state.events = state.events.filter( event => event._id !== state.activeEvent._id );
                state.activeEvent = null ;  // Desactiva el evento activo tras eliminarlo
=======
                state.events = state.events.filter( event => event.id !== state.activeEvent.id ); // Filtra el evento activo
                state.activeEvent = null ;  // Limpia el evento activo 
>>>>>>> cff31ad35a421d0e15a73fcf2ee8031810f50dca
            }
        },
        onLoadEvents: (state, { payload = [] }) => {
            state.isLoadingEvents = false;
            // state.events = payload;
            payload.forEach( event => {
                const exists = state.events.some( dbEvent => dbEvent.id === event.id );
                if ( !exists ) {
                    state.events.push( event )
                }
            })
        },
        onLogoutCalendar:( state ) => {
            state.isLoadingEvents = true,
            state.events = [
            ],  // Estado inicial con un evento temporal
            state.activeEvent = null   // Evento activo inicialmente es nulo (ningún evento seleccionado)
        }
    }
});


// Action creators generados automáticamente para cada función reductora
export const {
    onAddNewEvent,
    onDeleteEvent,
    onLoadEvents,
    onLogoutCalendar,
    onSetActiveEvent,
    onUpdateEvent
} = calendarSlice.actions;