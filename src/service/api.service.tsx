import axios from "axios"
import { getCookie } from "../utilities/cookies"
import { decryptString } from "../utilities/utilities"

const APIURL = import.meta.env.VITE_REACT_APP_API_URL
const APIKEY = import.meta.env.VITE_REACT_KEY;

const token = getCookie('token')
let accessToken = ''
if(token){
    const userInfo = JSON.parse(decryptString(token ?? '', APIKEY))
    accessToken = userInfo?.accessToken
}

export const setToken = (token: string) => {
    accessToken = token
}

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
                "Accept": "application/json",
                "Authorization": `Bearer ${accessToken}`
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
                "content-type": 'aplication/json',
            },
            body: JSON.stringify(body)
        })
        if(!reponse.ok){
            throw(new Error('Error'))
        }
        const data = await reponse.json()
        return data;
    }

    ,
    posWithImage: async(body: any, url: string, params: string) => {
        const response = await fetch(`${APIURL + url + params}`, {
            method: "POST",
        /*     headers: {
                "content-type": "application/json",
            }, */
            body: body
        })      
        if(!response.ok){
            throw(new Error('New error'));
        }
    },
}

export const AxiosService = {
    get: (url: string, params: any) => {
        return axios.get(`${APIURL+ url}`, {params: params});
    },
}