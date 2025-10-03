// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CommunityReviews from './pages/CommunityReviews'; // Import new page
import MyCollection from './pages/MyCollection';
import AddBookForm from './pages/AddBookForm';

function App() {
  return (
    <Router>
      <Navbar />
      <main className="container mt-4 pb-5">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} /> {/* Always show HomePage */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/community" element={<CommunityReviews />} /> {/* New community route */}

          {/* Private Routes */}
          <Route element={<PrivateRoute />}>
            <Route path="/my-collection" element={<MyCollection />} />
            <Route path="/add-book" element={<AddBookForm />} />
          </Route>
        </Routes>
      </main>
    </Router>
  );
}

export default App;