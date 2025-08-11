import { AUTH_TOKEN } from '@/lib/Constants/App/Tages';
import Cookies from 'js-cookie'
import { OwnerService, validateCookies } from './OwnerService';



export const getAuthTokenFromCookies = () => {

    const token = Cookies.get(AUTH_TOKEN); // read cookie

    return token


}

export const validateUserFromCookies = async ({
    onValidationSuccess = (result) => { console.log(console.log('[VALIDATION-SUCESSS]', JSON.stringify(message, null, 2))) },
    onValidationFailed = (error) => { console.log(console.log('[VALIDATION-FAILED]', JSON.stringify(error, null, 2))) },
    // onValidationPending=(user)=>{console.log(console.log('[VALIDATION-FAILED]', JSON.stringify(user, null, 2)))},
}) => {
    try {
        
        const result = await  new OwnerService(). validateCookies()
        onValidationSuccess(result)
    } catch (error) {
        onValidationFailed(error)
    }
}






