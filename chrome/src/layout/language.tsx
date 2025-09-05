'use client';

import styles from './language.module.scss';

import * as React from 'react';
import Menu, { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {alpha, styled} from "@mui/system";
import {getLangInfo, langEn, langZh, langZhant, supportedLanguages} from "@/utils/language.ts";
import {atom, useAtom} from 'jotai'
import LanguageIcon from '@mui/icons-material/Language';

export const globalLanguageAtom = atom('')

const StyledMenu = styled((props: MenuProps) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: '6rem',
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
            padding: '2px 0',
            '& .MuiMenuItem-root': {
                padding: '2px 8px',
                minHeight: '2rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            },
        },
        '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
                marginRight: theme.spacing(1),
            },
            '&:active': {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity,
                ),
            },
        },
    },
}));

export function PSLanguageSelector() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [language, setLanguage] = useAtom(globalLanguageAtom)
    const langInfo = getLangInfo(language || langEn)
    if (!langInfo) {
        throw new Error('Invalid language: ' + language)
    }
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const goUrl = (targetLang: string) => {
        setLanguage(targetLang);
        setAnchorEl(null);
    }
    return <>
        <div className={styles.langSelector}
            onClick={handleClick}>
            <LanguageIcon/>
            {langInfo.name}
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
            open={open} >
            {
                supportedLanguages.map(language => (
                    <MenuItem key={language.key} onClick={() =>goUrl(language.key)} disableRipple>
                            {language.name}
                    </MenuItem>
                ))
            }
            {/*<MenuItem onClick={handleClose} disableRipple>*/}
            {/*    <div className={styles.langItem} onClick={()=>goUrl(langEn)}>*/}
            {/*        English*/}
            {/*    </div>*/}
            {/*</MenuItem>*/}
            {/*<MenuItem onClick={handleClose} disableRipple>*/}
            {/*    <div className={styles.langItem} onClick={()=>goUrl(langZh)}>*/}
            {/*    简体中文*/}
            {/*    </div>*/}
            {/*</MenuItem>*/}
            {/*<MenuItem onClick={handleClose} disableRipple>*/}
            {/*    <div className={styles.langItem} onClick={()=>goUrl(langZhant)}>*/}
            {/*    繁体中文*/}
            {/*    </div>*/}
            {/*</MenuItem>*/}
        </StyledMenu>
    </>
}
