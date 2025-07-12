// contexts/LanguageContext.js

'use client';

import { createContext, useContext, useEffect, useState } from "react";
import { LANG_META } from "../lib/Constants/App/language";
import { LANG_LOG_KEY } from "@/lib/Constants/Debugging/LogKeys";
import { getLang } from '@/lib/Utils/Browser/browserUtils';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
    const defaultLang = 'en';
    const [language, setLanguage] = useState(defaultLang);
    const [dir, setDir] = useState(LANG_META[defaultLang].dir);

    useEffect(() => {

        const detectedLangFull = getLang();
        const shortLang = detectedLangFull.split('-')[0] || defaultLang;
        const meta = LANG_META[shortLang] || LANG_META[defaultLang];

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
        const meta = LANG_META[newLang] || LANG_META[defaultLang];
        setLanguage(newLang);
        setDir(meta.dir);

        const html = document.documentElement;
        html.lang = meta.locale;
        html.dir = meta.dir;
        document.body.className = newLang;
        // saveLanguageLocally(newLang);
    };

    return (
        <LanguageContext.Provider value={{ language, changeLanguage, dir,inverted_dir:dir=='rtl'?'ltr':'rtl', meta: LANG_META[language] }}>
            {children}
        </LanguageContext.Provider>
    );
}

export const useLanguage = () => useContext(LanguageContext);
