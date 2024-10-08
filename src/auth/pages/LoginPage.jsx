// * El componente LoginPage está dividido en dos secciones:
// * - Formulario de ingreso (Login): Con campos para el correo electrónico y la contraseña, y un botón para enviar el formulario.
// * - Formulario de registro (Registro): Incluye campos para el nombre, correo electrónico, contraseña y confirmación de contraseña, y un botón para crear una cuenta.
// * Ambos formularios están organizados en columnas usando clases de Bootstrap, y el diseño está adaptado para pantallas pequeñas y MediaElementAudioSourceNode.
// * La clase btnSubmit se usa para estilizar los botones de envío. Las clases form-cotnrol, d-grid, y mb-2 son clases de Bootstrap para el estilo y la disposición del contenido.


// Importa el archivo de estilos CSS para la página de inicio de sesión
import './LoginPage.css';

// Componente funcional que renderiza la página de inicio de sesión y registro
export const LoginPage = () => {
    return (
        <div className="container login-container">
            <div className="row">
                
                {/* Formulario de ingreso */}
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>
                    <form>
                        {/* Campo de entrada para el correo electrónico */}
                        <div className="form-group mb-2">
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="Correo"
                            />
                        </div>
                        {/* Campo de entrada para la contraseña */}
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                            />
                        </div>
                        {/* Botón de encío de formulario de login */}
                        <div className="d-grid gap-2">
                            <input 
                                type="submit"
                                className="btnSubmit"
                                value="Login" 
                            />
                        </div>
                    </form>
                </div>

                {/* Formulario de registro */}
                <div className="col-md-6 login-form-2">
                    <h3>Registro</h3>
                    <form>
                        {/* Campo de entrada para el nombre */}
                        <div className="form-group mb-2">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                            />
                        </div>
                        {/* Campo de entrada para el correo electrónico */}
                        <div className="form-group mb-2">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                            />
                        </div>
                        {/* Campo de entrada para la contraseña */}
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña" 
                            />
                        </div>
                        {/* Campo de entrada para repetir la contraseña */}
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repita la contraseña" 
                            />
                        </div>
                        {/* Botón de envío de formulario de registro */}
                        <div className="d-grid gap-2">
                            <input 
                                type="submit" 
                                className="btnSubmit" 
                                value="Crear cuenta" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}