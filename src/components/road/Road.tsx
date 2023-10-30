import React, { useState, useEffect, useCallback, createContext } from "react";
import UserTable from "./RoadTable";
import { toast } from "react-hot-toast";
import './user.css'
import { PageInfo, Road } from "../../models/models";
import { APISERVICE } from "../../service/api.service";
import { RoadServiceName } from "../../service/apiServiceNames";
import { ModalRoad } from "./ModalRoad";
import { ContextRoadProvider } from "./RoadContext";
import SearchInput from "../global/search/Search";

interface AppState {
  roads: Road[],
  pageInfo: PageInfo | null,
  road: Road | null,
}
const initialStatePageInfo = {
  page: 0,
  count: 0,
  next: 0,
  previus: 0,
  start: 0,
  totalPages: 0
}

export const ContextRoad = createContext(null);
export default function RoadComponent() {
  const [roads, setRoads] = useState<AppState['roads']>([]);
  const [pageInfo, setPageInfo] = useState<AppState['pageInfo']>(null);
  const [showModalConfirm, setShowModalConfirm] = useState(false);
  const [customerToDelete, setCustomerToDelete] = useState({});
  const [roadToUpdate, setRoadToUpdate] = useState<AppState['road']>(null);
  const [filters, setFilters] = useState({nombre: ''});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getRoads();
  }, []);


  const getRoads = async (pageNumber = 1, name=filters.nombre) => {
    try {
      setLoading(true)
      let params = `page=${pageNumber}&name=${name}`;
      const { success, roads , pageInfo } = await APISERVICE.get(RoadServiceName.GET, params);
      if (success) {
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

  const HandleSetRoadToUpdate = (road: Road) => {
    setRoadToUpdate(road)
  }
  return (
    <ContextRoadProvider>
      <div className="content-private">
        <h3 className="title-header">Ruta de Aprendizaje</h3>
        
        <SearchInput
          filterSomething={filtercategories}
          placeHolder="Nombre de usuario"
          handleClear={clearFilter}
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
    </ContextRoadProvider>
  );
}
