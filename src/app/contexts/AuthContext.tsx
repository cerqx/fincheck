import { createContext, useCallback, useEffect, useState } from 'react';
import { localStorageKeys } from '../config/localStorageKeys';
import { useQuery } from '@tanstack/react-query';
import { usersService } from '../services/usersService';
import { httpClient } from '../services/httpClient';
import toast from 'react-hot-toast';
import { PageLoader } from '../../view/components/PageLoader';

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

    const { isError, isFetching } = useQuery({
        queryKey: ['loggedUsers'],
        queryFn: () => usersService.me(),
        enabled: signedIn,
        staleTime: Infinity
    })

    useEffect(() => {
        if(isError) {
            toast.error('Sua sessão expirou!')
            signout();
        }
    }, [isError, signout])

    if(isFetching) {
        return (
            <PageLoader />
        )
    }

    return (
        <AuthContext.Provider value={{ signedIn, signin, signout}}>
            {children}
        </AuthContext.Provider>
    )
}