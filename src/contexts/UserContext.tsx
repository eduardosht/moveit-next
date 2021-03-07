import { createContext, useState, useEffect } from 'react';
import { auth, generateUserDocument } from '../firebase';

interface UserContextData {
    user: any;
    signOut: Function;
}

export const UserContext = createContext({} as UserContextData);

export function UserProvider({ children }) {
    const [user, setUser] = useState({ user: null });

    useEffect(() => {
        auth.onAuthStateChanged(async userAuth => {
            const user = await generateUserDocument(userAuth);
            setUser({ user: user });
        })
    }, []);

    function signOut(e) {
        e.preventDefault();
        e.stopPropagation();
        setUser({ user: null });
        auth.signOut();
    }

    return (
        <UserContext.Provider
            value={{
                user,
                signOut
            }}>
            {children}
        </UserContext.Provider>
    );
}
