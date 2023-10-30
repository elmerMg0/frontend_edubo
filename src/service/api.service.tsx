import { PageInfo, Road } from "../models/models";

const APIURL = import.meta.env.VITE_REACT_APP_API_URL


type ApiResponse = {
    success: boolean;
    pageInfo: PageInfo
    roads: Road[]
     // Dependiendo de cómo está estructurada la respuesta de la API
};

export const APISERVICE = {
    get: async (url: string, params: string) => {
        const res = await fetch(`${APIURL}${url}${params}`);
        if(!res.ok){
            throw new Error('Error http:' + res.status);
        }
        const data = await res.json();
        return data;
    },
    post: async <T,>(body: T,url: string, params: string) => {
        const response = await fetch(`${APIURL +url + params}`,{
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(body)
        })
        if(!response.ok){
            throw(new Error('New error'))
        }

        const data = await response.json();
        return data;
    },
    put: async <T,> (body: T, url: string, params: string) => {
        const reponse = await fetch(`${APIURL + url + params}`, {
            method: 'PUT',
            headers: {
                "content-type": 'aplicaction/json',
            },
            body: JSON.stringify(body)
        })
        if(!reponse.ok){
            throw(new Error('Error'))
        }
        const data = await reponse.json()
        return data;
    }

}