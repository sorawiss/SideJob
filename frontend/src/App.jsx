import './App.css'
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';


// Import Pages
import Welcome from './pages/welcome'
import Login from './pages/Login';
import Register from './pages/Register';



function App() {

  return (
      <Router>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path='/login' element = {<Login />} />
          <Route path='register' element = {<Register />} />
        </Routes>
      </Router>
  )
}

export default App
