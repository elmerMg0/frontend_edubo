import { ReactNode, createContext, useState } from "react";
import { Road } from "../../models/models";


interface AppState {
    roadToUpdate: Road | null,
}
export interface CreateContextType{
    roadToUpdate: Road | null
    setRoadToUpdate: React.Dispatch<React.SetStateAction<Road | null>>,
    showModal: boolean,
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}

export const ContextRoad = createContext<CreateContextType | null>(null);

export function ContextRoadProvider ({children }:{children: ReactNode}){
    const [roadToUpdate, setRoadToUpdate] = useState<AppState['roadToUpdate']>(null)
    const [showModal, setShowModal] = useState(false);
    return(
        <ContextRoad.Provider value={{roadToUpdate, setRoadToUpdate, showModal, setShowModal}}>
            {children}
        </ContextRoad.Provider> 
    )
}