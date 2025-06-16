import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './screen/AuthScreen/Login';
import Register from './screen/AuthScreen/Register';
import ForgotPassword from './screen/AuthScreen/ForgotPassword';
import UserDetailsForm from './screen/UserDetailScreen/UserDetailsForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path='/user-details' element={<UserDetailsForm />} />
      </Routes>
    </Router>
  );
}

export default App;
