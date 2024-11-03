//* Estado de autenticación: useAuthStore() se usa para acceder al estado de autenticación (status) 
//*                          y a la función checkAuthToken, que verifica el token de autenticación.
//* Verificación de autenticación al montar: useEffect llama a checkAuthToken cuando el componente se monta para 
//*                                          asegurarse de que el usuario esté autenticado o redirigirlo al login si no lo está.
//* Manejo de estado checking: Si status es checking, el componente muestra Cargando... hasta que se complete la verificación.
//* Rutas condicionales:
//*     - Si status es not-authenticated, se muestran solo las rutas de autenticación (/auth/*) que redirigen al login.
//*     - Si el usuario está autenticado (status !== 'not-authenticated'), se muestran las rutas principales de la aplicación, como CalendarPage.


// Importa componentes necesarios de react-router-dom para definir rutas y navegación
import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

// Importa la página de inicio de sesión (Login Page) y la página de calendario (CalendarPage)
import { LoginPage } from '../auth';
import { CalendarPage } from '../calendar';
import { useAuthStore } from '../hooks';

// Define el componente principal de rutas de la aplicación
export const AppRouter = () => {

    const { status, checkAuthToken } =useAuthStore();

    useEffect(() => {
        checkAuthToken();
    }, [])
    

    // Estado de autenticación simulado ( puede ser 'authenticated' o 'not-authenticated')
    // const authStatus = 'not-authenticated';

    // Condicional para mostrar un mensaje de carga si la autenticación está siendo verificada
    if (status === 'checking') {
        return (
            <h3>Cargando...</h3>
        )
    }

    return (
        <Routes>
            {   
                // Rutas según el estado de autenticación del usuario
                // Si el usuario no está autenticado, muestra la ruta de autenticación (LoginPage)
                (status === 'not-authenticated')    
                    ? (
                        <>
                            <Route path='/auth/*' element={ <LoginPage /> }/>
                            {/* Redirección por defecto: si no coincide ninguna ruta, envía a /auth/login */}
                            <Route path='/*' element={ <Navigate to="/auth/login" /> } />
                        </>
                    )
                    // Si está autenticado, muestra la ruta del calendario (CalendarPage)
                    : (
                        <>
                            <Route path='/' element={ <CalendarPage /> }/>
                            <Route path='/*' element={ <Navigate to="/" /> } />
                        </>
                    ) 
            }
            
            
        </Routes>
    )
}
