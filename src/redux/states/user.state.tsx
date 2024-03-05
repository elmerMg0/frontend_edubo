import { createSlice } from "@reduxjs/toolkit";
import { deleteCookie, getCookie, setCookie } from "../../utilities/cookies";
import { decryptString, encryptString } from "../../utilities/utilities";
const key = import.meta.env.VITE_REACT_KEY;
const initialState = {
    name: '',
    accessToken: '',
    id: -1,
    subscribed: false,
    image: '',
}

export const UserKey = 'user';
export const UserKey2 = 'token';
const userSlice = createSlice( {
    name: 'user',
    initialState: getCookie(UserKey2) ? JSON.parse(decryptString(getCookie(UserKey2) as string, key)) : initialState,
    reducers: {
      
        updateUser: ( state, action) => {
            const result = {...state, ...action.payload}
            const tokenEncrypt = encryptString(JSON.stringify(result), key);
            setCookie(UserKey2, tokenEncrypt, 2);
            return result;
        } , 
        resetUser: () => {
            deleteCookie('token');
            return initialState;
        }
       }
})

export const { updateUser, resetUser } = userSlice.actions;
export default userSlice.reducer; 