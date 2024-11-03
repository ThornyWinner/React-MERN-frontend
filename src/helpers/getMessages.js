//* Mensajes de Interfaz: Cada propiedad representa un texto específico que react-big-calendar usa en su interfaz. 
//*                       Esta función ajusta estos textos al español, permitiendo que el calendario tenga una interfaz amigable y localizada.
//* showMore: La propiedad showMore es una función que recibe el parámetro total, el cual indica la cantidad de eventos adicionales. 
//*           Devuelve el texto "Ver más" junto con el número de eventos adicionales en el día, en un formato como "+ Ver más (3)".
//* Uso en el proyecto: Esta función puede ser importada en el archivo donde se configura react-big-calendar para asignar estos mensajes y ajustar la interfaz en español.


// Exportamos una función que retorna los mensajes en español para react-big-calendar
export const getMessagesES = () => {
    return {
        allDay: 'Todo el día',  // Texto para eventos que duran todo el día
        previous: '<',  // Texto para el botón de navegación anterior
        next: '>',  // Texto para el botón de navegación siguiente
        today: 'Hoy',   // Texto para el botón de "hoy"
        month: 'Mes',   // Texto para la vista de "mes"
        week: 'Semana', // Texto para la vista de "semana"
        day: 'Día',  // Texto para la vista de "día"
        agenda: 'Agenda',   // Texto para la vista de "agenda"
        date: 'Fecha',  // Etiqueta para el campo de fecha
        time: 'Hora',   // Etiqueta para el campo de hora
        event: 'Evento',    // Texto genérico para "evento"
        noEventsInRange: 'No hay eventos en este rango',    // Texto cuando no hay eventos visibles en el rango seleccionado
        showMore: total => `+ Ver más (${total})`   // Texto para ver más eventos, con el total de eventos ocultos
    };
}