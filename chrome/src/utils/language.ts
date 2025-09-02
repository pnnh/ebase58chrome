import langEnData from '@/locales/en/messages.json' with { type: 'json' }
import langEsData from '@/locales/es/messages.json' with { type: 'json' }
import langFrData from '@/locales/fr/messages.json' with { type: 'json' }
import langDeData from '@/locales/de/messages.json' with { type: 'json' }
import langJaData from '@/locales/ja/messages.json' with { type: 'json' }
import langRuData from '@/locales/ru/messages.json' with { type: 'json' }
import langHiData from '@/locales/hi/messages.json' with { type: 'json' }
import langZhCNData from '@/locales/zh_CN/messages.json' with { type: 'json' }
import langZhTWData from '@/locales/zh_TW/messages.json' with { type: 'json' }

export const langEn = 'en'
export const langEs = 'es' // Spanish
export const langFr = 'fr' // French
export const langDe = 'de' // German
export const langJa = 'ja' // Japanese
export const langRu = 'ru' // Russian
export const langHi = 'hi' // Hindi
export const langZh = 'zh'
export const langZhans = 'zh-Hans' // Simplified Chinese
export const langZhant = 'zh-Hant' // Traditional Chinese
export const langZhCN = 'zh-CN' // Simplified Chinese
export const langZhTW = 'zh-TW' // Traditional Chinese

export const defaultLanguage = langEn

export const supportedLanguages = [
    langEn, langEs, langFr, langDe, langJa, langRu, langHi,
    langZh, langZhans, langZhant, langZhCN, langZhTW
]

export const languageDataMap: { [key: string]: typeof langEnData } = {
    [langEn]: langEnData,
    [langEs]: langEsData,
    [langFr]: langFrData,
    [langDe]: langDeData,
    [langJa]: langJaData,
    [langRu]: langRuData,
    [langHi]: langHiData,
    [langZh]: langZhCNData,
    [langZhans]: langZhCNData,
    [langZhant]: langZhTWData,
    [langZhCN]: langZhCNData,
    [langZhTW]: langZhTWData,
}

export function isSupportedLanguage(lang: string): boolean {
    return supportedLanguages.includes(lang)
}

export function getLanguageData(lang: string): typeof langEnData {
    if (isSupportedLanguage(lang) && languageDataMap[lang]) {
        return languageDataMap[lang]
    }
    return langEnData
}

export function getLangDefault(lang: string): string {
    if (isSupportedLanguage(lang)) {
        return lang
    }
    if (lang === 'zh-CN' || lang === 'zh-SG' || lang === 'zh-Hans') {
        return langZh
    }
    if (lang === 'zh-TW' || lang === 'zh-HK' || lang === 'zh-MO' || lang === 'zh-Hant') {
        return langZhant
    }
    return defaultLanguage
}

export function getLanguageFromPathname(pathname: string): string | undefined {
    const segments = pathname.split('/')
    if (segments.length > 1 && isSupportedLanguage(segments[1])) {
        return segments[1]
    }
    return undefined
}

export function replaceLanguageInPathname(pathname: string, lang: string): string {
    if (!isSupportedLanguage(lang)) {
        lang = defaultLanguage
    }
    const segments = pathname.split('/')
    if (segments.length > 1 && isSupportedLanguage(segments[1])) {
        segments[1] = lang
    } else {
        segments.splice(1, 0, lang)
    }
    const newPath = segments.join('/')
    if (newPath.endsWith('/'))
        return newPath.substring(0, newPath.length - 1) // 去掉最后的斜杠
    return newPath
}

export function localText(lang: string, keyName: keyof typeof langEnData): string {
    const langData = getLanguageData(lang)
    if (langData && langData[keyName] && langData[keyName].message) {
        return langData[keyName].message
    }
    // Fallback to English
    return langEnData[keyName].message // Default to English if language is not recognized
}
