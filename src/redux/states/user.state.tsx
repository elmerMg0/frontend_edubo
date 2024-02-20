import { createSlice } from '@reduxjs/toolkit'

import { persistLocalStorage } from "../../utilities/localstorage.utility";
import { User } from '../../models/User';

export const UserEmptyState: User  = {
    username: '',
    accessToken: '',
    periodUser: {
        id: 0,
        state: false
    },
    tipo: ''
}

export const UserKey = 'user';
const userSlice = createSlice( {
    name: 'user',
    initialState: localStorage.getItem(UserKey) ? JSON.parse(localStorage.getItem(UserKey) as string): UserEmptyState,

    reducers: {
        createUser: (state, action) => {
            state;
            persistLocalStorage(UserKey , action.payload)
            return action.payload;
        }, 
        updateUser: ( state, action) => {
            const result = {...state, ...action.payload}
            persistLocalStorage(UserKey, result);
            return result;
        } , 
        resetUser: () => {
            return UserEmptyState;
        }
       }
})

export const { createUser, updateUser, resetUser } = userSlice.actions;
export default userSlice.reducer; 