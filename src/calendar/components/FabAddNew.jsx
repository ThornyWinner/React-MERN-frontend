//* Hooks y estado: Define openDateModal y setActiveEvent para abrir el modal y preparar los valores de un nuevo evento.
//* Manejador de clic: La función handleClickNeW crea un nuevo evento con valores iniciales predeterminados.
//* Renderización: Renderiza un botón flotante que, al hacer clic, ejecuta la función handleClickNeW y abre el modal de evento.


// Importamos las funciones para manejar fechas y hooks personalizados
import { addHours } from "date-fns";
import { useCalendarStore, useUiStore } from "../../hooks"

// Componente de botón flotante FabAddNew para crear un nuevo evento en el calendario
export const FabAddNew = () => {
  
    // Función para abrir el modal desde el hook personalizado useUiStore
    const { openDateModal } = useUiStore();
    // Función para establecer un evento activo en el estado del calendario desde useCalendarStore
    const { setActiveEvent } = useCalendarStore();

    // Función para manejar el clic en el botón y establecer los valores predeterminados del nuevo evento
    const handleClickNeW= () => {
        
        setActiveEvent({
            title: '',  // Título vacío como valor inicial
            notes: '',  // Notas vacías como valor inicial
            start: new Date(),  // Fecha de inicio como la actual
            end: addHours( new Date(), 2),  // Fecha de finalización dos horas después de la de inicio
            bgColor: '#fafafa', // Color de fondo predeterminado
            user: {
              _id: '123',   // ID de usuario de ejemplo
              name: 'Héctor'    // Nombre del usuario que crea el evento
            }
        });
        openDateModal();    // Abre el modal de creación de evento
    }

    // Renderización del botón flotante con icono de "más" y un evento de clic
    return (
    <button
        className="btn btn-primary fab"
        onClick={ handleClickNeW }
    >
        <i className="fas fa-plus"></i> 
    </button>
  )
}
