import { colors } from "../../../utilities/constans"
type TextAlign = 'left' | 'right' | 'center' | 'justify' | 'initial' | 'inherit';
interface Props{
    name: string,
    borTopLefRad?: number,
    borTopRigRad?: number,
    justifycontent?: TextAlign
}
export function ThTable({name, borTopLefRad = 0, borTopRigRad = 0, justifycontent = 'left'}:Props) {

    const styles = {
        backgroundColor: colors.COLOR_MAIN,
        color: colors.COLOR_WHITE,
        borderTopLeftRadius: `${borTopLefRad}px`,
        borderTopRightRadius: `${borTopRigRad}px`,
        textAlign: justifycontent
    }
    return   (<th style={styles}>{name}</th>)

}