
import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import styles from '../styles/components/Topbar.module.css';

function Topbar() {
    const { user, signOut } = useContext(UserContext);

    return (
        user.user != null ?
            (
                <div className={styles.topbarContainer}>
                    <div></div>
                    <div>Move it - {user.user.displayName}</div>
                    <a onClick={(e) => signOut(e)}>Sign out</a>
                </div>
            ) :
            (
                <div></div>
            )
    )
}

export default Topbar;