import langEnData from '@/locales/en/messages.json' with {type: 'json'}
import langEsData from '@/locales/es/messages.json' with {type: 'json'}
import langFrData from '@/locales/fr/messages.json' with {type: 'json'}
import langDeData from '@/locales/de/messages.json' with {type: 'json'}
import langJaData from '@/locales/ja/messages.json' with {type: 'json'}
import langRuData from '@/locales/ru/messages.json' with {type: 'json'}
import langPtData from '@/locales/pt/messages.json' with {type: 'json'}
import langHiData from '@/locales/hi/messages.json' with {type: 'json'}
import langZhCNData from '@/locales/zh_CN/messages.json' with {type: 'json'}
import langZhTWData from '@/locales/zh_TW/messages.json' with {type: 'json'}

export const langEn = 'en'
export const langEs = 'es' // Spanish
export const langFr = 'fr' // French
export const langDe = 'de' // German
export const langJa = 'ja' // Japanese
export const langRu = 'ru' // Russian
export const langHi = 'hi' // Hindi
export const langPt = 'pt' // Portuguese
export const langZh = 'zh'
// export const langZhans = 'zh-Hans' // Simplified Chinese
// export const langZhant = 'zh-Hant' // Traditional Chinese
// export const langZhCN = 'zh-CN' // Simplified Chinese
export const langZhTW = 'zh-TW' // Traditional Chinese

export const defaultLanguage = langEn

export const supportedLanguages = [
    {
        key: langEn, name: 'English'
    },
    {
        key: langEs, name: 'Español'
    },
    {
        key: langFr, name: 'Français'
    },
    {
        key: langDe, name: 'Deutsch'
    },
    {
        key: langRu, name: 'Русский'
    },
    {
        key: langPt, name: 'Português'
    },
    {
        key: langHi, name: 'हिन्दी'
    },
    // {
    //     key: langZh, name: '简体中文'
    // },
    {
        key: langJa, name: '日本語'
    },
    {
        key: langZh, name: '简体中文'
    },
    // {
    //     key: langZhans, name: '简体中文'
    // },
    {
        key: langZhTW, name: '繁體中文'
    },
    // {
    //     key: langZhant, name: '繁體中文'
    // },
]

export const languageDataMap: { [key: string]: typeof langEnData } = {
    [langEn]: langEnData,
    [langEs]: langEsData,
    [langFr]: langFrData,
    [langDe]: langDeData,
    [langJa]: langJaData,
    [langRu]: langRuData,
    [langPt]: langPtData,
    [langHi]: langHiData,
    [langZh]: langZhCNData,
    // [langZhans]: langZhCNData,
    // [langZhant]: langZhTWData,
    // [langZhCN]: langZhCNData,
    [langZhTW]: langZhTWData,
}

export function getLangInfo(lang: string): { key: string, name: string } | undefined {
    const targetLang = getLangDefault(lang, defaultLanguage)
    return supportedLanguages.find(item => item.key === targetLang)
}

export function getLanguageData(lang: string): typeof langEnData {
    const targetLang = getLangDefault(lang, defaultLanguage)
    const langData = languageDataMap[targetLang]
    if (langData) {
        return langData
    }
    return languageDataMap[defaultLanguage]
}

export function getLangDefault(wantLang: string, fallbackLang: string): string {
    if (!wantLang || wantLang === 'auto') {
        wantLang = navigator.language;
    }
    if (supportedLanguages.findIndex(item => item.key === wantLang) !== -1) {
        return wantLang
    }
    if (wantLang === 'zh-CN' || wantLang === 'zh-SG' || wantLang === 'zh-Hans') {
        return langZh
    }
    if (wantLang === 'zh-TW' || wantLang === 'zh-HK' || wantLang === 'zh-MO' || wantLang === 'zh-Hant') {
        return langZhTW
    }
    return fallbackLang
}

export function localText(lang: string, keyName: keyof typeof langEnData): string {
    const langData = getLanguageData(lang)
    if (langData && langData[keyName] && langData[keyName].message) {
        return langData[keyName].message
    }
    // Fallback to English
    return langEnData[keyName].message // Default to English if language is not recognized
}
