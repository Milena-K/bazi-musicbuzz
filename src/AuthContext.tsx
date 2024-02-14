import React, { createContext, useState, useEffect, FC, ReactNode } from 'react';
import { get_user_info } from './api/users';

interface AuthContextType {
    sessionUuid: string | null;
    login: (uuid: string) => void;
    logout: () => void;
    userId: number | null;
}

const initialAuthContext: AuthContextType = {
    sessionUuid: null,
    login: () => {},
    logout: () => {},
    userId: null,
};

const AuthContext = createContext<AuthContextType>(initialAuthContext);

const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [sessionUuid, setSessionUuid] = useState<string | null>(null);
    const [userId, setUserId] = useState<number | null>(null);

    useEffect(() => {
        const storedUuid = localStorage.getItem('sessionUuid');
        if (storedUuid) {
            setSessionUuid(storedUuid);
            get_user_info(storedUuid).then(res => {
                if (res.user_id) {
                    setUserId(res.user_id)
                }
            })
        }
    });

    const login = (uuid: string) => {
        localStorage.setItem('sessionUuid', uuid);
        setSessionUuid(uuid);
    };

    const logout = () => {
        localStorage.removeItem('sessionUuid');
        setSessionUuid(null);
    };

    return (
        <AuthContext.Provider value={{ sessionUuid, login, logout, userId }}>
            {children}
        </AuthContext.Provider>
    );
};


export { AuthProvider, AuthContext };
