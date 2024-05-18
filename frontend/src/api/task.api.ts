
import { base } from './base';
import { Task } from '../types/types.task';



export const getAllTasks = () => base.get('/task');

export const createTask = (task:Task) => base.post('/task', task);

export const getTaskApi = (id:Task['id']) => base.get(`/task/${id}`);

export const updateTaskApi = (id:Task['id'], task:Task) => base.put(`/task/${id}`, task);

export const deleteTask = (id:Task['id']) => base.delete(`/task/${id}`)