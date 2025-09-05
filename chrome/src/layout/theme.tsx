'use client';

import { createTheme } from '@mui/material/styles';
import LightModeIcon from "@mui/icons-material/LightMode";
import styles from './theme.module.scss'
import {getStorage, setStorage} from "@/utils/storage.ts";
import {atom, useAtom} from 'jotai'

export const globalThemeAtom = atom('')

const lightTheme = createTheme({
    cssVariables: true,
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none', // 全局禁用文字大写
                },
            },
        },
    },
    palette: {
        mode: 'light',
    },
});

const darkTheme = createTheme({
    cssVariables: true,
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none', // 全局禁用文字大写
                },
            },
        },
    },
    palette: {
        mode: 'dark',
    },
})

const ThemeKey = 'WETheme'

export {lightTheme,darkTheme, ThemeKey};

export function ThemeSwitch() {
    // const [globalTheme, setGlobalTheme] = useAtom(globalThemeAtom)
    const switchTheme = () => {
        const storageThemeName = getStorage(ThemeKey) as string
        // setGlobalTheme(globalTheme === 'light' ? 'dark' : 'light')
        const isDark = storageThemeName === 'dark'
        if (isDark) {
            setStorage(ThemeKey, 'light')
        } else {
            setStorage(ThemeKey, 'dark')
        }
        window.location.reload()
    }
    return <LightModeIcon className={styles.themeIcon} sx={{cursor: 'pointer'}} onClick={switchTheme}/>
}
