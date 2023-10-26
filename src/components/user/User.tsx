import React, { useState, useEffect, useCallback } from "react";
import { APISERVICE } from "../../../services/api.services";
import ModalCreateUser from "./ModalCreateUser";
import UserTable from "./UserTable";
import ModalConfirm from "../../global/modal/ModalConfirm";
import { toast } from "react-hot-toast";
import SearchInput from "../../global/search/SearchInput";
import './user.css'
import { userServiceNames } from "../../../services/serviceNames";
import debounce from "just-debounce-it";
import Loading from "../../global/loader/Loading";
import { messagesError } from "../../../helpers/messageGlobal";
import { messagesDangerous } from "../../../utilities/constans";
import { PageInfo } from "../../models/models";

export default function User() {
  const [users, setUsers] = useState([]);
  const [pageInfo, setPageInfo] = useState<PageInfo>(null);
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
      const { success, pageInfo } = await APISERVICE.get(userServiceNames.GET, params);
      if (success) {
        setUsers(pageInfo.users);
        setPageInfo(pageInfo);
      }
    } catch (error) {
      
    } finally{
      setLoading(false);
    }
  };

  const createuser = async (user: User, image) => {
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

  const deleteUserModal = async (id) => {
    setShowModalConfirm(true);
    setCustomerToDelete(id);
  };

  const deleteUser = async () => {
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

  const updateUser = async (body, image) => {
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

  const filtercategories = (category) => {
    setFilters(filters => ({...filters, nombre: category}))
    debouncedGetCategogies(category)
  };

  const debouncedGetCategogies = useCallback( debounce(search => {
    getUsers(pageInfo.page, search)
  },500)
  ,[])

  const clearFilter = () => {
    setFilters(filters => ({...filters, nombre: ''}))
    getUsers(pageInfo.page, "");
  }

  return (
    <>
      <div className="content-private">
        <h3 className="title-header">Usuarios</h3>
        <SearchInput
          setShow={setModalShow}
          filterSomething={filtercategories}
          placeHolder="Nombre de usuario"
          handleClear={clearFilter}
        />
        <UserTable
          getUsers={getUsers}
          users={users}
          pageInfo={pageInfo}
          deleteUser={deleteUserModal}
          setUserUpdate={setUserUpdate}
          setModalShow={setModalShow}
          loading={loading}
            />
        <ModalCreateUser
          show={modalShow}
          onHide={() => setModalShow(false)}
          createuser={createuser}
          userToUpdate={userUpdate}
          setUserToUpdate={setUserUpdate}
          updateUser={updateUser}
        />
        <ModalConfirm
          show={showModalConfirm}
          onHide={setShowModalConfirm}
          deleteSomething={deleteUser}
          message={messagesDangerous('Usuario')}
        />
        {loading &&  <Loading/>}
      </div>
    </>
  );
}
