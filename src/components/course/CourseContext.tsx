import { ReactNode, createContext, useState } from "react";
import { Course, Road } from "../../models/models";


interface AppState {
    courseToUpdate: Course | null,
}
export interface ContextCourseType{
    courseToUpdate: Course | null
    setCourseToUpdate: React.Dispatch<React.SetStateAction<Course | null>>,
    showModal: boolean,
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}

export const ContextCourse = createContext<ContextCourseType | null>(null);

export function ContextCourseProvider ({children }:{children: ReactNode}){
    const [courseToUpdate, setCourseToUpdate] = useState<AppState['courseToUpdate']>(null)
    const [showModal, setShowModal] = useState(false);
    return(
        <ContextCourse.Provider value={{courseToUpdate, setCourseToUpdate, showModal, setShowModal}}>
            {children}
        </ContextCourse.Provider> 
    )
}