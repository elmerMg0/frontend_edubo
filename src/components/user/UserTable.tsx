import { Table } from "react-bootstrap";
import { colors } from "../../../utilities/constans";
import { TrTable } from "../../global/HeadTable";
import Paginator from "../../global/paginador/Paginator";
import UserTableRow from "./UserTableRow";

export default function UserTable({
  getUsers,
  users,
  pageInfo,
  deleteUser,
  setUserUpdate,
  setModalShow,
  loading
}) {
  return (
    <>
        <Table responsive>
          <thead >
            <tr>
              <TrTable name='Nombre' borTopLefRad={10} />
              <TrTable name='Tipo' />
              <TrTable name='Foto' />
              <TrTable name='Estado' />
              <TrTable name='Accion' borTopRigRad={10}/>
            </tr>
          </thead>
          <tbody>
            {users && users.length > 0 ? (
              users.map((user) => (
                <UserTableRow
                  key = {user.id + user.nombres}
                  user = {user}
                  deleteUser = {deleteUser}
                  setUserUpdate = {setUserUpdate}
                  setModalShow = {setModalShow}
                />
              ))
            ) : (
              <tr>
                <td colSpan={5}>{
                  !loading && "No existen usuarios aun!"
                  }
                  </td>
              </tr>
            )}
          </tbody>
        </Table>
        <div className="mt-2">
           {users?.length > 0 &&
                  <Paginator pageInfo={pageInfo} getData={getUsers} />
            }
        </div>
    </>
  );
}
