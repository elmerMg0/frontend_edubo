import { Modal } from "react-bootstrap"
import FormField from "../../FormField/FormField"
import { Road } from "../../../models/models"
import { Form, Formik } from "formik"
import { useContext } from "react"
import * as Yup from 'yup';
import { invalidCoursesNumberMax, invalidCoursesNumberMin, invalidNumber, requiredMessage, tooLongMessage, trimMessage } from "../../../utilities/messagesError"
import { ContextRoad, CreateContextType } from "./Road"

interface Props{
  createRoad: (road: Road) => void,
  updateRoad: (road: Road, idRoad: number) => void,
}

interface InputValues {
  nombre: string,
  descripcion: string,
  numero_cursos: number,
  active: string,
}

let initialState: InputValues = {
  nombre: '',
  descripcion: '',
  numero_cursos: 0,
  active: ''
} 
let initialValues = initialState;
export const ModalRoad = ({createRoad, updateRoad}:Props) => {
 
  const contextValue = useContext<CreateContextType | null>(ContextRoad);  
  if(!contextValue)return 

  const { showModal, setShowModal, roadToUpdate, setRoadToUpdate} = contextValue

  //useEffect(() => {
    if(roadToUpdate){
      initialValues = {
        nombre: roadToUpdate.nombre,
        descripcion: roadToUpdate.descripcion,
        numero_cursos: roadToUpdate.numero_cursos,
        active: roadToUpdate.active ? '1': '0'
      }
     // setInitialValues(currentlyValues)
    }
   // console.log(values)
 // },[showModal])
  


  const handleSend = (values: InputValues) => {
    //actions.setSubmitting(false);
    /* new */
    const road: Road = {
      nombre: values.nombre,
      descripcion: values.descripcion,
      numero_cursos: values.numero_cursos,
      active: values.active === '1' ? true: false
    }
    if(roadToUpdate === null){
      createRoad(road)
    }else{
      updateRoad(road, roadToUpdate.id?? 0);
    }
 /*    const newRoad = {
      id: number,
      nombre: string,
      descripcion: string,
      numero_cursos: number,
      active: boolean
    } */
    //reateRoad(values);
    console.log(values);

    setShowModal(false)
  } 

  const handleClose = () => {
    setShowModal(false)
    setRoadToUpdate(null)
    initialValues = initialState
    //setInitialValues(initialState)
  }

  const yupSchema = Yup.object().shape({
    nombre: Yup.string()
        .max(50, tooLongMessage)
        .required(requiredMessage)
        .strict(true)
        .trim(trimMessage),
    descripcion: Yup.string()
        .max(80, tooLongMessage)
        .required(requiredMessage)
        .strict(true)
        .trim(trimMessage),
    numero_cursos: Yup.number()
        .max(10, tooLongMessage)
        .required(requiredMessage)
        .strict(true)
        .integer(invalidNumber)
        .min(1, invalidCoursesNumberMin)
        .max(10, invalidCoursesNumberMax),
    active: Yup.string()
        .required(requiredMessage)
        .oneOf(['0', '1'], 'Seleccione un estado')
    /*end: Yup.date()
        .required(requiredMessage),
    faculty: Yup.string()
        .max(25, tooLongMessage)
        .required(requiredMessage)
        .strict(true)
        .trim(trimMessage),
    country: Yup.string()
        .max(50, tooLongMessage)
        .required(requiredMessage)
        .strict(true)
        .trim(trimMessage) */
});

  return (<Modal show={showModal} centered>
      <Modal.Header>
        <h5 className="title-header__modal">Crear Nueva Ruta de aprendizaje</h5>
      </Modal.Header>
      <Modal.Body>
        <Formik 
              initialValues={initialValues} 
              onSubmit={(values: InputValues) => handleSend(values)}
              validationSchema={yupSchema}
              >
          <Form>
            <FormField name='nombre' type='text'  placeHolder="Nombre ruta de aprendizaje" label="Ruta de Aprendizaje"/>
            <FormField name='descripcion' type='text'  placeHolder="Descripcion" label="Descripcion"/>
            <FormField name='numero_cursos' type='number'  placeHolder="Numero de cursos" label="Numero de cursos"/>
            <FormField name='active' type='select' label="Estado" selectOptions={[["d", "Seleccione un estado"],["1", 'Activo'] , ["0", "Inactivo"]]}/>
            <div className="modal__btns mt-3">
              <button className="btn--modal btn--red" onClick={handleClose} type="button">Cancelar</button>
              <button className="btn--modal btn--main" type="submit">Enviar</button>
            </div>

          </Form>
        </Formik>
      </Modal.Body>
   
    </Modal>
  )
}
