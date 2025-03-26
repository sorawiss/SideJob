import './App.css'
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider, } from '@tanstack/react-query'


// Import Modules
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './ProtectedRoutes';


// Import Pages
import Welcome from './pages/Welcome'
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';



const queryClient = new QueryClient()


function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path='/login' element={<Login />} />
            <Route path='register' element={<Register />} />
            <Route element={<ProtectedRoute />}>
              <Route path='/home' element={<Home />} />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
      )
}

      export default App
