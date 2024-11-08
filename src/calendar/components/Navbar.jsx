//* Hooks de autenticación: startLogout permite cerrar la sesión, y user obtiene la información del usuario actual.
//* Renderización del navbar: 
//*     - Muestra el ícono y nombre del usuario en la barra de navegación.
//*     - Incluye un botón de cierre de sesión que ejecuta startLogout al hacer clic.


// Importamos el hook personalizado para la autenticación y manejo de sesión
import { useAuthStore } from '../../hooks/useAuthStore';

// Componente Navbar para mostrar el nombre de usuario y un botón de cierre de sesión
export const Navbar = () => {

  // Extraemos las funciones startLogout y la información de user desde el hook useAuthStore
  const { startLogout, user } = useAuthStore();

  // Renderización del navbar con el nombre de usuario y botón de cierre de sesión
  return (
    <div className="navbar navbar-dark bg-dark mb-4 px-4">
      
      <span className="navbar-brand">
          <i className="fas fa-calendar-alt"></i> 
          &nbsp;  
          { user.name } {/* Muestra el nombre del usuario en la barra de navegación */}
      </span>

      <button 
        className="btn btn-outline-danger"
        onClick={ startLogout } // Llama a la función de cierre de sesión al hacer clic
      >
        <i className="fas fa-sign-out-alt"></i> 
        &nbsp;
        <span>Salir</span>
      </button>
    </div>
  )
}
