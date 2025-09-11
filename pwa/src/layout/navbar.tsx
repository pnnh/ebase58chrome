import styles from './navbar.module.scss'
import {PSLanguageSelector} from "@/layout/language.tsx";
import {ThemeSwitch} from "@/layout/theme.tsx";

export function ContentPublicNavbar() {
    return <div className={styles.navHeader}>
        <div className={styles.leftNav}>
            <a className={styles.brandLink} href={`/`}>
                <img src='/images/logo64.png' alt='logo' />
            </a>
        </div>
        <div className={styles.rightNav}>
            <ThemeSwitch/>
            <PSLanguageSelector />
        </div>
    </div>
}


