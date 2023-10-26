import { Table } from "react-bootstrap";
import { Road } from "./Dashboard";


interface Props{
    roads: Road[]
}
export function TableRoads ({roads}: Props){
    return (
        <Table>
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Descripicon</th>
                    <th>Numero de Cursos</th>
                    <th>Estado</th>
                </tr>
                <tbody>
                    {
                        roads?.length > 0 ? roads.map(road => {
                            return <tr>
                                <td>{road.nombre}</td>
                                <td>{road.descripcion}</td>
                                <td>{road.numero_cursos}</td>
                                <td>{road.active}</td>
                            </tr>
                        })
                        :
                        <tr>
                            <td colSpan={4}>No existen planes</td>
                        </tr>
                    }
                </tbody>
            </thead>
        </Table>
    )
}