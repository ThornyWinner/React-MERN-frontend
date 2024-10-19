//* Modal: Utiliza el componente Modal para crear una ventana emergente que permite al usuario crear o editar eventos en el calendario.
//* DatePicker: Un componente para seleccionar la fecha y la hora con localización en español.
//* Validaciones: Utiliza Swal para mostrar alertas en caso de errores, como fechas incorrectas o campos vacíos.
//* Estado: Se maneja el estado del formulario para actualizar los valores del título, notas y fechas de inicio y fin.


import { useEffect, useMemo, useState } from 'react';
import { addHours, differenceInSeconds } from 'date-fns';   // Funciones para manejo de fechas

import Swal from 'sweetalert2'; // Biblioteca para mostrar alertas bonitas
import 'sweetalert2/dist/sweetalert2.min.css'

import Modal from 'react-modal';    // Modal para la ventana emergente

import DatePicker, { registerLocale } from 'react-datepicker';  // Selector de fechas
import 'react-datepicker/dist/react-datepicker.css';

import es from 'date-fns/locale/es';    // localización en español para las fechas
import { useCalendarStore, useUiStore } from '../../hooks'; // Hooks personalizados para UI y manejo del estado del calendario


// Registrar el idioma español para DatePicker
registerLocale( 'es', es );

// Estilos personalizados para el modal
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

// Setea el elemento raíz del modal
Modal.setAppElement('#root');

export const CalendarModal = () => {

    // Hooks personalizados para el estado de la UI y el calendario
    const { isDateModalOpen, closeDateModal } = useUiStore();
    const { activeEvent, startSavingEvent } = useCalendarStore();

    // Estado para conrolar el envío del formulario y los valores del mismo
    const [ formSubmitted, setFormSubmitted] = useState(false);
    
    const [ formValues, setFormValues ] = useState({
        title: '',
        notes:  '',
        start: new Date(),  // Fecha de inicio por defecto es la fecha actual
        end: addHours( new Date(), 2)   // Fecha de fin por defecto es 2 horas después
    });

    // Memoriza la clase CSS para el título, dependiendo si se ha enviado el formulario y si el título es válido
    const titleClass = useMemo(() => {
        if( !formSubmitted ) return '';

        return( formValues.title.length > 0 )
            ? ''
            : 'is-invalid'; // Añade clase 'is-invalid' si el título está vacío
    }, [ formValues.title, formSubmitted ])

    // Efecto para actualizar el formulario cuando hay un evento activo
    useEffect(() => {
      if( activeEvent !== null ){
        setFormValues({ ...activeEvent });
      }
    }, [ activeEvent ])
    

    // Maneja el cambio en los inputs del formulario
    const onInputChange = ({ target }) =>{
        setFormValues({
            ...formValues,
            [target.name]: target.value
        })
    }

    // Maneja los cambios en las fechas del DatePicker
    const onDateChanged = ( event, changing ) => {
        setFormValues({
            ...formValues,
            [changing]: event
        })
    }

    // Cierra el modal
    const onCloseModal = () => {
        closeDateModal();
    }

    // Maneja el envío del formulario
    const onSubmit = async( event ) => {
        event.preventDefault();
        setFormSubmitted(true);

        // Diferencia entre fechas de inicio y fin
        const difference = differenceInSeconds( formValues.end, formValues.start);
        
        if ( isNaN( difference ) || difference <= 0 ) {
            Swal.fire('Fechas incorrectas', 'Revisar las fechas ingresadas', 'error');
            return;
        }

        if( formValues.title.length <= 0 ) return;

        console.log(formValues);

        // TODO:
        // Guarda el evento
        await startSavingEvent( formValues );
        closeDateModal();
        setFormSubmitted(false);
    }

    return (
        <Modal
            isOpen={ isDateModalOpen }  // Estado de apertura del modal
            onRequestClose={ onCloseModal } // Acción al cerrar el modal
            style={ customStyles }  // Estilos personalizados del modal
            className="modal"
            overlayClassName="modal-fondo"
            closeTimeoutMS={ 200 }  // Transición de cierre de 200ms
        >
            <h1> Evento </h1> 
            <hr />
            <form className="container" onSubmit={ onSubmit }>

                {/* Selector de fecha y hora de inicio */}
                <div className="form-group mb-2">
                    <label>Fecha y hora inicio</label>
                    {/* Este div interno hace un salto de línea para mostrar en la parte de abajo el componente de DatePicker */}
                    <div>
                        <DatePicker 
                            selected={ formValues.start }
                            onChange={ (event) => onDateChanged(event, 'start') }
                            className='form-control'
                            dateFormat="Pp"
                            showTimeSelect
                            locale="es"
                            timeCaption='Hora'
                        />
                    </div>
                </div>

                {/* Selector de fecha y hora de fin */}
                <div className="form-group mb-2">
                    <label>Fecha y hora fin</label>
                    {/* Este div interno hace un salto de línea para mostrar en la parte de abajo el componente de DatePicker */}
                    <div>
                        <DatePicker 
                            minDate={ formValues.start }    // No permite seleccionar una fecha anterior a la de inicio
                            selected={ formValues.end }
                            onChange={ (event) => onDateChanged(event, 'end') }
                            className='form-control'
                            dateFormat="Pp"
                            showTimeSelect
                            locale="es"
                            timeCaption='Hora'
                        />
                    </div>
                </div>

                <hr />

                {/* Campo de texto para el título del evento */}
                <div className="form-group mb-2">
                    <label>Titulo y notas</label>
                    <input 
                        type="text" 
                        className={ `form-control ${ titleClass }`}
                        placeholder="Título del evento"
                        name="title"
                        autoComplete="off"
                        value={ formValues.title }
                        onChange={ onInputChange }
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                {/* Campo de texto para notas adicionales */}
                <div className="form-group mb-2">
                    <textarea 
                        type="text" 
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value={ formValues.notes }
                        onChange={ onInputChange }
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
  )
}
