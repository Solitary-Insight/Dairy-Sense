import { encryptData, decryptData } from "../Browser/EncryptData.js";
function isJsonStringified(str) {
    if (typeof str !== "string") return false;

    try {
        const parsed = JSON.parse(str);

        // Optional: Only consider it valid if the result is object or array
        return typeof parsed === "object" && parsed !== null;
    } catch (e) {
        return false;
    }
}

export const SaveInLocalStorage = ({ data, key }) => {
    // const encryptedData = encryptData({ data });
    // localStorage.setItem(key, encryptedData);
    localStorage.setItem(key, data);
};

export const ReadFromLocalStorage = ({ key }) => {

    return localStorage.getItem(key);


};

export const ReadAndDeleteFromLocalStorage = ({ key }) => {
    // const encryptedData = localStorage.getItem(key);
    // if (!encryptedData) return null;

    // const decryptedData = decryptData({ encryptedData });
    // return decryptedData;
    const data = localStorage.getItem(key)

    setTimeout(() => {
        localStorage.removeItem(key)

    }, 100)
    if(isJsonStringified(data)){
         return JSON.parse(data)
    }
    return data;


};

