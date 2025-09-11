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

const wantLang = getStorage(LanguageKey) as string || navigator.language;
const targetLang = getLangDefault(wantLang, defaultLanguage);

function initMetaInfo() {
    // 设置语言
    document.documentElement.lang = targetLang
    document.title = localText(targetLang, 'AppName')
    const descEl = document.querySelector('meta[name="description"]')
    if (descEl) {
        descEl.setAttribute('content', localText(targetLang, 'AppDescription'));
    }
}

function setupPWA() {
    const manifestLink = document.getElementById('manifest-link') as HTMLLinkElement | null;
    if (manifestLink) {
        manifestLink.href = `/pwa/manifest/manifest_${targetLang}.json`;
    }

    const registerServiceWorker = async () => {
        if ("serviceWorker" in navigator) {
            try {
                const registration = await navigator.serviceWorker.register("/pwa/sw.js", {
                    scope: "/pwa/",
                });
                if (registration.installing) {
                    console.log("Installing Service worker");
                } else if (registration.waiting) {
                    console.log("Service worker installed");
                } else if (registration.active) {
                    console.log("Active Service worker");
                }
            } catch (error) {
                console.error(`ServiceWorker register failed：${error}`);
            }
        }
    };

    registerServiceWorker().then(r => {
        console.log('ServiceWorker registered');
    }).catch(e => {
        console.error('ServiceWorker register error', e);
    });
}

initMetaInfo();
setupPWA();