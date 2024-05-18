import { Credentials , User } from '../types/auth.types';
import { base } from './base';

export const registerUser = (data:User) => base.post('/register', data)

export const login = (credentials:Credentials) =>  base.post('/login', credentials)

export const logout = () => base.post('/logout')