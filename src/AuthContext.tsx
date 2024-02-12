import React, { createContext, useState, useEffect, FC, ReactNode } from 'react';

interface AuthContextType {
    sessionUuid: string | null;
    login: (uuid: string) => void;
    logout: () => void;
}

const initialAuthContext: AuthContextType = {
    sessionUuid: null,
    login: () => {},
    logout: () => {},
};

const AuthContext = createContext<AuthContextType>(initialAuthContext);

const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [sessionUuid, setSessionUuid] = useState<string | null>(null);

    useEffect(() => {
        const storedUuid = localStorage.getItem('sessionUuid');
        if (storedUuid) {
            setSessionUuid(storedUuid);
        }
    }, []);

    const login = (uuid: string) => {
        localStorage.setItem('sessionUuid', uuid);
        setSessionUuid(uuid);
    };

    const logout = () => {
        localStorage.removeItem('sessionUuid');
        setSessionUuid(null);
    };

    return (
        <AuthContext.Provider value={{ sessionUuid, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};


export { AuthProvider, AuthContext };
