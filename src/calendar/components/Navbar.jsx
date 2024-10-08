//* navbar: Clase de Bootstrap que aplica estilos de barra de navegación.
//* navbar-dark bg-dark: Estas clases aplican un fondo oscuro y texto claro.
//* navbar-brand: Se usa para el contenidao de marca, en este caso el nombre del usuario loggeado (Héctor) y un icono de calendario.
//* Botón de "Salir": Implementado con un estilo de botón con borde rojo (btn-outline-danger), que incluye un icono de cerrar sesión y el texto "Salir".


export const Navbar = () => {
  return (
    <div className="navbar navbar-dark bg-dark mb-4 px-4">
      {/* Barra de navegación oscura con padding horizontal y margen inferior */}

      <span className="navbar-brand">
          <i className="fas fa-calendar-alt"></i> {/* Icono de calendario */}
          &nbsp;  {/* Espacio entre el icono y el texto */}
          Héctor {/* Nombre del usuario que aparece en la barra de navegación */}
      </span>

      <button className="btn btn-outline-danger">
        {/* Botón con borde rojo para indicar una acción de peligro como cerrar sesión */}
        <i className="fas fa-sign-out-alt"></i> {/* Icono de salir */}
        <span>Salir</span>  {/* Texto del botón */}
      </button>
    </div>
  )
}
