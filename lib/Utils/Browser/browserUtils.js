import { LANG_STRINGS } from '@/lib/Constants/App/language';
import { LANG_TAG } from '@/lib/Utils/Browser/browserUtils'
// INFO: TRIM TEXTS FOR ADJUSTEMENTS
export const trimText = (text, maxLength = 20) => {
    if (!text) return "";
    return text.length > maxLength ? text.slice(0, maxLength - 3) + "..." : text;
};


//TODO: Scrolls untill message box comes to center
export const scrollElementCenter = ({ element, delay = 3000 }) => {

    setTimeout(() => {
        const el = element.current;
        if (!el) return;

        const rect = el.getBoundingClientRect();
        const scrollTop = window.scrollY;
        const offset = rect.top + scrollTop - window.innerHeight / 2 + rect.height / 2;

        window.scrollTo({
            top: offset,
            behavior: "smooth",
        });
    }, delay)

};

export function formatDateTime(isoString, locale = 'en-GB', timeZone = 'Asia/Karachi') {
    const date = new Date(isoString);

    return new Intl.DateTimeFormat(locale, {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
        timeZone,
    }).format(date);
}


export function getBrowserLanguage() {
    const browserLang = navigator.language || navigator.userLanguage;
    return browserLang
}

// set language Tag locally in local storage 
export function saveLanguageLocally(lang) {
    console.log('LANG_TO_SAVED', lang)

    localStorage.setItem(LANG_TAG, lang)
}
// Get Language Tag from local storage 
export function getLang() {
    const locally_set_language = localStorage.getItem(LANG_TAG); // ✅ Only one argument

    console.log('GET_LANG"', locally_set_language);

    // Proper null/undefined check
    if (locally_set_language === undefined || locally_set_language === null || locally_set_language == "undefined") {
        return "en-US";
    }

    return locally_set_language;
}



export function getLangResposiveClasses(meta) {
    const classes = meta.dir == 'rtl' ? `font-${meta.class}  leading-[2.25rem] tracking-[0.05em] text-right` : ` font-${meta.class}  `

    return classes

}


// given array of sub objects in language string one can dynamically switch between strings of different lang 

export function reduceArraytoObject(language, messageArray) {

    console.log(language,messageArray)
    return messageArray.reduce((acc, key) => acc?.[key], LANG_STRINGS[language]);
}