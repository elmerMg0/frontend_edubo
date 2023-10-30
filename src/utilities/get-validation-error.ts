import { TypeWithKey } from "../models/type-with-key"

export const getValidationError = ( errorCode: any) => {
    const codeMatcher: TypeWithKey<string> = {
        ERR_NETWORK: 'Se ropio la red',
        ERRO21:'ALGO'
    }
    return codeMatcher[errorCode];
}