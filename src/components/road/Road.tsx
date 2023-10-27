import React, { useState, useEffect, useCallback } from "react";
import ModalCreateUser from "./RoadCreateUser";
import UserTable from "./RoadTable";
import { toast } from "react-hot-toast";
import './user.css'
import { PageInfo, Road } from "../../models/models";
import { APISERVICE } from "../../service/api.service";
import { RoadServiceName } from "../../service/apiServiceNames";

interface AppState {
  roads: Road[],
  pageInfo: PageInfo | null,
}
const initialStatePageInfo = {
  page: 0,
  count: 0,
  next: 0,
  previus: 0,
  start: 0,
  totalPages: 0
}
export default function RoadComponent() {
  const [roads, setRoads] = useState<AppState['roads']>([]);
  const [pageInfo, setPageInfo] = useState<AppState['pageInfo']>(null);
  const [modalShow, setModalShow] = useState(false);
  const [showModalConfirm, setShowModalConfirm] = useState(false);
  const [customerToDelete, setCustomerToDelete] = useState({});
  const [userUpdate, setUserUpdate] = useState({});
  const [filters, setFilters] = useState({nombre: ''});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async (pageNumber = 1, name=filters.nombre) => {
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

 /*  const createuser = async (user: User, image) => {
    try {
      setLoading(true)
      const formData = new FormData();
     
      formData.append("data", JSON.stringify(user));
      if (image) formData.append("file", user.url_image);
  
      const { success, message, code } = await APISERVICE.postWithImage(formData, userServiceNames.CREATE);
      if ( success ) {
        toast.success(message);
        getUsers(pageInfo.page, filters.nombre);
      }else{
        toast.error(messagesError(code));
      }
    } catch (error) {
      
    } finally{
      setLoading(false);
    }
  };
 */
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
        getUsers(pageInfo.page, filters.nombre);
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
 /*  const updateUser = async (body, image) => {
    try {
      setLoading(true);
      let $params = `id=${userUpdate.id}`;
      const data = new FormData();
    
      data.append("data", JSON.stringify(body));
      if (image) data.append("file", image);
      const {success, message, code} = await APISERVICE.postWithImage(data, userServiceNames.UPDATE, $params);
      if (success) {
        toast.success(message);
        getUsers(pageInfo.page, filters.nombre);
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
 /*  const filtercategories = (category) => {
    setFilters(filters => ({...filters, nombre: category}))
    debouncedGetCategogies(category)
  };
 */
/*   const debouncedGetCategogies = useCallback( debounce(search => {
    getUsers(pageInfo.page, search)
  },500)
  ,[]) */

  const clearFilter = () => {
    //setFilters(filters => ({...filters, nombre: ''}))
    //getUsers(pageInfo.page, "");
  }

  return (
    <>
      <div className="content-private">
        <h3 className="title-header">Ruta de Aprendizaje</h3>
       {/*  <SearchInput
          setShow={setModalShow}
          filterSomething={filtercategories}
          placeHolder="Nombre de usuario"
          handleClear={clearFilter}
        /> */}
        <UserTable
          roads={roads}
          getUsers={getUsers}
          deleteRoad={deleteRoadModal}
          pageInfo={pageInfo}
          /*setUserUpdate={setUserUpdate}
          setModalShow={setModalShow}
          loading={loading} */
            />
       {/*  <ModalCreateUser
          show={modalShow}
          onHide={() => setModalShow(false)}
          createuser={createuser}
          userToUpdate={userUpdate}
          setUserToUpdate={setUserUpdate}
          updateUser={updateUser}
        /> */}
       {/*  <ModalConfirm
          show={showModalConfirm}
          onHide={setShowModalConfirm}
          deleteSomething={deleteUser}
          message={messagesDangerous('Usuario')}
        /> */}
       {/*  {loading &&  <Loading/>} */}
      </div>
    </>
  );
}
