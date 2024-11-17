//*Imports: Se importan los hooks, componentes y estilos necesarios.
//* Estado y hooks: Se configuran los hooks para manejar el estado de los eventos y la interfaz de usuario.
//* Funciones de manejo:
//*   - eventStyleGetter: Personaliza el estilo de los eventos en el calendario.
//*   - onDoubleClick: Abre el modal de edición de eventos al hacer doble clic.
//*   - onSelect: Establece el evento activo cuando se selecciona.
//*   - onViewChanged: Almacena y actualiza la última vista seleccionada.
//* Renderización: El componente muestra la barra de navegación, el calendario con sus configuraciones, el modal
//*                de edición de eventos, los botones de agregar y eliminar eventos y el componente de mensajes.


// Importamos las dependencias y componentes necesarios
import { useEffect, useState } from 'react';
import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { Navbar, CalendarEvent, CalendarModal, FabAddNew, FabDelete} from '../';

import { localizer, getMessagesES } from '../../helpers';
import { useUiStore, useCalendarStore, useAuthStore } from '../../hooks';

// Componente principal de la página del calendario
export const CalendarPage = () => {

  // Hooks para manejar el estado y la interfaz
  const { user } = useAuthStore();
  const { openDateModal } = useUiStore(); // Función para abrir el modal de eventos
  const { events, setActiveEvent, startLoadingEvents } = useCalendarStore();  // Estado de eventos y función para establecer un evento activo
  
  // Estado para recordar la última vista seleccionada
  const [ lastView, setLastView ] = useState(localStorage.getItem('lastView') || 'week' );

  // Función para personalizar el estilo de los eventos del calendario
  const eventStyleGetter = ( event, start, end, isSelected ) => {
    
    const isMyEvent = ( user.uid === event.user._id ) || ( user.uid === event.user.uid );

    const style = {
      backgroundColor: isMyEvent ? '#347CF7' : '#465660', // Color de fondo del evento (azul para mis eventos, gris para otros)
      borderRadius: '0px',  // Bordes del evento
      opacity: 0.8, // Opacidad del evento
      color: 'white'  // Color del texto del evento
    }

    return {
      style
    }
  }

  // Función para manejar el doble clic en un evento
  const onDoubleClick = ( event ) => {
    // console.log({ doubleClick: event });
    openDateModal();  // Abre el modal de edición de eventos
  }

  // Función para manejar la selección de un evento
  const onSelect = ( event ) => {
    // console.log({ click: event });
    setActiveEvent( event );  // Establece el evento activo
  }

  // Función para manejar el cambio de vista del calendario
  const onViewChanged = ( event ) => {
    localStorage.setItem('lastView', event);  // Almacena la última vista en localStorage
    setLastView(event);  // Actualiza el estado de la última vista
  }

  // Función para cargar los eventos del calendario
  useEffect(() => {
    startLoadingEvents();
  }, []);

  // Renderización del componente
  return (
    <>
      <Navbar />  {/* Barra de navegación */}

      <Calendar
        culture='es'  // Configura el calendario para el idioma español
        localizer={ localizer } //Configuración de fechas y localización
        events={ events } // Eventos del calendario obtenidos desde el store
        defaultView={ lastView }  // Vista predeterminada
        startAccessor="start" // Atributo para la hora de inicio del evento
        endAccessor="end" // Atributo para la hora de finalización del evento
        style={{ height: 'calc( 100vh - 80px )' }}  // Estilo que ajusta la altura del calendario
        messages={ getMessagesES() }  // Mensajes en español para la UI
        eventPropGetter={ eventStyleGetter }  // Función para personalizar el estilo de los eventos
        components={{
          event: CalendarEvent, // Componente personalizado para renderizar los eventos
        }}
        onDoubleClickEvent={ onDoubleClick }  // Maneja el doble clic sobre un evento
        onSelectEvent={ onSelect }  // Maneja la selección de un evento
        onView={ onViewChanged }  // Maneja el cambio de vista del calendario
      />

      
      <CalendarModal /> {/* Modal para editar o crear eventos */}
      <FabAddNew /> {/* Botón flotante para agregar un nuevo evento */}
      <FabDelete /> {/* Botón flotante para eliminar un evento */}
    </>
  )
}
