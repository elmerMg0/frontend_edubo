import { colors } from "../../../utilities/constans"
import { EditIcon, EyesIcon, TablesIcon, TrashIcon } from "./Icons"

export function EditIconGlobal(){
    return(
        <EditIcon color={colors.COLOR_MAIN}/>
    )
}
export function TrashIconGlobal(){
    return(
        <TrashIcon color={colors.COLOR_RED}/>
    )
}
export function TablesIconGlobal(){
    return(
        <TablesIcon color={colors.COLORGREEN}/>
    )
}

export function EyesIconGlobal(){
    return(
        <EyesIcon color={colors.COLORMAIN}/>
    )
}