//* Este componente es utilizado para personalizar cómo se ven los eventos dentro del calendario. 
//* Cada evento del calendario mostrará su título seguido del nombre del usuario.

// Componente que renderiza un evento específico en el calendario
export const CalendarEvent = ({ event }) => {
    
    // Desestructura el título del evento y el nombre del usuario
    const { title, user } = event;
    
    return (
        <>
            {/* Muestra el título del evento en negrita */}
            <strong>{ title }</strong>
            {/* Muestra el nombre del usuario responsable del evento */}
            <span> - { user.name }</span>
        </>
    )
}
