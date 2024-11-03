//* Hooks de autenticación: startLogout permite cerrar la sesión, y user obtiene la información del usuario actual.
//* Renderización del navbar: 
//*     - Muestra el ícono y nombre del usuario en la barra de navegación.
//*     - Incluye un botón de cierre de sesión que ejecuta startLogout al hacer clic.

import { useAuthStore } from "../../hooks/useAuthStore"


// Importamos el hook personalizado para la autenticación y manejo de sesión
import { useAuthStore } from '../../hooks';

// Componente Navbar para mostrar el nombre de usuario y un botón de cierre de sesión
export const Navbar = () => {

<<<<<<< HEAD
  // Extraemos las funciones startLogout y la información de user desde el hook useAuthStore
  const { startLogout, user } = useAuthStore();

  // Renderización del navbar con el nombre de usuario y botón de cierre de sesión
=======
  const {startLogout, user } = useAuthStore();

>>>>>>> cff31ad35a421d0e15a73fcf2ee8031810f50dca
  return (
    <div className="navbar navbar-dark bg-dark mb-4 px-4">
      

      <span className="navbar-brand">
<<<<<<< HEAD
          <i className="fas fa-calendar-alt"></i> 
          &nbsp;  
          { user.name } {/* Muestra el nombre del usuario en la barra de navegación */}
=======
          <i className="fas fa-calendar-alt"></i> {/* Icono de calendario */}
          &nbsp;  {/* Espacio entre el icono y el texto */}
          { user.name } {/* Nombre del usuario que aparece en la barra de navegación */}
>>>>>>> cff31ad35a421d0e15a73fcf2ee8031810f50dca
      </span>

      <button 
        className="btn btn-outline-danger"
<<<<<<< HEAD
        onClick={ startLogout } // Llama a la función de cierre de sesión al hacer clic
      >
        <i className="fas fa-sign-out-alt"></i> 
        &nbsp;
        <span>Salir</span>
=======
        onClick={ startLogout }
      >
        {/* Botón con borde rojo para indicar una acción de peligro como cerrar sesión */}
        <i className="fas fa-sign-out-alt"></i> {/* Icono de salir */}
        &nbsp;
        <span>Salir</span>  {/* Texto del botón */}
>>>>>>> cff31ad35a421d0e15a73fcf2ee8031810f50dca
      </button>
    </div>
  )
}
