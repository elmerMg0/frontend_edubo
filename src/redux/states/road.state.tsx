import { createSlice } from "@reduxjs/toolkit";
import { Road } from "../../models/models";
import { persistLocalStorage } from "../../utilities/localstorage.utility";

export const RoadEmptyState: Road = {
    nombre: "" ,
    descripcion: "",
    active: false,
    numero_cursos: 0,
    id: 0
}
export const RoadKey = 'road'

const roadSlice =  createSlice({
    name: 'road',
    initialState: localStorage.getItem(RoadKey) ? JSON.parse(localStorage.getItem(RoadKey) as string) : RoadEmptyState,
    reducers: {
        createRoad: (state, action) => {
            persistLocalStorage(RoadKey, action.payload)
            return action.payload;
        }
    }
})

export const { createRoad } = roadSlice.actions
export default roadSlice.reducer;