//* Hooks de estado: startDeletingEvent se usa para eliminar el evento activo, y hasEventSelected indica si hay un evento seleccionado.
//* Manejador de clic: La función handleDelete llama a startDeletingEvent para eliminar el evento.
//* Renderización condicional: El botón solo es visible si hasEventSelected es verdadero.


// Importamos los hooks personalizados para interactuar con el estado del calendario y la interfaz de usuario
import { useCalendarStore } from '../../hooks'

// Componente FabDelete para mostrar un botón flotante que permite eliminar eventos del calendario
export const FabDelete = () => {

    // Extraemos las funciones startDeletingEvent y hasEventSelected del hook useCalendarStore
    const { startDeletingEvent, hasEventSelected } = useCalendarStore();

    // Función para manejar la acción de eliminar un evento al hacer clic en el botón
    const handleDelete = () => {
        startDeletingEvent();   
    }

    // Renderización del botón, que se muestra solo cuando hay un evento seleccionado (hasEventSelected)
    return (
    <button
        aria-label="btn-delete"
        className="btn btn-danger fab-danger"
        onClick={ handleDelete }
        style={{
            display: hasEventSelected ? '': 'none'  // Condicional para mostrar u ocultar el botón
        }}
    >
        <i className="fas fa-trash-alt"></i>
    </button>
  )
}
