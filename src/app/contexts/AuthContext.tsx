import { createContext, useCallback, useState } from 'react';
import { localStorageKeys } from '../config/localStorageKeys';
import { useQuery } from '@tanstack/react-query';
import { usersService } from '../services/usersService';
import { httpClient } from '../services/httpClient';

interface AuthContextValue {
     signedIn: boolean;
     signin(accessToken: string): void;
     signout(): void,
}

export const AuthContext = createContext({} as AuthContextValue)

export function AuthProvider({children}: {children: React.ReactNode}) {
    const [signedIn, setSignedIn] = useState<boolean>(() => {
        const storedAccessToken = localStorage.getItem(localStorageKeys.ACCESS_TOKEN);
        return !!storedAccessToken
    });

    const signin = useCallback((accessToken: string) => {
        localStorage.setItem(localStorageKeys.ACCESS_TOKEN, accessToken);
        httpClient.defaults.headers.Authorization = `Bearer ${accessToken }`

        setSignedIn(true);
    }, []);

    const signout = useCallback(() => {
        localStorage.removeItem(localStorageKeys.ACCESS_TOKEN);
        
        setSignedIn(false);
    }, []);

    useQuery({
        queryKey: ['loggedUsers'],
        queryFn: () => usersService.me(),
        enabled: signedIn
    })

    return (
        <AuthContext.Provider value={{ signedIn, signin, signout}}>
            {children}
        </AuthContext.Provider>
    )
}