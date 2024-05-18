
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import type { User } from '../types/auth.types';
import { registerUser } from '../api/auth.api';
import { useState } from 'react';
import ErrorAlert from '../components/ErrorAlert';

export default function User() {

    const { register, handleSubmit, formState: { errors }, watch } = useForm<User>()
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const onSubmit: SubmitHandler<User> = async (data) => {
        try {
            await registerUser(data)
            navigate('/login')
        } catch (e) {
            setError(e.response.data.message)

        }
    }
    return (
        <div className='border-2 rounded-md border-zinc-900 w-1/4 mx-auto mt-20 p-4'>
            <h3 className='text-zinc-600 text-center text-2xl font-bold'>Sign up</h3>
            {
                error && <ErrorAlert message={error} />
            }
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='grid grid-cols-1 mb-3'>
                    <label className='text-white font-bold mb-3' htmlFor="name">Name:</label>
                    <input
                        className='bg-zinc-900 rounded p-2 text-white'
                        {...register('name', {
                            required: {
                                value: true,
                                message: 'Name is required.'
                            },
                            minLength: {
                                value: 5,
                                message: 'Enter min 5 characters.'
                            }
                        })}
                    />
                    {errors.name && <small className='text-red-500 font-bold'>{errors.name.message}</small>}
                </div>
                <div className='grid grid-cols-1 mb-3'>
                    <label className='text-white font-bold mb-3' htmlFor="email">Email:</label>
                    <input
                        className='bg-zinc-900 rounded p-2 text-white'
                        {...register('email', {
                            required: {
                                value: true,
                                message: 'Email is required.'
                            },
                            pattern: {
                                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                message: 'Email is invalid'
                            }
                        })}
                    />
                    {errors.email && <small className='text-red-500 font-bold'>{errors.email.message}</small>}
                </div>
                <div className='grid grid-cols-1 mb-3'>
                    <label className='text-white font-bold mb-3' htmlFor="password">Password:</label>
                    <input
                        type='password'
                        className='bg-zinc-900 rounded p-2 text-white'
                        {...register('password', {
                            required: {
                                value: true,
                                message: 'Password is required.'
                            }
                        })}
                    />
                    {errors.password && <small className='text-red-500 font-bold'>{errors.password.message}</small>}
                </div>
                <div className='grid grid-cols-1 mb-3'>
                    <label className='text-white font-bold mb-3' htmlFor="password">Password Confirmation:</label>
                    <input
                        type='password'
                        className='bg-zinc-900 rounded p-2 text-white'
                        {...register('password_confirmation', {
                            required: {
                                value: true,
                                message: 'Password Confirmation is required.'
                            },
                            validate: value => {
                                return value === watch('password') || 'Password do not match'
                            }
                        })}
                    />
                    {errors.password_confirmation && <small className='text-red-500 font-bold'>{errors.password_confirmation.message}</small>}
                </div>
                <div className='grid'>
                    <button className='bg-blue-500 rounded text-white p-2 hover:bg-blue-700'>Register</button>
                </div>
            </form>
        </div>
    )
}
