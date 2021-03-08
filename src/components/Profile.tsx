import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import styles from '../styles/components/Profile.module.css';

export function Profile() {
    const { user } = useContext(UserContext);
    const { photoURL, displayName } = { ...user };

    return (
        <div className={styles.profileContainer}>
            <img src={photoURL ? photoURL : 'no-image.png'} alt="Eduardo Fujiwara" />
            <div>
                <strong>{displayName}</strong>
                <p>
                    <img src="icons/level.svg" alt="" />
                    Level {user ? user.level : 0}
                </p>
            </div>
        </div>
    );
}