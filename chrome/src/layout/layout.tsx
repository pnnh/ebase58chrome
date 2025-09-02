import React from 'react'
import styles from './layout.module.scss'
import {ContentPublicNavbar} from "@/layout/navbar.tsx";
import {GlobalLayout} from "@/layout/global.tsx";

export function ToolsLayout({
                                              children,
                                          }: {
    children: React.ReactNode,
}) {
    return <GlobalLayout>
        <div className={styles.templateContainer}>
            <div className={styles.templateNavbar}>
                <ContentPublicNavbar />
            </div>
            <div className={styles.templateBody}>
                <div className={styles.bodyContainer}>
                    {children}
                </div>
            </div>
        </div>
    </GlobalLayout>
}
