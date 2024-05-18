import { PropsWithChildren, createContext, useEffect, useState } from 'react';
import { User } from '../types/auth.types';

type AuthContextProps = {
    auth: boolean; // Cambiado para admitir null
    setAuth: React.Dispatch<React.SetStateAction<boolean>>; // Cambiado para admitir null
    user: User | null
    setUser: React.Dispatch<React.SetStateAction<User | null>>
};

export const AuthContext = createContext<AuthContextProps>(null!);

export const AuthProvider = ({ children }: PropsWithChildren) => {
    const [auth, setAuth] = useState<boolean>(false);

    const initialUserState = () => {
        const userLog = localStorage.getItem('user')
        return userLog ? JSON.parse(userLog) : null
    }

    const [user, setUser] = useState<User | null>(initialUserState)

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        token ? setAuth(true) : setAuth(false);
    }, []); // Solo se ejecuta una vez al montar el componente

    return (
        <AuthContext.Provider value={{ auth, setAuth, user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};
