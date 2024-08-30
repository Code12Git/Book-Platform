import React, { useState, useEffect } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './base/Navbar' 
import Request from './pages/Request';
import BookMatching from './pages/BookMatching';
import BookDiscovery from './pages/BookDiscovery';
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate()
  useEffect(() => {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!user && !!token);
  }, []);

   useEffect(() => {
        if (isLoggedIn) {
            navigate('/');
        }
    }, [isLoggedIn]);


  return (
    <React.Fragment>
      {isLoggedIn && <Navbar setIsLoggedIn={setIsLoggedIn} />}
      <Routes>
        {!isLoggedIn ? (
          <>
            <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Dashboard />} />
            <Route path='/discovery' element={<BookDiscovery />} />
            <Route path="/matching" element={<BookMatching />} />
            <Route path='/request' element={<Request />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        )}
      </Routes>
    </React.Fragment>
  );
}

export default App;
