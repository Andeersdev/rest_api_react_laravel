import { Link } from 'react-router-dom';
import Logout from './Logout';
import { useAuthContext } from '../hooks/useAuthContext';

export default function Navbar() {

    const { auth, user } = useAuthContext()
    return (
        <header className="flex flex-wrap sm:justify-start sm:flex-nowrap w-full bg-white text-sm py-4 dark:bg-neutral-800">
            <nav className="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between" aria-label="Global">
                <a className="flex-none text-xl font-semibold dark:text-white" href="#">Task Manager</a>
                <div className="flex flex-row items-center gap-5 mt-5 sm:justify-end sm:mt-0 sm:ps-5">
                    {
                        auth ? (
                            <>
                                <a className="font-medium text-gray-600 hover:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500">Welcome {user?.name}</a>
                                <Link className="font-medium text-blue-500" to="/task" aria-current="page">Tasks</Link>
                                <Logout />
                            </>
                        ) : (
                            <>
                                <Link className="font-medium text-gray-600 hover:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500" to="/login">Sign in</Link>
                                <Link className="font-medium text-gray-600 hover:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500" to="/register">Sign up</Link>
                            </>
                        )
                    }
                </div>
            </nav>
        </header>
    )
}
