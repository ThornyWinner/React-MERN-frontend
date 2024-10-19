// * Routes: Contiene las diferentes rutas que la aplicación debe manejar.
// * authStatus: Simula el estado de autenticación (puede variar según la lógica de autenticación real).
// * Si el usuario no está autenticado (authStatus === 'not-authenticated'), se muestra la página de inicio de sesión (LoginPage).
// * Si el usuario está autenticado, se carga la página principal del calendario (CalendarPage).
// * Si el usuario navega a una ruta no válida, será redirigido auromáticamente a la ruta de inicio de sesión (/auth/login).


// Importa componentes necesarios de react-router-dom para definir rutas y navegación
import { Navigate, Route, Routes } from 'react-router-dom';

// Importa la página de inicio de sesión (Login Page) y la página de calendario (CalendarPage)
import { LoginPage } from '../auth';
import { CalendarPage } from '../calendar';
import { useAuthStore } from '../hooks';
import { useEffect } from 'react';

// Define el componente principal de rutas de la aplicación
export const AppRouter = () => {

    const { status, checkAuthToken } = useAuthStore();
    // Estado de autenticación simulado (puede ser 'authenticated' o 'not-authenticated')
    //const authStatus = 'not-authenticated';
    
    useEffect(() => {
      checkAuthToken();
    }, [])
    


    if ( status === 'checking' ) {
        return (
            <h3>Cargando...</h3>
        )
    }


    return (
        <Routes>
            {
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
