import { Modal } from "react-bootstrap"
import FormField from "../FormField/FormField"
import { Class, Course } from "../../models/models"
import { Form, Formik } from "formik"
import { useContext } from "react"
import * as Yup from 'yup';
import { invalidCoursesNumberMax, invalidCoursesNumberMin, invalidNumber, requiredMessage, tooLongMessage, trimMessage } from "../../utilities/messagesError"
import { AppStore } from "../../redux/store"
import { useSelector } from "react-redux"
import { ContextClass, ContextClassType } from "./ClassComponent"

interface Props{
  createClass: (classValue: Class) => void,
  updateClass: (classValue: Class, idClass: number) => void,
}

interface InputValues {
  id?: number,
  titulo: string,
  descripcion: string
  duracion: string
  numero_clase: number,
  curso_id?: number,
  active: string
}

let initialState: InputValues = {
  titulo: '',
  descripcion: '',
  duracion: "",
  numero_clase: 0,
  curso_id: 0,
  active: ''
} 
let initialValues = initialState;
export const ModalClass = ({  createClass, updateClass}:Props) => {
 
  const contextValue = useContext<ContextClassType | null>(ContextClass);
  const courseStore = useSelector((store:AppStore) => store.course); 
  if(!contextValue)return 

  const { showModal, setShowModal, classToUpdate, setClassToUpdate} = contextValue

    if(classToUpdate){
      const { titulo, descripcion, duracion, numero_clase, active} = classToUpdate
      initialValues = {
        titulo: titulo,
        descripcion: descripcion,
        duracion: duracion,
        numero_clase: numero_clase,
        active: active ? '1': '0'
      }
    }

  const handleSend = (values: InputValues) => {
    //actions.setSubmitting(false);
    /* new */
    const newClass: Class = {
      titulo: values.titulo,
      descripcion: values.descripcion,
      duracion: values.duracion,
      numero_clase: values.numero_clase,
      active: values.active === '1' ? true: false,
      curso_id: courseStore.id
    }
    if(classToUpdate === null){
      createClass(newClass)
    }else{
      updateClass(newClass, classToUpdate.id?? 0);
    }
    reset();
  } 

  const reset = () => {
    setShowModal(false)
    setClassToUpdate(null)
    initialValues = initialState
    //setInitialValues(initialState)
  }

  const yupSchema = Yup.object().shape({
    titulo: Yup.string()
        .max(50, tooLongMessage)
        .required(requiredMessage)
        .strict(true)
        .trim(trimMessage),
    descripcion: Yup.string()
        .max(80, tooLongMessage)
        .required(requiredMessage)
        .strict(true)
        .trim(trimMessage),
    duracion: Yup.string()
        .max(10, tooLongMessage)
        .required(requiredMessage)
        .strict(true),
    numero_clase: Yup.number()
        .required(requiredMessage)
        .min(1,tooLongMessage)
        .max(10,tooLongMessage),
    active: Yup.string()
        .required(requiredMessage)
        .oneOf(['0', '1'], 'Seleccione un estado')
});

  return (<Modal show={showModal} centered>
      <Modal.Header>
        <h5 className="title-header__modal">{classToUpdate ? "Actualizar clase": 'Crear nueva clase'}</h5>
      </Modal.Header>
      <Modal.Body>
        <Formik 
              initialValues={initialValues} 
              onSubmit={(values: InputValues) => handleSend(values)}
              validationSchema={yupSchema}
              >
          <Form>
            <FormField name='titulo' type='text'  placeHolder="Titulo del curso" label="Titulo"/>
            <FormField name='descripcion' type='text'  placeHolder="Descripcion" label="Descripcion"/>
            <FormField name='duracion' type='text'  placeHolder="Duracion (Min.)" label="Duracion (Min.)"/>
            <FormField name='numero_clase' type='number'  placeHolder="Numero de clase" label="Numero de clase"/>
            <FormField name='active' type='select' label="Estado" selectOptions={[["d", "Seleccione un estado"],["1", 'Activo'] , ["0", "Inactivo"]]}/>
            <div className="modal__btns mt-3">
              <button className="btn--modal btn--red" onClick={reset} type="button">Cancelar</button>
              <button className="btn--modal btn--main" type="submit">Enviar</button>
            </div>

          </Form>
        </Formik>
      </Modal.Body>
   
    </Modal>
  )
}
