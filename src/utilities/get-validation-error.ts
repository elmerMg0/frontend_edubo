import { TypeWithKey } from "../models/type-with-key"

export const getValidationError = ( errorCode: any) => {
    const codeMatcher: TypeWithKey<string> = {
        required: 'This field is required',
        min: 'Excedd the minumun amount',
        max: 'Excedd the maximum amount',
        minlength: 'Exceed the minimum length',
        manlength: 'Exceed the maximum length',
        ERR_NETWORK: 'Se rompio la red',
        UNAUTHORIZED: 'Please log in to continue',
        NOT_AUTHORIZED: 'Please lon in to continue',
        FORBIDDEN: 'You dont have permission to execute the request',
        NOT_FOUND: 'The requested infroamtion was not found',
        METHOS_NOT_ALLOWED: 'There has been an error, please try again later '
    }
    return codeMatcher[errorCode];
}