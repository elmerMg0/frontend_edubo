import React, { useState, useEffect, useCallback, createContext, useContext } from "react";
import UserTable from "./RoadTable";
import { toast } from "react-hot-toast";
import './user.css'
import { PageInfo, Road } from "../../models/models";
import { APISERVICE, AxiosService } from "../../service/api.service";
import { RoadServiceName } from "../../service/apiServiceNames";
import { ModalRoad } from "./ModalRoad";
import SearchInput from "../global/search/Search";

interface AppState {
  roads: Road[],
  pageInfo: PageInfo | null,
  road: Road | null,
}

export interface CreateContextType{
  roadToUpdate: Road | null
  setRoadToUpdate: React.Dispatch<React.SetStateAction<Road | null>>,
  showModal: boolean,
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}

export const ContextRoad = createContext<CreateContextType | null>(null);

export default function RoadComponent() {
  const [roads, setRoads] = useState<AppState['roads']>([]);
  const [pageInfo, setPageInfo] = useState<AppState['pageInfo']>(null);
  const [showModalConfirm, setShowModalConfirm] = useState(false);
  const [customerToDelete, setCustomerToDelete] = useState({});
  const [filters, setFilters] = useState({nombre: ''});
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [roadToUpdate, setRoadToUpdate] = useState<AppState['road']>(null)

  useEffect(() => {
    getRoads();
  }, []);


  const getRoads = async (pageNumber = 1, name=filters.nombre) => {
    //const params = `name=${name}`
    try {
      setLoading(true)
      let params = {
          pageNumber: pageNumber,
          name: name
      };
      //const response = 
      //const { success, roads , pageInfo } = await APISERVICE.get(RoadServiceName.GET, params);
      const response = await AxiosService.get(RoadServiceName.GET, params);
      if(response){
          const { roads, pageInfo} = response;
          setRoads(roads);
          setPageInfo(pageInfo);
        }
    } catch (error) {
      
    } finally{
      setLoading(false);
    }
  };

  const createRoad = async (road: Road) => {
    try {
      setLoading(true)
      const { success, message, code } = await APISERVICE.post(road, RoadServiceName.CREATE, '');
      if ( success ) {
        toast.success(message);
        getRoads(pageInfo?.page, filters.nombre);
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
        getRoads(pageInfo.page, filters.nombre);
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
  const updateRoad = async (body: Road, idRoad: number) => {
    try {
      setLoading(true);
      let params = `idRoad=${idRoad}`;
      const {success, message, code} = await APISERVICE.post(body, RoadServiceName.UPDATE, params);
      if (success) {
        toast.success(message);
        getRoads(pageInfo?.page, filters.nombre);
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
    getRoads(pageInfo.page, search)
  },500)
  ,[]) */

  const clearFilter = () => {
    //setFilters(filters => ({...filters, nombre: ''}))
    //getRoads(pageInfo.page, "");
  }

  return (
    <ContextRoad.Provider value={{roadToUpdate, setRoadToUpdate, showModal, setShowModal}}>
      <div className="content-private">
        <h3 className="title-header">Ruta de Aprendizaje</h3>
        
        <SearchInput
          filterSomething={filtercategories}
          placeHolder="Nombre de la ruta de aprendizaje"
          handleClear={clearFilter}
          setShowModal={setShowModal}
        />
        <UserTable
          roads={roads}
          getRoads={getRoads}
          deleteRoad={deleteRoadModal}
          pageInfo={pageInfo}
          /*setModalShow={setModalShow}
          loading={loading} */
            />
        <ModalRoad
          createRoad={createRoad}
          updateRoad={updateRoad}
        />
      {/*   <ModalConfirm
          show={showModalConfirm}
          onHide={setShowModalConfirm}
          deleteSomething={deleteUser}
          message={messagesDangerous('Usuario')}
        /> */}
       {/*  {loading &&  <Loading/>} */}
      </div>
    </ContextRoad.Provider>
  );
}
