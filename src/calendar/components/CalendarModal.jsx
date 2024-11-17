//* Configuraciones y estilos: Registro de idioma y configuración de estilos personalizados para el modal.
//* Estados y hooks: Manejamos el estado del formulario, validación y actualizaciones con useEffect, useMemo y useState.
//* Validación y manejo de errores: Validación de fechas y título con Swal y differenceInSeconds.
//* Renderización: Estructura y estilos para el formulario en el modal, incluyendo botones, selectores de fechas y campos de texto.


// Importamos los hooks y utilidades necesarias para manejar el estado, fechas, modal y alertas visuales
import { useMemo, useState, useEffect } from 'react';
import { addHours, differenceInSeconds } from 'date-fns';

import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import Modal from 'react-modal';

import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import es from 'date-fns/locale/es';
import { useCalendarStore, useUiStore } from '../../hooks';

// Configuramos el idioma español para el selector de fechas
registerLocale( 'es', es );

// Estilos personalizados para el modal centrado en la pantalla
const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
};

// Asociamos el modal al elemento raíz de la aplicación
Modal.setAppElement('#root');

// Componente CalendarModal para crear y editar eventos en el calendario
export const CalendarModal = () => {

    // Estado y funciones de los hooks personalizados para manejar la apertura del modal y el estado del evento activo
    const { isDateModalOpen, closeDateModal } = useUiStore();
    const { activeEvent, startSavingEvent } = useCalendarStore();

    // Estado para manejar la validación del formulario
    const [ formSubmitted, setFormSubmitted] = useState(false);
    
    // Estado inicial del formulario
    const [ formValues, setFormValues ] = useState({
        title: '',
        notes:  '',
        start: new Date(), 
        end: addHours( new Date(), 2)
    });

    // Validación de la clase de título según si el formulario fue enviado y si el título tiene contenido
    const titleClass = useMemo(() => {
        if( !formSubmitted ) return '';

        return( formValues.title.length > 0 )
            ? ''
            : 'is-invalid';
    }, [ formValues.title, formSubmitted ])

    // useEffect para actualizar el formulario con los valores del evento activo
    useEffect(() => {
      if( activeEvent !== null ){
        setFormValues({ ...activeEvent });
      }
    }, [ activeEvent ])
    

    // Función para manejar cambios en los campos de texto
    const onInputChanged = ({ target }) =>{
        setFormValues({
            ...formValues,
            [target.name]: target.value
        })
    }

    // Función para manejar cambios en las fechas de inicio y fin
    const onDateChanged = ( event, changing ) => {
        setFormValues({
            ...formValues,
            [changing]: event
        })
    }

    // Función para cerrar el modal
    const onCloseModal = () => {
        closeDateModal();
    }

    // Función para manejr el envío del formulario de evento
    const onSubmit = async( event ) => {
        event.preventDefault();
        setFormSubmitted(true);

        // Calculamos la diferencia en segundos entre las fechas de inicio y fin
        const difference = differenceInSeconds( formValues.end, formValues.start);
        
        // Validación de fechas
        if ( isNaN( difference ) || difference <= 0 ) {
            Swal.fire('Fechas incorrectas', 'Revisar las fechas ingresadas', 'error');
            return;
        }

        // Validación de título no vacío
        if( formValues.title.length <= 0 ) return;

        console.log(formValues);

        // TODO:
        // Guardado del evento y cierre del modal
        await startSavingEvent( formValues );
        closeDateModal();
        setFormSubmitted(false);
    }

    // Renderización del modal con el formulario de eventos
    return (
        <Modal
            isOpen={ isDateModalOpen }
            onRequestClose={ onCloseModal }
            style={ customStyles }
            className="modal"
            overlayClassName="modal-fondo"
            closeTimeoutMS={ 200 }
        >
            
            <h1 className='title-center'> EVENTO </h1> 
            <hr />
            <form className="container" onSubmit={ onSubmit }>

                {/* Selector de fecha y hora de inicio */}
                <div className="form-group mb-2">
                    <label>Fecha y hora inicio</label>
                        <DatePicker
                            selected={ formValues.start }
                            onChange={ (event) => onDateChanged(event, 'start') }
                            className='form-control datepicker'
                            dateFormat="Pp"
                            showTimeSelect
                            locale="es"
                            timeCaption='Hora'
                            timeIntervals={ 30 }
                        />
                </div>

                {/* Selector de fecha y hora de fin */}
                <div className="form-group mb-2">
                    <label>Fecha y hora fin </label>
                        <DatePicker 
                            minDate={ formValues.start }
                            selected={ formValues.end }
                            onChange={ (event) => onDateChanged(event, 'end') }
                            className='form-control datepicker'
                            dateFormat="Pp"
                            showTimeSelect
                            locale="es"
                            timeCaption='Hora'
                            timeIntervals={ 30 }
                        />
                </div>

                <hr />

                {/* Campo de título del evento */}
                <div className="form-group mb-2">
                    <label>Titulo y notas</label>
                    <input 
                        type="text" 
                        className={ `form-control ${ titleClass }`}
                        placeholder="Título del evento"
                        name="title"
                        autoComplete="off"
                        value={ formValues.title }
                        onChange={ onInputChanged }
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                {/* Campo de notas del evento */}
                <div className="form-group mb-2">
                    <textarea 
                        type="text" 
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value={ formValues.notes }
                        onChange={ onInputChanged }
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>

                {/* Botón para guardar el evento */}
                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>
            </form>
        </Modal>
    );
}
