//* Este código utiliza React Big Calendar para renderizar un calendario interactivo y gestiona eventos como clics y cambios de vista, 
//* todo con el soporte de los hooks personalizados para el estado global (con Redux o Context).
//* useState: Guarda la última vista del calendario y permite actualizarla. La vista se persiste en localStorage para que se mantenga entre recargas de la página.
//* eventStyleGetter: Personaliza el estilo de los eventos en el calendario. En este caso se le asigna un fondo azul con opacidad.
//* onDoubleClick: Abre el modal cuando se hace doble clic en un evento.
//* onSelect: Marca un evento como activo cuando se selecciona.
//* onViewChanged: Actualiza la vista del calendario y la guarda en localStorage.
//* Componentes adicionales: CalendarModal para agregar/editar eventos, FabAddNew para un botón de acción flotante, y FabDelete para eliminar eventos.


// Importa los hooks de React y los componentes necesarios
import { useState } from 'react';
import { Calendar } from 'react-big-calendar';
// Importa los estilos predeterminados de react-big-calendar
import 'react-big-calendar/lib/css/react-big-calendar.css';

//Importa componentes personalizados y helpers de la aplicación
import { CalendarEvent, CalendarModal, FabAddNew, FabDelete, Navbar } from '../';
import { localizer, getMessagesES } from '../../helpers';
import { useUiStore, useCalendarStore } from '../../hooks';

// Componente que renderiza la página del calendario
export const CalendarPage = () => {

  // Hook personalizado para manejar el estado de la interfaz (UI)
  const { openDateModal } = useUiStore();
  // Hook personalizado para manejar el estado del calendario
  const { events, setActiveEvent } = useCalendarStore();
  
  // Estado para almacenar la última vista del calendario, guardada en localStorage para persistencia
  const [ lastView, setLastView ] = useState(localStorage.getItem('lastView') || 'week' );

  // Función que personaliza el estilo de los eventos del calendario
  const eventStyleGetter = ( event, start, end, isSelected ) => {

    const style = {
      backgroundColor: '#347CF7', // Color de fondo azul
      borderRadius: '0px',  // Sin bordes redondeados
      opacity: 0.8, // Transparencia
      color: 'white'  // Texto en blanco
    }

    return {
      style // Retorna el estilo personalizado
    }
  }

  // Maneja el evento de doble clic sobre un evento del calendario
  const onDoubleClick = ( event ) => {
    // console.log({ doubleClick: event });
    openDateModal();  // Abre el modal para editar el evento
  }

  // Maneja la selección de un evento del calendario
  const onSelect = ( event ) => {
    // console.log({ click: event });
    setActiveEvent( event );  // Establece el evento seleccionado como activo
  }

  // Maneja el cambio de vista del calendario (día, semana, mes)
  const onViewChanged = ( event ) => {
    localStorage.setItem('lastView', event);  // Guarda la vista actual en localStorage
    setLastView(event); // Actualiza el estado de la vista
  }

  return (
    <>
      {/* Barra de navegación de la aplicación */}
      <Navbar />

      {/* Componente de calendario de react-big-calendar */}
      <Calendar
        culture='es'  // Cultura en español
        localizer={ localizer } // Configuración de fechas y localización
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

      {/* Modal para agregar o editar eventos */}
      <CalendarModal />
      
      {/* Botóm flotante para agregar un nuevo evento */}
      <FabAddNew />
      {/* Botón flotante para eliminar el evento activo */}
      <FabDelete />
    </>
  )
}
