import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { Task } from '../types/types.task';
import { createTask, getTaskApi, updateTaskApi } from '../api/task.api';

export default function Form() {

    const { register, handleSubmit, formState: { errors }, setValue } = useForm<Task>()
    const navigate = useNavigate()
    // edit
    const { id } = useParams()
    // add task
    const onSubmit: SubmitHandler<Task> = async (data) => {
        if (!id) {
            try {
                await createTask(data)
            } catch (error) {
                console.log(error);
            }
        } else {
            try {
                await updateTaskApi(Number(id), data)
            } catch (error) {
                console.log(error);
            }

        }
        navigate('/task')
    }

    useEffect(() => {

        async function getTask() {
            if (id) {
                const response = await getTaskApi(Number(id))
                const task: Task = response.data
                if (task) {
                    setValue('title', task.title)
                    setValue('description', task.description)
                }
            }
        }
        getTask()
    }, [id])

    return (
        <>
            <div className="w-1/4 mx-auto mt-20 border-2 border-zinc-900 rounded-lg p-10">
                <h4 className='text-white font-bold text-center text-xl mt-5'>{id ? 'Edit Task' : 'Create Task'}</h4>
                <form onSubmit={handleSubmit(onSubmit)} className='mt-5'>
                    <div className="grid grid-cols-1 mb-3">
                        <label className="text-white font-bold text-sm mb-3" htmlFor="">Title</label>
                        <input
                            className="py-2 px-3 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                            id="title"
                            {...register('title', {
                                required: {
                                    value: true,
                                    message: 'Title is required.'
                                },
                                minLength: {
                                    value: 5,
                                    message: 'Title required min 5 characters.'
                                }
                            })}
                        />
                        {errors.title && <small className='text-red-500 font-bold'>{errors.title.message}</small>}
                    </div>
                    <div className="grid grid-cols-1 mb-3">
                        <label className="text-white font-bold text-sm mb-3" htmlFor="">Description</label>
                        <input
                            className="py-2 px-3 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                            id="description"
                            {...register('description', {
                                required: {
                                    value: true,
                                    message: 'Description is required.'
                                },
                                minLength: {
                                    value: 5,
                                    message: 'Description required min 5 characters.'
                                }
                            })}
                        />
                        {errors.description && <small className='text-red-500 font-bold'>{errors.description.message}</small>}
                    </div>
                    <div className="grid grid-cols-1 mt-5">
                        <button className={`${id ? 'bg-teal-500 hover:bg-teal-800' : 'bg-blue-500 hover:bg-blue-900'} text-white rounded text-sm p-2`}>{id ? 'Update' : 'Save'}Task</button>
                    </div>
                </form>
            </div>
        </>
    )
}
