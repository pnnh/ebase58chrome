import React, {useEffect} from "react";
import {JotaiProvider} from "./provider";
import {ThemeProvider} from '@mui/material/styles';
import {darkTheme, globalThemeAtom, lightTheme, ThemeKey} from "@/layout/theme.tsx";
import {getStorage} from "@/utils/storage.ts";
import './global.scss'
import {useAtom} from "jotai";

export function GlobalLayout({
                                               children
                                           }: {
    children: React.ReactNode
}) {
    const storageThemeName = getStorage(ThemeKey) as string
    const [globalTheme, setGlobalTheme] = useAtom(globalThemeAtom)
    useEffect(() => {
        if (!globalTheme) {
            setGlobalTheme(storageThemeName)
            window.document.body.classList.add(`${storageThemeName}-theme`)
        }
    }, [storageThemeName])
    const currentTheme = (globalTheme||storageThemeName) === 'dark' ? darkTheme : lightTheme
    return <JotaiProvider>
            <ThemeProvider theme={currentTheme}>
                {children}
            </ThemeProvider>
    </JotaiProvider>
}
