//* Importaciones: Importa módulos necesarios (React, useAuthStore, useForm, estilos, y Swal).
//* Constantes para formularios: Define estructuras iniciales para los formularios.
//* Función LoginPage: Maneja el componente principal de la página, usa useAuthStore para autenticación y useForm para los datos.
//* Envío de Formularios: Define loginSubmit y registerSubmit para manejar la lógica y validación de cada formulario.
//* Error de autenticación: Usa useEffect para mostrar una alerta en caso de error.
//* Renderización: Renderiza los formularios de login y registro en el DOM.

// Importaciones necesarias desde React, hooks personalizados, estilos CSS y SweetAlert2 para alertas visuales.
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import { useAuthStore, useForm } from '../../hooks';
import './LoginPage.css';

// Función para validar el formato del correo electrónico
function validateEmail(email) {
    const regex = /^[\w\.-]+@gmail\.com$/i;;
    return regex.test(email);
}

// Campos iniciales para el formulario de inicio de sesión
const loginFormFields = {
    loginEmail: '',
    loginPassword: '',
}

// Campos iniciales para el formulario de registro
const registerFormFields = {
    registerName: '',
    registerEmail: '',
    registerPassword: '',
    registerPassword2: '',
}

// Componente LoginPage que contiene formularios de inicio de sesión y registro
export const LoginPage = () => {

    //Extraemos funciones y variables del hook de autenticación
    const { startLogin, errorMessage, startRegister } = useAuthStore();

    // Utilizamos el hook useForm para manejar el estado de los formularios de inicio de sesión y registro
    const { loginEmail, loginPassword, onInputChange:onLoginInputChange } = useForm( loginFormFields );
    const { registerEmail, registerName, registerPassword, registerPassword2, onInputChange:onRegisterInputChange } = useForm( registerFormFields );

    // Función para manejar el envío del formulario de inicio de sesión
    const loginSubmit = ( event ) => { 
        event.preventDefault(); // Evitamos el comportamiento predeterminado del formulario
        
        // Validación del formato del correo electrónico
        if (!validateEmail(loginEmail)) {
            Swal.fire('Error', 'Por favor ingrese un correo que exista', 'error');
            return;
        }
        
        startLogin({ email: loginEmail, password: loginPassword }); // Ejecutamos la función startLogin con las credenciales ingresadas
    }

    // Función para manejar el envío del formulario de registro
    const registerSubmit = ( event ) => { 
        event.preventDefault();

        // Validación del formato del correo electrónico
        if (!validateEmail(registerEmail)) {
            //TODO: CAMBIAR LA TERMINACIÓN DEL CORREO
            Swal.fire('Error en registro', 'Por favor ingrese un correo con terminación @gmail.com', 'error');
            return;
        }

        // Verificamos si las contraseñas coinciden antes de enviar el formulario
        if ( registerPassword !== registerPassword2 ){
            Swal.fire('Error en registro', 'Las contraseñas no coinciden', 'error');    // Mostramos una alerta si las contraseñas no coinciden
            return;
        }

        startRegister({ name: registerName, email: registerEmail, password: registerPassword });    // Ejecutamos la función startRegister con los datos del formulario
    }

    // useEffect para manejar el error de autenticación y mostrar una alerta si existe un mensaje de error
    useEffect(() => {
        if ( errorMessage !== undefined ){
            Swal.fire('Error en la autenticación', errorMessage, 'error');
        }
    }, [errorMessage]);
    
    // Renderización del componente con dos formularios: uno para iniciar sesión y otro para registrarse
    return (
        <div className="container login-container">
            <div className="row">
                
                {/* Formulario de Ingreso */}
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>
                    <form onSubmit={ loginSubmit }>
                        
                        <div className="form-group mb-2">
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="Correo"
                                name='loginEmail'
                                value={ loginEmail }
                                onChange={ onLoginInputChange }
                            />
                        </div>
                        
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name='loginPassword'
                                value={ loginPassword }
                                onChange={ onLoginInputChange }
                            />
                        </div>
                        
                        <div className="d-grid gap-2">
                            <input 
                                type="submit"
                                className="btnSubmit"
                                value="Login" 
                            />
                        </div>
                    </form>
                </div>

                {/* Formulario de Registro */}
                <div className="col-md-6 login-form-2">
                    <h3>Registro</h3>
                    <form onSubmit={ registerSubmit }>
                       
                        <div className="form-group mb-2">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                                name='registerName'
                                value={ registerName }
                                onChange={ onRegisterInputChange }
                            />
                        </div>
                        
                        <div className="form-group mb-2">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                                name='registerEmail'
                                value={ registerEmail }
                                onChange={ onRegisterInputChange }
                            />
                        </div>
                        
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name='registerPassword'
                                value={ registerPassword }
                                onChange={ onRegisterInputChange } 
                            />
                        </div>
                        
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repita la contraseña" 
                                name='registerPassword2'
                                value={ registerPassword2 }
                                onChange={ onRegisterInputChange }
                            />
                        </div>
                        
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