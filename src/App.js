
/**
 * @overview
 * Här sköts routsen vart användaren skickas när sidan besöks
 * 
 * @author Viktor Johansson
 * @version 1.0.0
 * @since November, 2023
 */

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import Home from './pages/Home'
import Signin from './pages/Signin'
import Origin from './pages/Origin';
import Admin from './pages/Admin'

function App() {
  return (
    <Router>
        <Routes>
        <Route path="admin" element={<Admin />} />
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Signin />} />
          <Route path='/origin' exact element={<Origin />} />
        </Routes>
    </Router>
  );
}

export default App;
