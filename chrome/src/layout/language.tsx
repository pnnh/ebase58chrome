'use client';

import styles from './language.module.scss';

import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import {getLangDefault, getLangInfo, langEn, supportedLanguages} from "@/utils/language.ts";
import {atom, useAtom} from 'jotai'
import LanguageIcon from '@mui/icons-material/Language';
import {atomWithStorage} from "jotai/utils"
import {StyledMenu} from "@/components/dropmenu.tsx";

const LanguageKey = 'WELanguage'

const initialLanguage = getLangDefault(navigator.language, langEn)

export const globalLanguageAtom = atomWithStorage(LanguageKey, initialLanguage)

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
            open={open}>
            <MenuItem  onClick={() =>goUrl('auto')} disableRipple>
                Auto
            </MenuItem>
            {
                supportedLanguages.map(language => (
                    <MenuItem key={language.key} onClick={() =>goUrl(language.key)} disableRipple>
                            {language.name}
                    </MenuItem>
                ))
            }
        </StyledMenu>
    </>
}
