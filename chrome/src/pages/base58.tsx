
import styles from './page.module.scss'
import {Base58Component} from "@/components/base58.tsx";
import {ToolsLayout} from "@/layout/layout.tsx";

export function Base58Page() {
    return <ToolsLayout>
        <div className={styles.base58Page}>
            <Base58Component/>
        </div>
    </ToolsLayout>
}
