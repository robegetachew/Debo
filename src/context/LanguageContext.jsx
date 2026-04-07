import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { translations } from '../i18n/translations';

const STORAGE_KEY = 'wedding-lang';

const LanguageContext = createContext(null);

/** @param {string} path */
function getNested(obj, path) {
    const parts = path.split('.');
    let cur = obj;
    for (const p of parts) {
        if (cur == null) return undefined;
        cur = cur[p];
    }
    return cur;
}

export function LanguageProvider({ children }) {
    const [lang, setLangState] = useState(() => {
        try {
            const s = localStorage.getItem(STORAGE_KEY);
            if (s === 'am' || s === 'en') return s;
        } catch {
            /* ignore */
        }
        return 'en';
    });

    const setLang = useCallback((next) => {
        setLangState(next);
        try {
            localStorage.setItem(STORAGE_KEY, next);
        } catch {
            /* ignore */
        }
    }, []);

    const t = useCallback(
        (path, ...args) => {
            const val = getNested(translations[lang], path);
            if (typeof val === 'function') return val(...args);
            return val ?? path;
        },
        [lang]
    );

    useEffect(() => {
        document.documentElement.lang = lang === 'am' ? 'am' : 'en';
        document.documentElement.classList.toggle('lang-am', lang === 'am');
    }, [lang]);

    useEffect(() => {
        const base = 'Tesfatsion & Dibora | Wedding Invitation';
        const am = 'ተስፋፂዮን እና ዲቦራ | የሠርግ ግብዣ';
        document.title = lang === 'am' ? am : base;
    }, [lang]);

    const value = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t]);

    return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
    const ctx = useContext(LanguageContext);
    if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
    return ctx;
}
