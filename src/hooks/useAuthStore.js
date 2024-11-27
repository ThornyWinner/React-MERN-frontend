//* Propiedades extraídas del estado de autenticación:
//*     - status: Estado actual del usuario (e.g., 'authenticated', 'not-authenticated', 'checking').
//*     - user: Información del usuario autenticado.
//*     - errorMessage: Mensaje de error en caso de fallo en la autenticación.
//* Funciones de autenticación:
//*     - startLogin: Inicia sesión con un correo y una contraseña. Guarda el token y la fecha de inicio de sesión en localStorage y actualiza el estado a autenticado. 
//*                 Si la operación falla, actualiza el estado a 'not-authenticated' y muestra un mensaje de error.
//*     - startRegister: Registra un nuevo usuario y guarda el token si la operación es exitosa.
//*     - checkAuthToken: Verifica el token almacenado en localStorage para mantener al usuario autenticado incluso después de recargar la página.
//*     - startLogout: Cierra la sesión del usuario, limpiando el estado de la aplicación y localStorage.
//* Retorno del hook: Devuelve los métodos y propiedades para interactuar con el estado de autenticación desde cualquier componente.


import { useDispatch, useSelector } from 'react-redux';
import { calendarApi } from '../api';
import { clearErrorMessage, onChecking, onLogin, onLogout, onLogoutCalendar } from '../store';

export const useAuthStore = () => {

    const { status, user, errorMessage } = useSelector( state => state.auth );  // Extraemos el estado de autenticación
    const dispatch = useDispatch();

    // Función para iniciar sesión
    const startLogin = async({ email, password }) => {
        dispatch( onChecking() );
        try{
            const { data } = await calendarApi.post('/auth', { email, password });
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch( onLogin({ name: data.name, uid: data.uid }) );
        }catch(error){
            dispatch( onLogout('Credenciales incorrectas') );
            setTimeout(() => {
                dispatch( clearErrorMessage() );
            }, 10);
        }
    }

    // Función para registrar un nuevo usuario
    const startRegister = async({ email, password, name }) => {
        dispatch( onChecking() );
        try{
            const { data } = await calendarApi.post('/auth/new', { email, password, name });
            
            console.log(data);
            
            //TODO: Enviar correo de confirmación


            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch( onLogin({ name: data.name, uid: data.uid }) );
        }catch(error){
            dispatch( onLogout(error.response.data?.msg || 'Por favor, completa todos los campos') );
            setTimeout(() => {
                dispatch( clearErrorMessage() );
            }, 10);
        }
    }

    // Verificación del token para autenticación persistente
    const checkAuthToken = async() => {
        const token = localStorage.getItem('token');
        if ( !token ) return dispatch( onLogout() );

        try{
            const { data } = await calendarApi.get('/auth/renew');
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch( onLogin({ name: data.name, uid: data.uid }) );
        }catch(error){
            localStorage.clear();
            dispatch( onLogout() );
        }
    }

    // Función para cerrar sesión
    const startLogout = () => {
        localStorage.clear();
        dispatch( onLogoutCalendar() );
        dispatch( onLogout() );
    }

    return {
        //* Propiedades
        errorMessage,
        status,
        user,
        //* Métodos
        checkAuthToken,
        startLogin,
        startLogout,
        startRegister
    }

}