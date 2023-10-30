import axios, { AxiosRequestConfig } from "axios"
import { getValidationError } from "../utilities/get-validation-error";
import toast from "react-hot-toast";

export const AxiosInterceptor = () => {
    const updateHeader = (request: AxiosRequestConfig) => {
        const token = "afdfadfadfbc";   
        const newHeader = {
            Authorization: 'Bearer alfjkl2kfjkaslfjldakfj',
            "Content-Type": "Application/json"
        }
        request.headers = newHeader as AxiosRequestConfig['headers'];
        console.log(request.headers)
        return request;
    }

    /* Request */
   /*  axios.interceptors.request.use(( request : any) => {
        if(request.url?.includes('upload'))return request;
        return updateHeader(request);
    }) */

    axios.interceptors.request.use(function (config: AxiosRequestConfig) {
        // Do something before request is sent
        console.log(config)
        return updateHeader(config);
      }, function (error) {
        // Do something with request error
        return Promise.reject(error);
      });


    /* Response */
    axios.interceptors.response.use(
        (response) => {
            return response.data
        },
        (error) => {
            toast.error(getValidationError(error.code))
            return Promise.reject(error)
        }

    )
 }