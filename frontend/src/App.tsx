
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Task from './pages/Task';
import Form from './pages/Form';
import { TaskProvider } from './context/TaskContext';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoutes from './routes/ProtectedRoutes';
import Navbar from './components/Navbar';
import User from './pages/User';
import { useAuthContext } from './hooks/useAuthContext';

function App() {

  function RedirectIfLoggedIn() {
    const { auth } = useAuthContext()

    return auth ? <Navigate to="/task" /> : <Login />;
  }

  return (
    <AuthProvider>
      <TaskProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/login" element={<RedirectIfLoggedIn />} />
            <Route path='/register' element={<User />} />
            <Route element={<ProtectedRoutes />}>
              <Route path='/logout' />
              <Route path='/task' element={<Task />} />
              <Route path='/task-create' element={<Form />} />
              <Route path='/task-edit/:id' element={<Form />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </TaskProvider>
    </AuthProvider>
  )

}

export default App
