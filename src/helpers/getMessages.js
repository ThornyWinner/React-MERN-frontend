//* Esta función devuelve un objeto con traducciones en español para personalizar los textos que se muestran en la vista del calendario.
//* allDay: Traducción de "All day" (todo el día).
//* previous y next: Definen los textos o símbolos que se muestran para navegar entre las fechas (anterior y siguiente).
//* today: Traducción de "Today" para llevar al usuario al día actual.
//* month, week, day, agenda: Definen las vistas disponibles en el calendario.
//* date, time, event: Etiquetas de las columnas para organizar eventos por fecha, hora y título.
//* noEventsInRange: Mensaje que se muestra si no hay eventos en el rango seleccionado.
//* showMore: Función que recibe el número total de eventos adicionales no mostrados y los indica con un texto como "+ Ver más (total)".


export const getMessagesES = () => {
    return {
        allDay: 'Todo el día',  // Texto para eventos que duran todo el día
        previous: '<',  // Texto para botón de navegación anterior
        next: '>',  // Texto para botón de navegación siguiente
        today: 'Hoy',   // Texto para botón de hoy
        month: 'Mes',   // Texto para la vista de mes
        week: 'Semana', // Texto para la vista de semana
        day: 'Día', // Texto para la vista de día
        agenda: 'Agenda',   // Texto para la vista de agenda
        date: 'Fecha',  // Texto de cabecera para la columna de fecha
        time: 'Hora',   // Texto de cabecera para la columna de hora
        event: 'Evento',    // Texto de cabecera para la columna de evento
        noEventsInRange: 'No hay eventos en este rango',    // Mensaje cuando no hay eventos en el rango seleccionado
        showMore: total => `+ Ver más (${total})`   // Texto para mostrar más eventos cuando hay muchos
    };
}