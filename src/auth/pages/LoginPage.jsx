// * El componente LoginPage está dividido en dos secciones:
// * - Formulario de ingreso (Login): Con campos para el correo electrónico y la contraseña, y un botón para enviar el formulario.
// * - Formulario de registro (Registro): Incluye campos para el nombre, correo electrónico, contraseña y confirmación de contraseña, y un botón para crear una cuenta.
// * Ambos formularios están organizados en columnas usando clases de Bootstrap, y el diseño está adaptado para pantallas pequeñas y MediaElementAudioSourceNode.
// * La clase btnSubmit se usa para estilizar los botones de envío. Las clases form-cotnrol, d-grid, y mb-2 son clases de Bootstrap para el estilo y la disposición del contenido.


// Importa el archivo de estilos CSS para la página de inicio de sesión
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import { useAuthStore, useForm } from '../../hooks';
import './LoginPage.css';


const loginFormFields = {
    loginEmail: '',
    loginPassword: ''
}

const registerFormFields = {
    registerName: '',
    registerEmail: '',
    registerPassword: '',
    registerPassword2: ''
}

// Componente funcional que renderiza la página de inicio de sesión y registro
export const LoginPage = () => {
    
    const { startLogin, errorMessage, startRegister } = useAuthStore();

    const { loginEmail, loginPassword, onInputChange:onLoginInputChange } = useForm( loginFormFields );
    const { registerEmail, registerName, registerPassword, registerPassword2, onInputChange:onRegisterInputChange } = useForm( registerFormFields );

    const loginSubmit = ( event ) => {
        event.preventDefault();
        startLogin({ email: loginEmail, password: loginPassword });
    }

    const registerSubmit = ( event ) => {
        event.preventDefault();
        if ( registerPassword !== registerPassword2){
            Swal.fire('Error en registro', 'Contraseñas no son iguales', 'error');
            return;
        }

        startRegister({ name: registerName, email: registerEmail, password: registerPassword });
    }

    useEffect(() => {
      if ( errorMessage !== undefined ){
        Swal.fire('Error en la autenticación', errorMessage, 'error');
      }
    }, [errorMessage])
    

    return (
        <div className="container login-container">
            <div className="row">
                
                {/* Formulario de ingreso */}
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>
                    <form onSubmit={ loginSubmit }>
                        {/* Campo de entrada para el correo electrónico */}
                        <div className="form-group mb-2">
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="Correo"
                                name="loginEmail"
                                value={ loginEmail }
                                onChange={ onLoginInputChange }
                            />
                        </div>
                        {/* Campo de entrada para la contraseña */}
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name="loginPassword"
                                value={ loginPassword }
                                onChange={ onLoginInputChange }
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
                    <form onSubmit={ registerSubmit }>
                        {/* Campo de entrada para el nombre */}
                        <div className="form-group mb-2">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                                name="registerName"
                                value={ registerName }
                                onChange={ onRegisterInputChange }
                            />
                        </div>
                        {/* Campo de entrada para el correo electrónico */}
                        <div className="form-group mb-2">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                                name="registerEmail"
                                value={ registerEmail }
                                onChange={ onRegisterInputChange }
                            />
                        </div>
                        {/* Campo de entrada para la contraseña */}
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name="registerPassword"
                                value={ registerPassword }
                                onChange={ onRegisterInputChange }
                            />
                        </div>
                        {/* Campo de entrada para repetir la contraseña */}
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repita la contraseña"
                                name="registerPassword2"
                                value={ registerPassword2 }
                                onChange={ onRegisterInputChange }
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