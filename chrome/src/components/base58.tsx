'use client'

import {useState} from "react";
import styles from './base58.module.scss'
import {localText} from "@/utils/language.ts";
import {stringToBase58} from "@/utils/base58.ts";

export function Base58Component({lang}: { lang: string }) {
    const [sourceText, setSourceText] = useState('')
    const [encodedText, setEncodedText] = useState('')
    const [error, setError] = useState('')
    return <div className={styles.base58Component}>
        <div className={styles.textContainer}>
                <textarea value={sourceText}
                          onChange={(event) => setSourceText(event.target.value)}
                          maxLength={1024}
                          placeholder={localText(lang, '请输入文本内容', 'Please input text')}></textarea>
        </div>
        <div className={styles.actionContainer}>
            <button onClick={() => {
                if (!sourceText) {
                    setError(localText(lang, '请输入文本内容', 'Please input text'))
                    return
                }
                try {
                    setError('')
                    const text = stringToBase58(sourceText)
                    setEncodedText(text)
                } catch (e) {
                    setError(localText(lang, '转换失败', 'Conversion failed'))
                }
            }}>
                {localText(lang, '转换为Base58', 'Convert to Base58')}
            </button>
        </div>
        <div className={styles.errorContainer}>
            {error && <div>{error}</div>}
        </div>
        <div className={styles.resultContainer}>
                {encodedText}
        </div>
    </div>
}
