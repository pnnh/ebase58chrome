'use client'

import {useState} from "react";
import styles from './base58.module.scss'
import {localText} from "@/utils/language.ts";
import {stringToBase58} from "@/utils/base58.ts";
import {useAtom} from "jotai";
import {globalLanguageAtom} from "@/layout/language.tsx";
import {Button, FormControlLabel, Radio, RadioGroup, Tooltip} from "@mui/material";
import {copyToClipboard} from "@/utils/clipboard.ts";

export function Base58Component() {
    const [sourceText, setSourceText] = useState('')
    const [encodedText, setEncodedText] = useState('')
    const [error, setError] = useState('')
    const [open, setOpen] = useState(false)
    const [message, setMessage] = useState<string>('success')
    const [flavor, setFlavor] = useState('default')
    const [globalLang, setGlobalLang] = useAtom(globalLanguageAtom);
    const lang = globalLang

    const handleTooltipClose = () => {
        setOpen(false);
    };

    return <div className={styles.base58Component}>
        <h1 className={styles.productTitle}>{localText(lang, 'AppName')}</h1>
        <div className={styles.textContainer}>
                <textarea name={'base58-source'} value={sourceText}
                          onChange={(event) => setSourceText(event.target.value)}
                          maxLength={4096}
                          placeholder={localText(lang, 'InputPlaceholder')}></textarea>
        </div>
        <div className={styles.flavorContainer}>
            <RadioGroup
                row
                aria-labelledby="base58-flavor-group-label"
                value={flavor}
                onChange={(e) => setFlavor(e.target.value)}
                name="base58-flavor-group">
                <FormControlLabel value="default" control={<Radio size='small'/>} label="default"/>
                <FormControlLabel value="xrp" control={<Radio size='small'/>} label="xrp"/>
                <FormControlLabel value="xmr" control={<Radio size='small'/>} label="xmr"/>
                <FormControlLabel value="flickr" control={<Radio size='small'/>} label="flickr"/>
                <FormControlLabel value="check" control={<Radio size='small'/>} label="check"/>
            </RadioGroup>
        </div>
        <div className={styles.actionContainer}>
            <Button variant={'contained'} size={'small'} onClick={() => {
                if (!sourceText) {
                    setError(localText(lang, 'InputPlaceholder'))
                    return
                }
                try {
                    setError('')
                    const text = stringToBase58(sourceText, flavor)
                    setEncodedText(text)
                } catch (e) {
                    setError(localText(lang, 'ConvertFailed'))
                }
            }}>
                {localText(lang, 'ConvertButton')}
            </Button>
            <Button variant={'contained'} size={'small'} onClick={() => {
                setSourceText('')
                setEncodedText('')
            }}>
                {localText(lang, 'ClearButton')}
            </Button>
        </div>
        <div className={styles.errorContainer}>
            {error && <div>{error}</div>}
        </div>
        <div className={styles.resultContainer}>
            <div className={styles.resultText}>
                {encodedText || <div className={styles.resultTips}>
                    {localText(lang, 'ResultPlaceholder')}
                </div>}
            </div>
        </div>
        <div className={styles.resultActionContainer}>
            <Tooltip title={message} placement="right"
                     onClose={handleTooltipClose}
                     open={open}
                     disableFocusListener
                     disableHoverListener
                     disableTouchListener
                     arrow
                     slotProps={{
                         popper: {
                             modifiers: [
                                 {
                                     name: 'offset',
                                     options: {
                                         offset: [0, -8],
                                     },
                                 },
                             ],
                         },
                     }}>
                <Button variant={'contained'} size={'small'}
                        onClick={() => {
                            if (!encodedText) {
                                return
                            }
                            copyToClipboard(encodedText).then(() => {
                                setMessage('success')
                            }).catch(() => {
                                setMessage('failed')
                            })
                            setOpen(true)
                            setTimeout(() => {
                                setOpen(false)
                            }, 3000)
                        }}>
                    {localText(lang, 'CopyButton')}
                </Button>
            </Tooltip>
        </div>
    </div>
}
