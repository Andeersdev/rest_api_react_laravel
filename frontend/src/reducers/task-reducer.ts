
import { Task } from '../types/types.task';

export type TaskActions = 
{type: 'all-task', payload: {tasks:Task[]}} |
{type: 'add-task', payload:{task:Task}} |
{type: 'delete-task', payload: {id:Task['id']}}



export type TaskState = {
    tasks: Task[]
    loading: boolean
}

export const initialState: TaskState = {
    tasks: [],
    loading: false
}



export const taskReducer = (state:TaskState, actions:TaskActions) => {

    if (actions.type === 'all-task') {
        
        return {
            ...state,
            tasks: actions.payload.tasks,
            loading: true
        }
    }

    if(actions.type === 'add-task'){
        return {
            ...state,
            tasks: [...state.tasks, actions.payload.task]
        }
    }

    if (actions.type === 'delete-task') {
        const tasks = state.tasks.filter(task => task.id !== actions.payload.id)
        return {
            ...state,
            tasks
        }
    }

    return state
}