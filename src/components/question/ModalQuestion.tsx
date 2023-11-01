import { Modal } from "react-bootstrap"
import FormField from "../FormField/FormField"
import { Question, Road } from "../../models/models"
import { Field, Form, Formik } from "formik"
import { ChangeEvent, useContext, useState } from "react"
import * as Yup from 'yup';
import { invalidCoursesNumberMax, invalidCoursesNumberMin, invalidNumber, requiredMessage, tooLongMessage, trimMessage } from "../../utilities/messagesError"
import { ContextQuestion, CreateQuestionType } from "./Question"
import { useSelector } from "react-redux"
import { AppStore } from "../../redux/store"

interface Props{
  createQuestion: (question: Question, image: File | null) => void,
  updateQuestion: (question: Question, idQuestion: number) => void,
}

interface InputValues {
  respuesta: string,
  descripcion: string,
  url_image?: string,
  active: string,
}

let initialState: InputValues = {
  respuesta: '',
  descripcion: '',
  url_image: "",
  active: '',
} 
let initialValues = initialState;
export const ModalQuestion = ({createQuestion, updateQuestion}:Props) => {
 
  const contextValue = useContext<CreateQuestionType | null>(ContextQuestion);  
  if(!contextValue)return 

  const classStore = useSelector((store:AppStore) => store.class)
  const { showModal, setShowModal, questionToUpdate, setQuestionToUpdate} = contextValue
  const [image, setImage] = useState<File | null>(null)
  //useEffect(() => {
    if(questionToUpdate){
      initialValues = {
        respuesta: questionToUpdate.respuesta,
        descripcion: questionToUpdate.descripcion,
        url_image: questionToUpdate.url_image,
        active: questionToUpdate.active ? '1': '0'
      }
     // setInitialValues(currentlyValues)
    }
   // console.log(values)
 // },[showModal])
  


  const handleSend = (values: InputValues) => {
    //actions.setSubmitting(false);
    /* new */
    const question: Question = {
      respuesta: values.respuesta,
      descripcion: values.descripcion,
      active: values.active === '1' ? true: false,
      clase_id: classStore.id
    }
    if(questionToUpdate === null){
      createQuestion(question, image);
    }else{
      //updateQuestion(question, questionToUpdate.id?? 0);
    }
 /*    const newRoad = {
      id: number,
      respuesta: string,
      descripcion: string,
      url_image: number,
      active: boolean
    } */
    //reateRoad(values);
    reset()
  } 

  const reset = () => {
    setQuestionToUpdate(null)
    initialValues = initialState,
    setImage(null),
    setShowModal(false);
  }

  const handleClose = () => {
    setShowModal(false)
    setQuestionToUpdate(null)
    initialValues = initialState
    //setInitialValues(initialState)
  }

  const yupSchema = Yup.object().shape({
    respuesta: Yup.string()
        .max(50, tooLongMessage)
        .required(requiredMessage)
        .strict(true)
        .trim(trimMessage),
    descripcion: Yup.string()
        .max(80, tooLongMessage)
        .required(requiredMessage)
        .strict(true)
        .trim(trimMessage),
    url_image: Yup.number()
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


  const handleManageImage = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files;
    if (file && file.length > 0) {
      const selected = file[0];
      setImage(selected);
    }
  }

  return (<Modal show={showModal} centered>
      <Modal.Header>
        <h5 className="title-header__modal">{questionToUpdate ? 'Editar Pregunta' : 'Nueva Pregunta'}</h5>
      </Modal.Header>
      <Modal.Body>
        <Formik 
              initialValues={initialValues} 
              onSubmit={(values: InputValues) => handleSend(values)}
             /*  validationSchema={yupSchema} */
              >
          <Form>
            <FormField name='descripcion' type='text'  placeHolder="Descripcion" label="Descripcion de la pregunta"/>
            <FormField name='respuesta' type='text'  placeHolder="respuesta ruta de aprendizaje" label="Respuesta de la pregunta"/>
            <FormField name='active' type='select' label="Estado" selectOptions={[["d", "Seleccione un estado"],["1", 'Activo'] , ["0", "Inactivo"]]}/>
            <Field className='input-file' name="image" type="file" onChange={handleManageImage}/>
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
