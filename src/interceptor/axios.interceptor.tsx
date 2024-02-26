import axios, { AxiosRequestConfig } from 'axios';
import toast from 'react-hot-toast';
import { getValidationError } from '../utilities/get-validation-error';
import { getCookie } from '../utilities/cookies';
import { decryptString } from '../utilities/utilities';
const APIKEY = import.meta.env.VITE_REACT_KEY
export const AxiosInterceptor = () => {

  const updateHeader = (request: AxiosRequestConfig) => {
    if(getCookie('token') === null) return request;
    const userStringity = decryptString(getCookie('token') ?? '', APIKEY);
    const infoUSER = JSON.parse(userStringity)
    const value = infoUSER.accessToken;
    const token = `Bearer ${value}`
    const newHeaders = {
      Authorization: token,
      'Content-Type': 'application/json'
    };
    request.headers = newHeaders;
    return request;
  };

  axios.interceptors.request.use((request: any) => {
    if (request.url?.includes('assets')) return request;
    return updateHeader(request);
  });

  axios.interceptors.response.use(
    (response) => {
      if(response?.data?.message.includes('existosamente')){
        toast.success(response.data.message);
      }
      return response.data;
    },
    (error) => {
        toast.error(getValidationError(error.code));
      return Promise.reject(error);
    }
  );
};