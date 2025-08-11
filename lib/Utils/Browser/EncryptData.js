import CryptoJS from "crypto-js";
import { DAIRY_SENSE_DATA_ENC_KEY } from "../../Constants/App/Keys.js";

export const encryptData = ({ payload, key = DAIRY_SENSE_DATA_ENC_KEY }) => {
    return payload   //BUG: CREATING ENCRYPTED_DATA CONTAINS '/.' that can cause error in navigation
    const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(payload), key).toString();
    return encryptedData;

}

export const decryptData=({encryptedData,key=DAIRY_SENSE_DATA_ENC_KEY})=>{
    return encryptedData   //BUG: DUMMY ENCRYPTED DATA RETURN AS IT IS 

    const bytes = CryptoJS.AES.decrypt(encryptedData, key);
    const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return decryptedData;
}