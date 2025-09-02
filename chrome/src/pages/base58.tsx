
import styles from './page.module.scss'
import {langEn, localText} from "@/utils/language.ts";
import {Base58Component} from "@/components/base58.tsx";
import {ToolsLayout} from "@/layout/layout.tsx";
import {useLoaderData} from "react-router";

export function Base58Page({}: {}) {
    let data = useLoaderData();
    const lang = (data as any).lang || langEn
    return <ToolsLayout>
        <div className={styles.base58Page}>
            ==={JSON.stringify(data)}==
            <h1 className={styles.productTitle}>{localText(lang, 'AppName')}</h1>
            <Base58Component lang={lang}/>
        </div>
    </ToolsLayout>
}
