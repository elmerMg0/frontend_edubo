import { useEffect, useState } from "react";
import { ContextCourseProvider } from "./CourseContext";
import CourseTable from "./CourseTable";
import { ModalCourse } from "./ModalCourse";
import { Course, PageInfo, Road } from "../../models/models";
import { APISERVICE, AxiosService } from "../../service/api.service";
import { CourseServiceName } from "../../service/apiServiceNames";
import toast from "react-hot-toast";
import SearchInput from "../global/search/Search";
import { useSelector } from "react-redux";
import { AppStore } from "../../redux/store";

interface AppState{
    courses: Course[],
    pageInfo: PageInfo | null,
    course: Course | null
}

export function Course (){

    const [courses, setCourses] = useState<AppState['courses']>([]);
    const [pageInfo, setPageInfo] = useState<AppState['pageInfo']>(null);
    const [showModalConfirm, setShowModalConfirm] = useState(false);
    const [customerToDelete, setCustomerToDelete] = useState({});
    const [roadToUpdate, setRoadToUpdate] = useState<AppState['course']>(null);
    const [filters, setFilters] = useState({nombre: ''});
    const [loading, setLoading] = useState(false);
    const road = useSelector((store:AppStore) => store.road); 

    useEffect(() => {
      getCourses();
    }, []);
  
  
    const getCourses = async (pageNumber = 1, name=filters.nombre) => {
      //const params = `name=${name}`
      try {
        setLoading(true)
        let params = `page=${pageNumber}&name=${name}`;
        //const response = 
        //const { success, courses , pageInfo } = await APISERVICE.get(courseserviceName.GET, params);
       
        const response = await AxiosService.get(CourseServiceName.GET, '');
        if(response){
            const { courses, pageInfo} = response;
            setCourses(courses);
            setPageInfo(pageInfo);
          }
      } catch (error) {
        
      } finally{
        setLoading(false);
      }
    };
  
    const createCourse = async (course: Course) => {
      try {
        setLoading(true)
        const { success, message, code } = await APISERVICE.post(course, CourseServiceName.CREATE, '');
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
    const updateCourse = async (body: Course, idRoad: number) => {
      try {
        setLoading(true);
        let params = `idRoad=${idRoad}`;
        const {success, message, code} = await APISERVICE.post(body, CourseServiceName.UPDATE, params);
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
  
    const HandleSetRoadToUpdate = (road: Course) => {
      setRoadToUpdate(road)
    }
    return (
      <ContextCourseProvider>
        <div className="content-private">
          <h3 className="title-header-secundary">{road.nombre}</h3>
          <h3 className="title-header">Cursos</h3>
          
        
          <CourseTable
            courses={courses}
            getCourses={getCourses}
            deleteRoad={deleteRoadModal}
            pageInfo={pageInfo}
            /*setModalShow={setModalShow}
            loading={loading} */
              />
          <ModalCourse
            createCourse={createCourse}
            updateCourse={updateCourse}
          />
       
        {/*   <ModalConfirm
            show={showModalConfirm}
            onHide={setShowModalConfirm}
            deleteSomething={deleteUser}
            message={messagesDangerous('Usuario')}
          /> */}
         {/*  {loading &&  <Loading/>} */}
        </div>
        <SearchInput
            filterSomething={filtercategories}
            placeHolder="Nombre del curso"
            handleClear={clearFilter}   
          />
      </ContextCourseProvider>
    );
}