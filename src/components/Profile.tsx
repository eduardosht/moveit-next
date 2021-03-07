import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import { UserContext } from '../contexts/UserContext';
import styles from '../styles/components/Profile.module.css';

export function Profile() {
    const { level } = useContext(ChallengesContext);
    const { user } = useContext(UserContext);
    const { photoURL, displayName, email } = user.user;
    return (
        <div className={styles.profileContainer}>
            <img src={photoURL ? photoURL : 'no-image.png'} alt="Eduardo Fujiwara" />
            <div>
                <strong>{displayName}</strong>
                <p>
                    <img src="icons/level.svg" alt="" />
                    Level {level}
                </p>
            </div>
        </div>
    );
}