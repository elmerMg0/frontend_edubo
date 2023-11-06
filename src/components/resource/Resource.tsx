import { createContext, useEffect, useState } from "react";
import ResourceTable from "./ResourceTable";
import { Resource, PageInfo } from "../../models/models";
import { APISERVICE, AxiosService } from "../../service/api.service";
import toast from "react-hot-toast";
import SearchInput from "../global/search/Search";
import { useSelector } from "react-redux";
import { AppStore } from "../../redux/store";
import { ResourceServiceName } from "../../service/apiServiceNames";
import { ModalResource } from "./ModalResource";

interface AppState{
    resources: Resource[],
    pageInfo: PageInfo | null,
    resource: Resource | null
}
export interface ContextResourceType{
  resourceToUpdate: Resource | null
  setResourceToUpdate: React.Dispatch<React.SetStateAction<Resource | null>>,
  showModal: boolean,
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}

export const ContextResource = createContext<ContextResourceType | null>(null);

export function ResourceComponent (){

    const [Resources, setResources] = useState<AppState['resources']>([]);
    const [pageInfo, setPageInfo] = useState<AppState['pageInfo']>(null);
    const [showModalConfirm, setShowModalConfirm] = useState(false);
    const [customerToDelete, setCustomerToDelete] = useState({});
    const [roadToUpdate, setRoadToUpdate] = useState<AppState['resource']>(null);
    const [filters, setFilters] = useState({nombre: ''});
    const [loading, setLoading] = useState(false);
    const [resourceToUpdate, setResourceToUpdate] = useState<AppState['resource']>(null)
    const [showModal, setShowModal] = useState(false);

    const [setVideoData, setSetVideoData] = useState({})
    const classStore = useSelector((store:AppStore) => store.class); 
    useEffect(() => {
      getResources();
      getVideo()
    }, []);
  
    const getVideo = () => {
      const apiKey = 'AIzaSyCJGIXnXUbUlctrvECnVtH1t8PPQXma1tg'
      const videoId = 'Uszj_k0DGsg';
      //fetch(`https://www.googleapis.com/youtube/v3/videos?key=${apiKey}&part=snippet&id=${videoId}`)
      fetch(`GET https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${apiKey}&part=snippet`)
      .then((response) => {
        setSetVideoData(response);
        console.log(response)
      })
      .catch((error) => {
        console.error('Error al obtener datos del video:', error);
      });
    }
  
    const getResources = async (pageNumber = 1, name=filters.nombre) => {
      //const params = `name=${name}`
      try {
        setLoading(true)
        let params = {
            idClass: classStore.id,
            page: pageNumber,
            name: name  
        }
        //const response = 
        //const { success, Resources , pageInfo } = await APISERVICE.get(ResourceserviceName.GET, params);
        const response = await AxiosService.get(ResourceServiceName.GET_CLASS_WITH_RESOURCES, params);
        if(response){
            const { resources, pageInfo } = response;
            setResources(resources);
            setPageInfo(pageInfo);
          }
      } catch (error) {
        
      } finally{
        setLoading(false);
      }
    };
  
    const createResource = async (Resource: Resource) => {
      try {
        setLoading(true)
        const { success, message } = await APISERVICE.post(Resource, ResourceServiceName.CREATE, '');
        if ( success ) {
          toast.success(message);
          getResources(pageInfo?.page, filters.nombre);
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
          getResources(pageInfo.page, filters.nombre);
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
    const updateResource = async (body: Resource, idResource: number) => {
      try {
        setLoading(true);
        let params = `idResource=${idResource}`;
        const {success, message, code} = await APISERVICE.post(body, ResourceServiceName.UPDATE, params);
        if (success) {
          toast.success(message);
          getResources(pageInfo?.page, filters.nombre);
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
      getResources(pageInfo.page, search)
    },500)
    ,[]) */
  
    const clearFilter = () => {
      //setFilters(filters => ({...filters, nombre: ''}))
      //getResources(pageInfo.page, "");
    }
  
    const HandleSetRoadToUpdate = (road: Resource) => {
      setRoadToUpdate(road)
    }
    return (
      <ContextResource.Provider value={{resourceToUpdate, setResourceToUpdate, showModal, setShowModal}}>
        <div className="content-private">
          <h3 className="title-header-secundary">{classStore.titulo}</h3>
          <h3 className="title-header">Recursos</h3>
          <SearchInput
            filterSomething={filtercategories}
            placeHolder="Nombre del curso"
            handleClear={clearFilter}   
            setShowModal={setShowModal}
          />

          <ResourceTable
            resources={Resources}
            getResources={getResources}
            deleteRoad={deleteRoadModal}
            pageInfo={pageInfo}
            /*setModalShow={setModalShow}
            loading={loading} */
              />
          <ModalResource
            createResource={createResource}
            updateResource={updateResource}
          />
       
        {/*   <ModalConfirm
            show={showModalConfirm}
            onHide={setShowModalConfirm}
            deleteSomething={deleteUser}
            message={messagesDangerous('Usuario')}
          /> */}
         {/*  {loading &&  <Loading/>} */}
        </div>
      </ContextResource.Provider>
    );
}