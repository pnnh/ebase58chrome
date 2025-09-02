
import styles from './page.module.scss'
import {langEn, localText} from "@/utils/language.ts";
import {Base58Component} from "@/components/base58.tsx";
import {ToolsLayout} from "@/layout/layout.tsx";

export function Base58Page({}: {
}) {
    return <ToolsLayout>
        <div className={styles.base58Page}>
            <h1 className={styles.productTitle}>{localText(langEn, 'Base58 编码工具', 'Base58 Encoding Tool')}</h1>
            <Base58Component lang={langEn}/>
        </div>
    </ToolsLayout>
}
