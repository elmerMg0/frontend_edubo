import { Modal } from "react-bootstrap"
import FormField from "../FormField/FormField"
import { Resource } from "../../models/models"
import { Form, Formik } from "formik"
import { useContext } from "react"
import * as Yup from 'yup';
import { invalidNumber, requiredMessage, tooLongMessage, trimMessage } from "../../utilities/messagesError"
import { AppStore } from "../../redux/store"
import { useSelector } from "react-redux"
import { ContextResource, ContextResourceType } from "./Resource"

interface Props{
  createResource: (resource: Resource) => void,
  updateResource: (resource: Resource, idresource: number) => void,
}

interface InputValues {
  id?: number,
  descripcion: string
  url_video?: string,
  active: string
}

let initialState: InputValues = {
  descripcion: '',
  url_video: "",
  active: ''
} 
let initialValues = initialState;
export const ModalResource = ({createResource, updateResource}:Props) => {
 
  const contextValue = useContext<ContextResourceType | null>(ContextResource);
  const classStore = useSelector((store:AppStore) => store.class); 
  if(!contextValue)return 

  const { showModal, setShowModal, resourceToUpdate, setResourceToUpdate} = contextValue

    if(resourceToUpdate){
      initialValues = {
        descripcion: resourceToUpdate.descripcion,
        url_video: resourceToUpdate?.url_video,
        active: resourceToUpdate.active ? '1': '0'
      }
    }

  const handleSend = (values: InputValues) => {
    //actions.setSubmitting(false);
    /* new */
    const resrouce: Resource = {
      descripcion: values.descripcion,
      url_video: values.url_video?? '',
      active: values.active === '1' ? true: false,
      clase_id: classStore.id,
    }
    if(resourceToUpdate === null){
      createResource(resrouce)
    }else{
      updateResource(resrouce, resourceToUpdate.id?? 0);
    }
    //setShowModal(false)
    //setresourceToUpdate(null)
    reset();
  } 

  const reset = () => {
    setShowModal(false)
    setResourceToUpdate(null)
    initialValues = initialState
    //setInitialValues(initialState)
  }

  const yupSchema = Yup.object().shape({
    descripcion: Yup.string()
        .max(80, tooLongMessage)
        .required(requiredMessage)
        .strict(true)
        .trim(trimMessage),
    url_video: Yup.string()
        .max(100, tooLongMessage)
        .required(requiredMessage)
        .strict(true),
 
    active: Yup.string()
        .required(requiredMessage)
        .oneOf(['0', '1'], 'Seleccione un estado')
});

  return (<Modal show={showModal} centered>
      <Modal.Header>
        <h5 className="title-header__modal">{resourceToUpdate ? "Actualizar nuevo curso": 'Crear nuevo curso'}</h5>
      </Modal.Header>
      <Modal.Body>
        <Formik 
              initialValues={initialValues} 
              onSubmit={(values: InputValues) => handleSend(values)}
              validationSchema={yupSchema}
              >
          <Form>
            <FormField name='descripcion' type='text'  placeHolder="Descripcion" label="Descripcion"/>
            <FormField name='url_video' type='text'  placeHolder="Url video" label="Url del video"/>
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
