import { Link } from 'react-router-dom';
import type { Task } from '../types/types.task';
import { deleteTask } from '../api/task.api';
import { useTaskContext } from '../hooks/useTaskContext';

type TaskProps = {
    tasks: Task[]
}

export default function Card({ tasks }: TaskProps) {

    const { dispatch } = useTaskContext()

    const removeTask = async (id: Task['id']) => {
        const confirmation = confirm('Are you sure delete this ?')
        if (confirmation) {
            try {
                await deleteTask(id)
                dispatch({ type: 'delete-task', payload: { id } })
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <>
            <div className="grid grid-cols-3 gap-5 mt-10">
                {
                    tasks.length > 0 ?
                        tasks.map(task => (
                            <div key={task.id} className="flex bg-white border w-96 shadow-sm rounded-xl p-4 md:p-10 dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70">
                                <div className='flex-grow'>
                                    <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                                        {task.title}
                                    </h3>
                                    <p className="mt-2 text-gray-500 dark:text-neutral-400">
                                        {task.description}
                                    </p>
                                </div>
                                <div className='flex-grow'>
                                    <Link
                                        to={`/task-edit/${task.id}`}
                                        className="bg-green-500 hover:bg-green-600 text-white p-2 text-sm rounded mx-1">
                                        <i className="fa-regular fa-pen-to-square text-white mx-1"></i>
                                    </Link>
                                    <button
                                        onClick={() => removeTask(task.id)}
                                        className="bg-red-500 hover:bg-red-600 text-white p-2 text-sm rounded">
                                        <i className="fa-solid fa-xmark text-white mx-1"></i>
                                    </button>
                                </div>
                            </div>
                        ))
                        : <p className='text-white text-center'>No hay data</p>
                }
            </div>
        </>

    )
}
