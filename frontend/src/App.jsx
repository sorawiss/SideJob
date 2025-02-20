import './App.css'
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';


// Import Pages
import Welcome from './pages/welcome'



function App() {

  return (
      <Router>
        <Routes>
          <Route path="/" element={<Welcome />} />
        </Routes>
      </Router>
  )
}

export default App
