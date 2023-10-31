import { createSlice } from "@reduxjs/toolkit";
import { persistLocalStorage } from "../../utilities/localstorage.utility";


const ClassEmptyState = {
    titulo: "" ,
    descripcion: "",
    duracion: '',
    active: false,
    numero_clases: 0
} 

export const ClassKey = 'class';

const classSlice = createSlice({
    name: 'class',
    initialState: localStorage.getItem(ClassKey) ? JSON.parse(localStorage.getItem(ClassKey) as string) : ClassEmptyState,
    reducers: {
        createClass: (state, action) => {
            persistLocalStorage(ClassKey, action.payload)
            return action.payload;
        }
    }
})

export const { createClass } = classSlice.actions
export default classSlice.reducer