import { Modal } from "react-bootstrap"
import FormField from "./FormField"
import { Road } from "../../models/models"
import { Form, Formik } from "formik"
import { useContext, useEffect } from "react"
import { ContextRoad, CreateContextType } from "./RoadContext"

interface Props{
  createRoad: (road: Road) => void,
  updateRoad: (road: Road) => void,
  setRoadToUpdate: () => void
}

interface InputValues {
  nombre: string,
  descripcion: string,
  numero_cursos: number,
  active: string,
}
export const ModalRoad = ({createRoad, setRoadToUpdate, updateRoad}:Props) => {
 
  const contextValue = useContext<CreateContextType | null>(ContextRoad);

  if(!contextValue)return 

  const { showModal, setShowModal, roadToUpdate } = contextValue


  useEffect(() => {
    console.log(roadToUpdate)
  },[showModal])
  

  const handleSend = (values: InputValues) => {
    //actions.setSubmitting(false);
    /* new */

    console.log(roadToUpdate)
    if(roadToUpdate === null){
      const newRoad: Road = {
        nombre: values.nombre,
        descripcion: values.descripcion,
        numero_cursos: values.numero_cursos,
        active: values.active === '0' ? true: false
      }
      console.log(values);
      createRoad(newRoad)
    }else{
      /*  */
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
  }


  return (<Modal show={showModal} centered>
      <Modal.Header>
        <h5>Crear Nueva Ruta de aprendizaje</h5>
      </Modal.Header>
      <Modal.Body>
        <Formik initialValues={{nombre: '', descripcion: '', active: '', numero_cursos: 0}} onSubmit={(values: InputValues) => handleSend(values)}>
          <Form>
            <FormField name='nombre' type='text'  placeHolder="Nombre ruta de aprendizaje" label="Ruta de Aprendizaje"/>
            <FormField name='descripcion' type='text'  placeHolder="Descripcion" label="Descripcion"/>
            <FormField name='numero_cursos' type='number'  placeHolder="Numeor de cursos" label="Numero de cursos"/>
            <FormField name='active' type='select' label="Ruta de Aprendizaje" selectOptions={[["d", "Seleccione un estado"],["1", 'Activo'] , ["0", "Inactivo"]]}/>
            <button type="submit" className="btn">Enviar</button>
          </Form>
        </Formik>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-main" onClick={handleClose}>Cancelar</button>
        <button className="btn btn-main" >Aceptar</button>
      </Modal.Footer>
   
    </Modal>
  )
}
