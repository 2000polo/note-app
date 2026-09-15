import { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import HomePage from './pages/HomePage'
import CreatePage from './pages/CreatePage'
import NoteDetailPage from './pages/NoteDetailPage'
import UpdatePage from './pages/UpdatePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import { fetchCurrentUser } from './store/authSlice'

function App() {
  const dispatch = useDispatch()
  const { isAuthenticated, isLoading } = useSelector((state) => state.auth)

  useEffect(() => {
    dispatch(fetchCurrentUser())
  }, [dispatch])

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner loading-lg" />
      </div>
    )
  }

  return (
    <Routes>
      <Route path='/login' element={isAuthenticated ? <Navigate to='/' replace /> : <LoginPage />} />
      <Route path='/register' element={isAuthenticated ? <Navigate to='/' replace /> : <RegisterPage />} />
      <Route path='/' element={isAuthenticated ? <HomePage /> : <Navigate to='/login' replace />} />
      <Route path='/create' element={isAuthenticated ? <CreatePage /> : <Navigate to='/login' replace />} />
      <Route path='/note/:id' element={isAuthenticated ? <NoteDetailPage /> : <Navigate to='/login' replace />} />
      <Route path='/note/update/:id' element={isAuthenticated ? <UpdatePage /> : <Navigate to='/login' replace />} />
    </Routes>
  )
}

export default App
