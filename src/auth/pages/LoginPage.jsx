//* Importaciones: Importa módulos necesarios (React, useAuthStore, useForm, estilos, y Swal).
//* Constantes para formularios: Define estructuras iniciales para los formularios.
//* Función LoginPage: Maneja el componente principal de la página, usa useAuthStore para autenticación y useForm para los datos.
//* Envío de Formularios: Define loginSubmit y registerSubmit para manejar la lógica y validación de cada formulario.
//* Error de autenticación: Usa useEffect para mostrar una alerta en caso de error.
//* Renderización: Renderiza los formularios de login y registro en el DOM.

<<<<<<< HEAD
// Importaciones necesarias desde React, hooks personalizados, estilos CSS y SweetAlert2 para alertas visuales.
import { useEffect } from 'react';
=======

// Importa el archivo de estilos CSS para la página de inicio de sesión
import { useEffect } from 'react';
import Swal from 'sweetalert2';
>>>>>>> cff31ad35a421d0e15a73fcf2ee8031810f50dca
import { useAuthStore, useForm } from '../../hooks';
import './LoginPage.css';
import Swal from 'sweetalert2';

<<<<<<< HEAD
// Campos iniciales para el formulario de inicio de sesión
const loginFormFields = {
    loginEmail: '',
    loginPassword: '',
}

// Campos iniciales para el formulario de registro
=======

const loginFormFields = {
    loginEmail: '',
    loginPassword: ''
}

>>>>>>> cff31ad35a421d0e15a73fcf2ee8031810f50dca
const registerFormFields = {
    registerName: '',
    registerEmail: '',
    registerPassword: '',
<<<<<<< HEAD
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
        startLogin({ email: loginEmail, password: loginPassword }); // Ejecutamos la función startLogin con las credenciales ingresadas
    }

    // Función para manejar el envío del formulario de registro
    const registerSubmit = ( event ) => { 
        event.preventDefault();
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
=======
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
    

>>>>>>> cff31ad35a421d0e15a73fcf2ee8031810f50dca
    return (
        <div className="container login-container">
            <div className="row">
                
                {/* Formulario de Ingreso */}
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>
                    <form onSubmit={ loginSubmit }>
<<<<<<< HEAD
                        
=======
                        {/* Campo de entrada para el correo electrónico */}
>>>>>>> cff31ad35a421d0e15a73fcf2ee8031810f50dca
                        <div className="form-group mb-2">
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="Correo"
<<<<<<< HEAD
                                name='loginEmail'
=======
                                name="loginEmail"
>>>>>>> cff31ad35a421d0e15a73fcf2ee8031810f50dca
                                value={ loginEmail }
                                onChange={ onLoginInputChange }
                            />
                        </div>
                        
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
<<<<<<< HEAD
                                name='loginPassword'
=======
                                name="loginPassword"
>>>>>>> cff31ad35a421d0e15a73fcf2ee8031810f50dca
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
<<<<<<< HEAD
                       
=======
                        {/* Campo de entrada para el nombre */}
>>>>>>> cff31ad35a421d0e15a73fcf2ee8031810f50dca
                        <div className="form-group mb-2">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
<<<<<<< HEAD
                                name='registerName'
=======
                                name="registerName"
>>>>>>> cff31ad35a421d0e15a73fcf2ee8031810f50dca
                                value={ registerName }
                                onChange={ onRegisterInputChange }
                            />
                        </div>
                        
                        <div className="form-group mb-2">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo"
<<<<<<< HEAD
                                name='registerEmail'
=======
                                name="registerEmail"
>>>>>>> cff31ad35a421d0e15a73fcf2ee8031810f50dca
                                value={ registerEmail }
                                onChange={ onRegisterInputChange }
                            />
                        </div>
                        
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
<<<<<<< HEAD
                                name='registerPassword'
                                value={ registerPassword }
                                onChange={ onRegisterInputChange } 
=======
                                name="registerPassword"
                                value={ registerPassword }
                                onChange={ onRegisterInputChange }
>>>>>>> cff31ad35a421d0e15a73fcf2ee8031810f50dca
                            />
                        </div>
                        
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
<<<<<<< HEAD
                                placeholder="Repita la contraseña" 
                                name='registerPassword2'
=======
                                placeholder="Repita la contraseña"
                                name="registerPassword2"
>>>>>>> cff31ad35a421d0e15a73fcf2ee8031810f50dca
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