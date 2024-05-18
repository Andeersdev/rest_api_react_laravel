import { useNavigate } from 'react-router-dom';
import { logout } from '../api/auth.api';
import { useAuthContext } from '../hooks/useAuthContext';

export default function Logout() {

    const { setAuth, setUser } = useAuthContext()
    const navigate = useNavigate()

    const handleClick = async () => {
        try {
            const response = await logout()
            if (response.data) {
                setAuth(false)
                setUser(null)
                localStorage.removeItem('access_token')
                localStorage.removeItem('user')
                navigate('/login')
            }
        } catch (error) {
            console.log(error);
        }

    }

    return (
        <button
            className="font-medium text-gray-600 hover:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500"
            onClick={handleClick}>
            Logout
        </button>
    )
}
