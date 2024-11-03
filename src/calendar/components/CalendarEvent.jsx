//* Extracción de propiedades: El componente desestructura title y user desde el objeto event.
//* Renderización: Muestra el title del evento en negrita y el name del user asociado, separados por un guion.


// Componente funcional CalendarEvent para mostrar detalles de un evento del calendario.
export const CalendarEvent = ({ event }) => {
    
     // Extraemos las propiedades title (título del evento) y user (usuario que creó el evento) del objeto event.
    const { title, user } = event;
    
    return (
        <>
            {/* Renderizamos el título del evento en negrita y el nombre del usuario asociado al evento */}
            <strong>{ title }</strong>
            <span> - { user.name }</span>
        </>
    )
}
