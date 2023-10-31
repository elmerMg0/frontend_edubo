import React, { useState, useEffect, createContext } from "react";
import { toast } from "react-hot-toast";
import { PageInfo, Question } from "../../models/models";
import { APISERVICE, AxiosService } from "../../service/api.service";
import SearchInput from "../global/search/Search";
import { QuestionServiceName } from "../../service/apiServiceNames";
import QuestionTable from "./QuestionTable";
import { ModalQuestion } from "./ModalQuestion";
import { useSelector } from "react-redux";
import { AppStore } from "../../redux/store";

interface AppState {
  questions: Question[],
  pageInfo: PageInfo | null,
  question: Question | null,
}

export interface CreateQuestionType{
  questionToUpdate: Question | null
  setQuestionToUpdate: React.Dispatch<React.SetStateAction<Question | null>>,
  showModal: boolean,
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}

export const ContextQuestion = createContext<CreateQuestionType | null>(null);

export default function Question() {
  const [questions, setquestions] = useState<AppState['questions']>([]);
  const [pageInfo, setPageInfo] = useState<AppState['pageInfo']>(null);
  const [showModalConfirm, setShowModalConfirm] = useState(false);
  const [customerToDelete, setCustomerToDelete] = useState({});
  const [filters, setFilters] = useState({nombre: ''});
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [questionToUpdate, setQuestionToUpdate] = useState<AppState['question']>(null)

  const classStore = useSelector((store:AppStore) => store.class)

  useEffect(() => {
    getQuestions();
  }, []);


  const getQuestions = async (pageNumber = 1, name=filters.nombre) => {
    //const params = `name=${name}`
    try {
      setLoading(true)
      let params = {
          idClass: classStore.id,
          pageNumber: pageNumber,
          name: name
      };
      const response = await AxiosService.get(QuestionServiceName.GET_CLASS_WITH_QUESTIONS, params);
      if(response){
          const { questions, pageInfo} = response;
          setquestions(questions);
          setPageInfo(pageInfo);
        }
    } catch (error) {
      
    } finally{
      setLoading(false);
    }
  };

  const createQuestion = async (question: Question) => {
    try {
      setLoading(true)
      const { success, message, code } = await APISERVICE.post(question, QuestionServiceName.CREATE, '');
      if ( success ) {
        toast.success(message);
        getQuestions(pageInfo?.page, filters.nombre);
      }else{
        //toast.error(messagesError(code));
      }
    } catch (error) {
      
    } finally{
      setLoading(false);
    }
  };

  const deleteQuestionModal = async (id: number) => {
   /*  setShowModalConfirm(true);
    setCustomerToDelete(id); */
  };

 /*  const deleteUser = async () => {
    try {
      setLoading(true)
      setShowModalConfirm(false);
      let params = `idUser=${customerToDelete}`;
      const {success, message, code} = await APISERVICE.get(userServiceNames.DISABLE, params);
      if ( success ) {
        getQuestions(pageInfo.page, filters.nombre);
        toast.success(message);
      }else{
        toast.error(messagesError(code));
      }
    } catch (error) {
      toast.error('Ocurrio un error')
    } finally{
      setLoading(false)
    }
  
  };
 */
  const updateQuestion = async (body: Question, idquestion: number) => {
    try {
      setLoading(true);
      let params = `idquestion=${idquestion}`;
      const {success, message, code} = await APISERVICE.post(body, QuestionServiceName.UPDATE, params);
      if (success) {
        toast.success(message);
        getQuestions(pageInfo?.page, filters.nombre);
      }else{
        //toast.error(messagesError(code));
      }
    } catch (error) {
      toast.error('Ocurrio un error')
    } finally{
      setLoading(false)
    }
  
  };

  const filtercategories = (category: string) => {
    setFilters(filters => ({...filters, nombre: category}))
    //debouncedGetCategogies(category)
  };

/*   const debouncedGetCategogies = useCallback( debounce(search => {
    getQuestions(pageInfo.page, search)
  },500)
  ,[]) */

  const clearFilter = () => {
    //setFilters(filters => ({...filters, nombre: ''}))
    //getQuestions(pageInfo.page, "");
  }

  return (
    <ContextQuestion.Provider value={{questionToUpdate, setQuestionToUpdate, showModal, setShowModal}}>
      <div className="content-private">
        <h3 className="title-secundary">{classStore.titulo}</h3>
        <h3 className="title-header">Preguntas</h3>
        
        <SearchInput
          filterSomething={filtercategories}
          placeHolder="Nombre de la ruta de aprendizaje"
          handleClear={clearFilter}
          setShowModal={setShowModal}
        />
        <QuestionTable
          questions={questions}
          getQuestions={getQuestions}
          deleteQuestion={deleteQuestionModal}
          pageInfo={pageInfo}
          /*setModalShow={setModalShow}
          loading={loading} */
            />
        <ModalQuestion
          createQuestion={createQuestion}
          updateQuestion={updateQuestion}
        />
      {/*   <ModalConfirm
          show={showModalConfirm}
          onHide={setShowModalConfirm}
          deleteSomething={deleteUser}
          message={messagesDangerous('Usuario')}
        /> */}
       {/*  {loading &&  <Loading/>} */}
      </div>
    </ContextQuestion.Provider>
  );
}
