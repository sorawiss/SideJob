import './App.css'
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';


// Import Modules
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './ProtectedRoutes';


// Import Pages
import Welcome from './pages/welcome'
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';



function App() {

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path='/login' element = {<Login />} />
          <Route path='register' element = {<Register />} />
          <Route element = {<ProtectedRoute />}>
            <Route path='/home' element = {<Home />} />
          </Route>
        </Routes>
      </Router>
      </AuthProvider>
  )
}

export default App
