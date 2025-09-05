
import styles from './page.module.scss'
import {langEn, localText} from "@/utils/language.ts";
import {Base58Component} from "@/components/base58.tsx";
import {ToolsLayout} from "@/layout/layout.tsx";
import {useLoaderData} from "react-router";
import {useEffect} from "react";
import {useAtom} from "jotai";
import {globalLanguageAtom} from "@/layout/language.tsx";

export function Base58Page() {
    let data = useLoaderData();
    const routeLang = (data as any).lang || langEn
    const [globalLang, setGlobalLang] = useAtom(globalLanguageAtom);
    useEffect(() => {
        if (!globalLang) {
            setGlobalLang(routeLang)
        }
    }, [routeLang])
    return <ToolsLayout>
        <div className={styles.base58Page}>
            <Base58Component/>
        </div>
    </ToolsLayout>
}
