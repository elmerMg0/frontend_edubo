import { createContext, useEffect, useState } from "react";
import { Class, Course, PageInfo } from "../../models/models";
import { APISERVICE, AxiosService } from "../../service/api.service";
import { ClassServiceName } from "../../service/apiServiceNames";
import toast from "react-hot-toast";
import SearchInput from "../global/search/Search";
import { useSelector } from "react-redux";
import { AppStore } from "../../redux/store";
import ClassTable from "./ClassTable";
import { ModalClass } from "./ModalClass";

interface AppState{
    classes: Class[],
    pageInfo: PageInfo | null,
    class: Class | null
}
export interface ContextClassType{
  classToUpdate: Class | null
  setClassToUpdate: React.Dispatch<React.SetStateAction<Class | null>>,
  showModal: boolean,
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}

export const ContextClass = createContext<ContextClassType | null>(null);

export function ClassComponent (){

    const [classes, setClases] = useState<AppState['classes']>([]);
    const [pageInfo, setPageInfo] = useState<AppState['pageInfo']>(null);
    const [showModalConfirm, setShowModalConfirm] = useState(false);
    const [customerToDelete, setCustomerToDelete] = useState({});
    const [filters, setFilters] = useState({nombre: ''});
    const [loading, setLoading] = useState(false);
    const [classToUpdate, setClassToUpdate] = useState<AppState['class']>(null)
    const [showModal, setShowModal] = useState(false);


    const classStore = useSelector((store:AppStore) => store.class); 

    useEffect(() => {
      getCourses();
    }, []);
  
  
    const getCourses = async (pageNumber = 1, name=filters.nombre) => {
      //const params = `name=${name}`
      try {
        setLoading(true)
        let params = {
            idClass: classStore.id
        }
        //const response = 
        //const { success, courses , pageInfo } = await APISERVICE.get(courseserviceName.GET, params);
        const response = await AxiosService.get(ClassServiceName.GET_COURSE_WITH_CLASSES, params);
        if(response){
            const { courses } = response;
            setClases(courses[0].clases);
            //setPageInfo(pageInfo);
          }
      } catch (error) {
        
      } finally{
        setLoading(false);
      }
    };
  
    const createClass = async (course: Class) => {
      try {
        setLoading(true)
        const { success, message } = await APISERVICE.post(course, ClassServiceName.CREATE, '');
        if ( success ) {
          toast.success(message);
          getCourses(pageInfo?.page, filters.nombre);
        }else{
          //toast.error(messagesError(code));
        }
      } catch (error) {
        
      } finally{
        setLoading(false);
      }
    };
  
    const deleteRoadModal = async (id: number) => {
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
          getCourses(pageInfo.page, filters.nombre);
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
    const updateClass = async (body: Class, idClass: number) => {
      try {
        setLoading(true);
        let params = `idClass=${idClass}`;
        const {success, message} = await APISERVICE.post(body, ClassServiceName.UPDATE, params);
        if (success) {
          toast.success(message);
          getCourses(pageInfo?.page, filters.nombre);
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
      getCourses(pageInfo.page, search)
    },500)
    ,[]) */
  
    const clearFilter = () => {
      //setFilters(filters => ({...filters, nombre: ''}))
      //getCourses(pageInfo.page, "");
    }
  
    return (
      <ContextClass.Provider value={{classToUpdate, setClassToUpdate, showModal, setShowModal}}>
        <div className="content-private">
          <h3 className="title-header-secundary">{classStore.titulo}</h3>
          <h3 className="title-header">Clases</h3>
          <SearchInput
            filterSomething={filtercategories}
            placeHolder="Nombre del curso"
            handleClear={clearFilter}   
            setShowModal={setShowModal}
          />

          <ClassTable
            classes={classes}
            getCourses={getCourses}
            deleteRoad={deleteRoadModal}
            pageInfo={pageInfo}
            /*setModalShow={setModalShow}
            loading={loading} */
              />
          <ModalClass
            createClass={createClass}
            updateClass={updateClass}
          />
       
        {/*   <ModalConfirm
            show={showModalConfirm}
            onHide={setShowModalConfirm}
            deleteSomething={deleteUser}
            message={messagesDangerous('Usuario')}
          /> */}
         {/*  {loading &&  <Loading/>} */}
        </div>
       
      </ContextClass.Provider>
    );
}