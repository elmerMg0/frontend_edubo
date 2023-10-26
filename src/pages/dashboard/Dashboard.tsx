import { useEffect, useState } from "react"
import { APISERVICE } from "../../service/api.service";
import { TableRoads } from "./TableRoads";
import { PageInfo } from "../../models/models";


export interface Road {
    nombre: string,
    descripcion: string,
    numero_cursos: number,
    active: boolean
}
export function Dashboard (){

    const [roads, setRoads] = useState<Road[]>([]);
    const [pageInfo, setPageInfo] = useState<PageInfo>();
    useEffect(() => {
        getStudyPlan()
    },[])

    const getStudyPlan = async () =>{
        const url = 'ruta-aprendizaje/index/?'
        const params = 'name='
        const  res = await APISERVICE.get(url, params);
        if(res.success){
            setRoads(res.roads) 
            setPageInfo(res.pageInfo);
        }
        console.log(res)
    }
    return (
        <>
            <TableRoads roads={roads}/>
        </>
    )
}