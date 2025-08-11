// contexts/LanguageContext.js

'use client';

import { createContext, useContext, useEffect, useState } from "react";
import { LANG_STRINGS } from "../lib/Constants/App/language";
import { LANG_LOG_KEY } from "@/lib/Constants/Debugging/LogKeys";
import {saveLanguageLocally, getLang } from '@/lib/Utils/Browser/browserUtils';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
    const defaultLang = 'en';
    const [language, setLanguage] = useState(defaultLang);
    const [dir, setDir] = useState(LANG_STRINGS[defaultLang].meta.dir);

    useEffect(() => {

        const detectedLangFull = getLang();
        console.log("D_LANG: ",detectedLangFull)
        const shortLang = detectedLangFull.split('-')[0] ?? defaultLang;
        // const shortLang ='en';
        const meta =LANG_STRINGS[shortLang].meta || LANG_STRINGS[defaultLang].meta;

        setLanguage(shortLang);
        setDir(meta.dir);
        // saveLanguageLocally(shortLang);
        

        const html = document.documentElement;
        html.lang = meta.locale;
        html.dir = meta.dir;
        document.body.className = shortLang;

        console.log(LANG_LOG_KEY, shortLang);
    }, []);

    const changeLanguage = (newLang) => {
        const meta = LANG_STRINGS[newLang].meta ||LANG_STRINGS[defaultLang].meta;
        setLanguage(newLang);
        setDir(meta.dir);

        const html = document.documentElement;
        html.lang = meta.locale;
        html.dir = meta.dir;
        document.body.className = newLang;
        saveLanguageLocally(newLang);
    };

    return (
        <LanguageContext.Provider value={{ language, changeLanguage,language_strings:LANG_STRINGS[language], dir,inverted_dir:dir=='rtl'?'ltr':'rtl', meta: LANG_STRINGS[language].meta }}>
            {children}
        </LanguageContext.Provider>
    );
}

export const useLanguage = () => useContext(LanguageContext);
