import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Credentials } from '../types/auth.types';
import { useAuthContext } from '../hooks/useAuthContext';
import { login } from '../api/auth.api';
import { useState } from 'react';
import ErrorAlert from '../components/ErrorAlert';


export default function Login() {

    const { register, handleSubmit, formState: { errors } } = useForm<Credentials>()
    const { setAuth, setUser } = useAuthContext()
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const onSubmit: SubmitHandler<Credentials> = async (data) => {
        try {
            const response = await login(data)
            const { access_token } = response.data
            if (access_token) {
                const { user } = response.data
                localStorage.setItem('access_token', access_token)
                setAuth(true)
                setUser({
                    name: user.name,
                    email: user.email
                })
                localStorage.setItem('user', JSON.stringify(user))
                navigate('/task')
            }
        } catch (e) {
            setError(e.response.data.message);
        }
    }
    return (
        <div className="container mx-auto mt-40">
            <div className="bg-white border rounded-xl shadow-sm w-1/2 mx-auto sm:flex dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70">
                {error && <ErrorAlert message={error} />}
                <div className="flex-shrink-0 relative w-full rounded-t-xl overflow-hidden pt-[20%] sm:rounded-s-xl sm:max-w-40 md:rounded-se-none md:max-w-xs">
                    <img className="size-full absolute top-0 start-0 object-cover" src="https://images.unsplash.com/photo-1680868543815-b8666dba60f7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2532&q=80" alt="Image Description" />
                </div>
                <div className="flex flex-wrap flex-grow">
                    <div className="p-4 flex flex-col w-full md:w-full sm:p-7"> {/* Aquí establece w-full y md:w-1/2 para que ocupe todo el ancho en pantallas pequeñas y la mitad del ancho en pantallas medianas y grandes */}
                        <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                            Sign in
                        </h3>
                        <div className="mt-1 text-gray-500 dark:text-neutral-400">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="grid grid-cols-1 mb-3">
                                    <label className="text-white font-bold text-sm mb-3" htmlFor="">Email</label>
                                    <input
                                        type="email"
                                        className="py-2 px-3 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                                        {...register('email', {
                                            required: {
                                                value: true,
                                                message: 'Email is required.'
                                            }
                                        })}
                                    />
                                </div>
                                {errors.email && <small className='text-red-500 font-bold'>{errors.email.message}</small>}
                                <div className="grid grid-cols-1 mb-3">
                                    <label className="text-white font-bold text-sm mb-3" htmlFor="">Password</label>
                                    <input
                                        type='password'
                                        className="py-2 px-3 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                                        {...register('password', {
                                            required: {
                                                value: true,
                                                message: 'Password is required.'
                                            }
                                        })}
                                    />
                                    {errors.password && <small className='text-red-500 font-bold'>{errors.password.message}</small>}
                                </div>
                                <div className="grid grid-cols-1 mt-5">
                                    <button className="bg-blue-500 hover:bg-blue-700 text-white rounded text-sm p-2">Login</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
