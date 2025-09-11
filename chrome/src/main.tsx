import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {Base58Page} from "@/pages/base58.tsx";
import {createBrowserRouter} from "react-router";
import {RouterProvider} from "react-router/dom";
import {NotFoundPage} from "@/pages/notFound.tsx";
import {isRunningInChromeExtension} from "@/utils/config.ts";
import {defaultLanguage, getLangDefault, langEn, localText} from "@/utils/language.ts";
import {getStorage} from "@/utils/storage.ts";
import {LanguageKey} from "@/layout/language.tsx";

let router = createBrowserRouter([
    {
        path: "/",
        Component: Base58Page,
    },
    {
        path: '/:lang',
        Component: Base58Page,
    },
    {
        path: '*',
        Component: NotFoundPage,
    }
]);

const root = document.getElementById('root')

createRoot(root!).render(
    <StrictMode>
        <RouterProvider router={router}/>,
    </StrictMode>,
)

// 设置语言
const wantLang = getStorage(LanguageKey) as string || navigator.language;
const targetLang = getLangDefault(wantLang, defaultLanguage);
document.documentElement.lang = targetLang
document.title = localText(targetLang, 'AppName')
const descEl = document.querySelector('meta[name="description"]')
if (descEl) {
    descEl.setAttribute('content', localText(targetLang, 'AppDescription'));
}

// 调整Chrome扩展页面大小
if (isRunningInChromeExtension()) {
    console.log('RunningInChromeExtension');
    window.document.documentElement.classList.add('chrome-mode')
}
