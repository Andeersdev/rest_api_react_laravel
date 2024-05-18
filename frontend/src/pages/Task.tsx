
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useTaskContext } from '../hooks/useTaskContext';
import { getAllTasks } from '../api/task.api'
import CardTask from '../components/Card';

export default function Task() {
    const { state, dispatch } = useTaskContext()

    // get all task 
    useEffect(() => {
        async function getTasks() {
            try {
                const response = await getAllTasks()
                dispatch({ type: 'all-task', payload: { tasks: response.data } })
            } catch (error) {
                console.log(error);
            }
        }
        getTasks()
    }, [])
    return (
        <>
            <div className="m-16">
                <h1 className="text-white text-2xl font-black mb-10">Tasks</h1>
                <Link to='/task-create' className="bg-blue-500 hover:bg-blue-600 text-white text-sm p-1.5 rounded">New Task <i className="fa-solid fa-plus"></i></Link>
                {
                    state.loading
                        ? (<CardTask tasks={state.tasks} />)
                        : <p className='text-center text-white'>Loading Task...</p>
                }
            </div>
        </>
    )
}
