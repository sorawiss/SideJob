import './App.css'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider, } from '@tanstack/react-query'


// Import Modules
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './ProtectedRoutes';


// Import Pages
import Welcome from './pages/Welcome'
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import InPost from './pages/InPost';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';
import Post from './components/Post';




const queryClient = new QueryClient()


function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/home" element={<Home />}>
                <Route index element={<Navigate to="find" />} />
                <Route path="find" element={<Post isJob={true} />} />
                <Route path="hire" element={<Post isJob={false} />} />
              </Route>
              <Route path="/home/profile/:id" element={<Profile />} />
              <Route path="post/:id" element={<InPost />} />
              <Route path="editProfile/:id" element={<EditProfile />} />
            "
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App
