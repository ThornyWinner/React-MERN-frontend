//* setActiveEvent: Establece un nuevo evento vacío (sin título ni notas, y con una duración de 2 horas a partir de la fecha actual). 
//*                 Esto simula la creación de un nuevo evento en el calendario.
//* openDateModal: Abre el modal para que el usuario pueda agregar la información del nuevo evento.
//* Botón flotante: El botón tiene una clase fab (botón de acción flotante) que usualmente es un pequeño botón ubicado en una esquina, con el icono de "agregar" (fa-plus).


import { addHours } from "date-fns";    // Función para manipular horas
import { useCalendarStore, useUiStore } from "../../hooks"  // Hooks personalizados para manejar el estado del calendario y la UI

export const FabAddNew = () => {
  
    const { openDateModal } = useUiStore(); // Hook para abrir el modal
    const { setActiveEvent } = useCalendarStore();  // Hook para establecer el evento activo

    // Función que se ejecuta al hacer clic en el botón
    const handleClickNeW= () => {
        //Establecer un evento por defecto como "activo" al hacer clic
        setActiveEvent({
            title: '',  // Título vacío
            notes: '',  // Notas vacías
            start: new Date(),  // Fecja de inicio: fecha y hora actuales
            end: addHours( new Date(), 2),  // Fecha de fin: 2 horas después de la fecha actual
            bgColor: '#fafafa', // Color de fondo predeterminado
            user: {
              _id: '123',   // ID de usuario por defecto (temporal)
              name: 'Héctor'    // Nombre del usuario predeterminado
            }
        });
        openDateModal();    // Abrir el modal de edición/creación del evento
    }

    return (
    <button
        className="btn btn-primary fab" // Clase CSS para estilo flotante
        onClick={ handleClickNeW }  // Ejecuta la función al hacer clic
    >
        <i className="fas fa-plus"></i> {/* Icono de "agregar nuevo" */}
    </button>
  )
}
