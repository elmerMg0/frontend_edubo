import { PageInfo } from "../models/models";
import { Road } from "../pages/dashboard/Dashboard";

const APIURL = import.meta.env.VITE_REACT_APP_API_URL


type ApiResponse = {
    success: boolean;
    pageInfo: PageInfo
    roads: Road[]
     // Dependiendo de cómo está estructurada la respuesta de la API
};

export const APISERVICE = {
    get: async (url: string, params: string): Promise<ApiResponse> => {
        const res = await fetch(`${APIURL}${url}${params}`);
        if(!res.ok){
            throw new Error('Error http:' + res.status);
        }
        const data: ApiResponse = await res.json();
        return data;
    }
}