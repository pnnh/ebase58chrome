import styles from './navbar.module.scss'
import AppsIcon from '@mui/icons-material/Apps';

export function ContentPublicNavbar({}: {
}) {
    return <div className={styles.navHeader}>
        <div className={styles.leftNav}>
            <a className={styles.brandLink} href={`/`}>
                <img src='/logo.png' alt='logo' />
            </a>
        </div>
        <div className={styles.rightNav}>
            <a className={styles.toolsLink} href={`/`}><AppsIcon/></a>
        </div>
    </div>
}


