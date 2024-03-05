import { createSlice } from "@reduxjs/toolkit";
import { clearLocalStorage, persistLocalStorage } from "../../utilities/localstorage.utility";

const initialState = {
    repAutomatic: false,
}

export const SettingsKey = 'settings';
const settingSlice = createSlice( {
    name: SettingsKey,
    initialState: localStorage.getItem(SettingsKey) ? JSON.parse(localStorage.getItem(SettingsKey) as string) : initialState,
    reducers: {
      
        updateSettings: ( state, action) => {
            const result = {...state, ...action.payload}
            persistLocalStorage(SettingsKey, result);
            return result;
        } , 
        resetUser: () => {
            clearLocalStorage(SettingsKey);
            return initialState;
        },

       }
})

export const { updateSettings } = settingSlice.actions;
export default settingSlice.reducer; 