'use client';

import {createTheme} from '@mui/material/styles';
import styles from './theme.module.scss'
import {getStorage, setStorage} from "@/utils/storage";
import {atom, useAtom} from 'jotai'
import {atomWithStorage} from "jotai/utils";
import {useState} from "react";
import {StyledMenu} from "@/components/dropmenu.tsx";
import MenuItem from "@mui/material/MenuItem";
import {localText} from "@/utils/language.ts";
import {globalLanguageAtom} from "@/layout/language.tsx";
import ContrastIcon from '@mui/icons-material/Contrast';

const ThemeKey = 'WETheme'

function getInitialTheme() {
    const storageThemeName = getStorage(ThemeKey) as string
    let targetTheme = ''
    if (storageThemeName === 'light' || storageThemeName === 'dark') {
        targetTheme = storageThemeName
    } else {
        // 默认跟随系统
        const isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        targetTheme = isDark ? 'dark' : 'light'
    }
    window.document.body.classList.add(`${targetTheme}-theme`);
    return targetTheme
}

const initialTheme = getInitialTheme()

export const globalThemeAtom = atomWithStorage(ThemeKey, initialTheme)

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

export {lightTheme, darkTheme, ThemeKey};

export function ThemeSwitch() {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [theme, setTheme] = useAtom(globalThemeAtom)
    const [globalLanguage] = useAtom(globalLanguageAtom)

    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const switchTheme = (targetTheme: string) => {
        setTheme(targetTheme);
        setAnchorEl(null);

        // const classNames = Array.from(window.document.body.classList)
        // for (const name of classNames) {
        //     if (name.endsWith('-theme')) {
        //         window.document.body.classList.remove(name)
        //     }
        // }
        // const themeClassName = `${targetTheme}-theme`
        // window.document.body.classList.add(themeClassName)
        window.location.reload()
    }
    return <>
        <div className={styles.themeSelector}
             onClick={handleClick}>
            <ContrastIcon className={styles.themeIcon} aria-hidden={undefined} sx={{cursor: 'pointer'}}/>
            {theme === 'auto' ? localText(globalLanguage, "AutoTheme") : theme === 'light' ?
                localText(globalLanguage, "LightTheme") : localText(globalLanguage, "DarkTheme")}
        </div>
        <StyledMenu
            elevation={0}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            anchorEl={anchorEl}
            open={open}>
            <MenuItem onClick={() => switchTheme('auto')} disableRipple>
                {localText(globalLanguage, "AutoTheme")}
            </MenuItem>
            <MenuItem onClick={() => switchTheme('light')} disableRipple>
                {localText(globalLanguage, "LightTheme")}
            </MenuItem>
            <MenuItem onClick={() => switchTheme('dark')} disableRipple>
                {localText(globalLanguage, "DarkTheme")}
            </MenuItem>
        </StyledMenu>
    </>
}
