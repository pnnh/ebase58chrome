import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {Base58Page} from "@/pages/base58.tsx";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import {NotFoundPage} from "@/pages/notFound.tsx";
import {getLangDefault, langEn} from "@/utils/language.ts";

let router = createBrowserRouter([
    {
        path: "/",
        Component: Base58Page,
        // loader: async ({ params }) => {
        //     var browserLanguage = navigator.language;
        //     console.log("browserLanguage", browserLanguage);
        //     const targetLang = getLangDefault(browserLanguage)
        //     console.log("targetLang", targetLang);
        //     return { lang: targetLang };
        // },
    },
    {
        path: '/:lang',
        Component: Base58Page,
        // loader: async ({ params }) => {
        //     let lang = params.lang || langEn
        //     return { lang:lang };
        // },
    },
    {
        path: '*',
        Component: NotFoundPage,
    }
]);

const root = document.getElementById('root')

createRoot(root!).render(
    <StrictMode>
        <RouterProvider router={router} />,
    </StrictMode>,
)
