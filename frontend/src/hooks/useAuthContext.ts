import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export const useAuthContext = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('Error, debe usar el contexto dentro de AuthProvider.')
    }
    return context
}