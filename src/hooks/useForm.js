//* Hooks y estados iniciales:
//*    - initialForm: Almacena el estado actual de los campos del formulario.
//*    - formValidations: guarda el estado de validación de cada campo (si es válido o el mensaje de error).
//* Validación del formulario (isFormValid): Se usa useMemo para calcular si el formulario es válido, lo que se
//*                                          evalúa a true solo si todos los campos cumplen las reglas de validación.
//* Funciones del hook:
//*     - onInputChange: Actualiza el estado formState con los valores ingresados en los campos.
//*     - onResetForm: Restablece formState al valor inicial del formulario.
//*     - createValidators: Genera validadores dinámicos basados en el objeto formValidations.
//* Valores retornados:
//*     - Todos los valores del formulario (en formState) se exponen individualmente.
//*     - Las funciones y la validez del formulario (isFormValid) también se devuelven, lo que permite a los componentes utilizar estas funcionalidades directamente.

import { useEffect, useMemo, useState } from 'react';

export const useForm = ( initialForm = {}, formValidations = {}) => {
  
    const [ formState, setFormState ] = useState( initialForm );
    const [ formValidation, setFormValidation ] = useState({});

    // Crea validadores cuando cambia el estado del formulario
    useEffect(() => {
        createValidators();
    }, [ formState ])

    // Restablece el estado del formulario cuando cambian los valores iniciales
    useEffect(() => {
        setFormState( initialForm );
    }, [ initialForm ])
    
    // Calcula si el formulario es válido evaluando cada campo
    const isFormValid = useMemo( () => {

        for (const formValue of Object.keys( formValidation )) {
            if ( formValidation[formValue] !== null ) return false;
        }

        return true;
    }, [ formValidation ])

    // Maneja el cambio de los valores en los campos del formulario
    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setFormState({
            ...formState,
            [ name ]: value
        });
    }

    // Restablece el formulario a su estado inicial
    const onResetForm = () => {
        setFormState( initialForm );
    }

    // Crea validaciones para cada campo del formulario
    const createValidators = () => {
        
        const formCheckedValues = {};
        
        for (const formField of Object.keys( formValidations )) {
            const [ fn, errorMessage ] = formValidations[formField];

            formCheckedValues[`${ formField }Valid`] = fn( formState[formField] ) ? null : errorMessage;
        }

        setFormValidation( formCheckedValues );
    }



    return {
        ...formState,   // Devuelve cada propiedad del estado del formulario individualmente
        formState,  // Devuelve el estado completo del formulario
        onInputChange,  // Método para actualizar valores en el formulario
        onResetForm,    // Método para restablecer el formulario

        ...formValidation,  // Devuelve las propiedades de validación de cada campo
        isFormValid // Booleano para verificar si el formulario es válido
    }
}