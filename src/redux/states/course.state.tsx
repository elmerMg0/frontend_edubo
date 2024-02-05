import { createSlice } from "@reduxjs/toolkit";
import { persistLocalStorage } from "../../utilities/localstorage.utility";


const CourseEmptyState = {
    titulo: "" ,
    descripcion: "",
    duracion: '',
    active: false,
    numero_clases: 0
} 

export const ClassKey = 'course';

const courseSlice = createSlice({
    name: 'class',
    initialState: localStorage.getItem(ClassKey) ? JSON.parse(localStorage.getItem(ClassKey) as string) : CourseEmptyState,
    reducers: {
        createCourse: (state, action) => {
            persistLocalStorage(ClassKey, action.payload)
            return action.payload;
        }
    }
})

export const { createCourse } = courseSlice.actions
export default courseSlice.reducer