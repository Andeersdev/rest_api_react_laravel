import { useContext } from 'react';
import { TaskContext } from '../context/TaskContext';

export const useTaskContext = () => {

    const context = useContext(TaskContext)
    if (!context) {
        throw new Error('Error, context tiene que estar dentro de un provider')
    }
    return context
}