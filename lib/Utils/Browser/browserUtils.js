import { LANG_TAG } from '@/lib/Utils/Browser/browserUtils'

export function getBrowserLanguage() {
    const browserLang = navigator.language || navigator.userLanguage;
    return browserLang
}

// set language Tag locally in local storage 
export function saveLanguageLocally(lang) {
    console.log('LANG_TO_SAVED',lang )

    localStorage.setItem(LANG_TAG, lang)
}

// Get Language Tag from local storage 
export function getLang() {
    // const browser_lang = getBrowserLanguage();
    const locally_set_language=localStorage.getItem(LANG_TAG,null)

    console.log('GET_LANG', locally_set_language)
    return locally_set_language ||"en-US"




}