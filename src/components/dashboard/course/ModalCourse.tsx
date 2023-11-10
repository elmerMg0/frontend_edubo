import { Modal } from "react-bootstrap"
import FormField from "../../FormField/FormField"
import { Course } from "../../../models/models"
import { Form, Formik } from "formik"
import { useContext } from "react"
import * as Yup from 'yup';
import { invalidCoursesNumberMax, invalidCoursesNumberMin, invalidNumber, requiredMessage, tooLongMessage, trimMessage } from "../../../utilities/messagesError"
import { ContextCourse, ContextCourseType } from "./Course"
import { AppStore } from "../../../redux/store"
import { useSelector } from "react-redux"

interface Props{
  createCourse: (course: Course) => void,
  updateCourse: (course: Course, idCourse: number) => void,
}

interface InputValues {
  id?: number,
  titulo: string,
  descripcion: string
  duracion: string
  nivel: string,
  ruta_aprendizaje_id?: number,
  active: string
}

let initialState: InputValues = {
  titulo: '',
  descripcion: '',
  duracion: "",
  nivel: '',
  ruta_aprendizaje_id: 0,
  active: ''
} 
let initialValues = initialState;
export const ModalCourse = ({createCourse, updateCourse}:Props) => {
 
  const contextValue = useContext<ContextCourseType | null>(ContextCourse);
  const road = useSelector((store:AppStore) => store.road); 
  if(!contextValue)return 

  const { showModal, setShowModal, courseToUpdate, setCourseToUpdate} = contextValue

    if(courseToUpdate){
      initialValues = {
        titulo: courseToUpdate.titulo,
        descripcion: courseToUpdate.descripcion,
        duracion: courseToUpdate.duracion,
        nivel: courseToUpdate.active ? '1': '0',
        ruta_aprendizaje_id: courseToUpdate?.ruta_aprendizaje_id,
        active: courseToUpdate.active ? '1': '0'
      }
    }

  const handleSend = (values: InputValues) => {
    //actions.setSubmitting(false);
    /* new */
    const course: Course = {
      titulo: values.titulo,
      descripcion: values.descripcion,
      duracion: values.duracion,
      nivel: values.nivel,
      active: values.active === '1' ? true: false,
      ruta_aprendizaje_id: road.id
    }
    if(courseToUpdate === null){
      createCourse(course)
    }else{
      updateCourse(course, courseToUpdate.id?? 0);
    }
    //setShowModal(false)
    //setCourseToUpdate(null)
    reset();
  } 

  const reset = () => {
    setShowModal(false)
    setCourseToUpdate(null)
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
    nivel: Yup.string()
        .min(1,tooLongMessage)
        .max(10,tooLongMessage),
    active: Yup.string()
        .required(requiredMessage)
        .oneOf(['0', '1'], 'Seleccione un estado')
});

  return (<Modal show={showModal} centered>
      <Modal.Header>
        <h5 className="title-header__modal">{courseToUpdate ? "Actualizar nuevo curso": 'Crear nuevo curso'}</h5>
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
            <FormField name='duracion' type='text'  placeHolder="Duracion (Hrs.)" label="Duracion (Hrs.)"/>
            <FormField name='nivel' type='text'  placeHolder="Nivel del cursos" label="Nivel del Curso"/>
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
