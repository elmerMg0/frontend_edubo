import axios, { AxiosRequestConfig } from 'axios';
import toast from 'react-hot-toast';
import { getValidationError } from '../utilities/get-validation-error';

export const AxiosInterceptor = () => {
  //saveInLocalStorage(LocalStorageKeys.TOKEN, '123123123123');

  const updateHeader = (request: AxiosRequestConfig) => {
    //const token = getInLocalStorage(LocalStorageKeys.TOKEN);
    const token = 'getInLocalStorage(LocalStorageKeys.TOKEN);'
    const newHeaders = {
      Authorization: token,
      'Content-Type': 'application/json'
    };
    request.headers = newHeaders;
    return request;
  };

  axios.interceptors.request.use((request) => {
    if (request.url?.includes('assets')) return request;
    return updateHeader(request);
  });

  axios.interceptors.response.use(
    (response) => {
      console.log('response', response);
      if(response.data.message.includes('existosamente')){
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