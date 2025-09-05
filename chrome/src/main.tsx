import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {Base58Page} from "@/pages/base58.tsx";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import {NotFoundPage} from "@/pages/notFound.tsx";
import {langEn} from "@/utils/language.ts";

let router = createBrowserRouter([
    {
        path: "/",
        Component: Base58Page,
        loader: async ({ params }) => {
            return { lang: langEn };
        },
    },
    {
        path: '/:lang',
        Component: Base58Page,
        loader: async ({ params }) => {
            let lang = params.lang || langEn
            return { lang:lang };
        },
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
