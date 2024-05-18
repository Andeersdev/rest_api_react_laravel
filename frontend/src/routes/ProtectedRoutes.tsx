
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';

export default function ProtectedRoutes() {

    const { auth } = useAuthContext()

    return !auth ? <Navigate to='/login' /> : <Outlet />


}
