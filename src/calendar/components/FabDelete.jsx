//* startDeletingEvent: Función del hook useCalendarStore que se encarga de iniciar la eliminación del evento seleccionado.
//* hasEventSelected: Es un booleano que indica si hay un evento seleccionado en el calendario. El botón de eliminar solo se muestra si hay un elemento seleccionado.
//* Botón de eliminar: El botón tiene una clase CSS fab-danger, que suele usarse para estilos visuales de advertencia o peligro. Se oculta cuando no hay eventos seleccionados.


import { useCalendarStore, useUiStore } from "../../hooks"  // Importación de hooks personalizados para el calendario y la UI

export const FabDelete = () => {

    // Obtener las funciones del hook personalizado
    const { startDeletingEvent, hasEventSelected } = useCalendarStore();

    // Función que se ejecuta al hacer clic en el botón de eliminar
    const handleDelete = () => {
        startDeletingEvent();   // Llama a la función para eliminar el evento seleccionado
    }

    return (
    <button
        className="btn btn-danger fab-danger"   // Botón con estilo peligroso para eliminar
        onClick={ handleDelete }    // Ejecuta la función de eliminación al hacer clic
        style={{
            display: hasEventSelected ? '': 'none'  // Mostrar el botón solo si hay un evento seleccionado
        }}
    >
        <i className="fas fa-trash-alt"></i>    {/* Icono de "eliminar" */}
    </button>
  )
}
