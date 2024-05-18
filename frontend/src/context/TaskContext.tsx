import { PropsWithChildren, createContext, useReducer } from 'react';
import { TaskActions, TaskState, initialState, taskReducer } from '../reducers/task-reducer';


type TaskContextProps = {
    state: TaskState
    dispatch: React.Dispatch<TaskActions>
}

export const TaskContext = createContext<TaskContextProps>(null!)

export const TaskProvider = ({ children }: PropsWithChildren) => {

    const [state, dispatch] = useReducer(taskReducer, initialState)



    return (
        <TaskContext.Provider value={{ state, dispatch }}>
            {children}
        </TaskContext.Provider>
    )
}