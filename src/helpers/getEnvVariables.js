//* import.meta.env:
//*     - Vite permite acceder a las variables de entorno mediante import.meta.env. 
//*       Estas variables pueden estar definidas en un archivo .env en la raíz del proyecto.
//*     - Este método asegura que las variables de entorno están disponibles para uso dentro del código.  
//* Retorno de Variables:
//*     La función retorna un objeto que contiene todas las variables de entorno en import.meta.env, usando el operador de propagación(...).
//*     Esto facilita que las variables puedan importarse en diferentes partes del proyecto.

// Definimos y exportamos una función para obtener las variables de entorno
export const getEnvVariables = () => {
    
    import.meta.env;    // Asegura que se invoque `import.meta.env` para acceder al entorno en Vite

    return {
        ...import.meta.env  // Retorna todas las variables de entorno de `import.meta.env`
    }
}