import { colors } from "../../../utilities/constans"
interface Props{
    name: string,
    borTopLefRad?: number,
    borTopRigRad?: number,
}
export function ThTable({name, borTopLefRad = 0, borTopRigRad = 0}:Props) {

    const styles = {
        backgroundColor: colors.COLOR_MAIN,
        color: colors.COLOR_WHITE,
        borderTopLeftRadius: `${borTopLefRad}px`,
        borderTopRightRadius: `${borTopRigRad}px`
    }
    return   (<th style={styles}>{name}</th>)

}