import { createContext, useState, useEffect } from 'react';
import { auth, generateUserDocument, updateUserDocument } from '../firebase';

interface User {
    challengesCompleted: number;
    displayName: string;
    email: string;
    experience: number;
    level: number;
    photoURL: string;
    uid: string;
}

interface UserContextData {
    user: User;
    signOut: Function;
    updateUserData: Function;
}

export const UserContext = createContext({} as UserContextData);

export function UserProvider({ children }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        auth.onAuthStateChanged(async userAuth => {
            const user = await generateUserDocument(userAuth) as User;
            setUser(user);
        })
    }, []);

    function signOut(e: Event) {
        e.preventDefault();
        e.stopPropagation();
        setUser(null);
        auth.signOut();
    }

    async function updateUserData(aditionalData) {
        const userModified = await updateUserDocument(user, aditionalData) as User;
        setUser(userModified);
    }

    return (
        <UserContext.Provider
            value={{
                user,
                signOut,
                updateUserData
            }}>
            {children}
        </UserContext.Provider>
    );
}
