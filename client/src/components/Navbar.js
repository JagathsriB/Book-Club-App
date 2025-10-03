import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import { resetBooks } from '../features/books/bookSlice';

const Navbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogout = () => {
    dispatch(logout());
    dispatch(resetBooks());
    navigate('/login');
  }; // <-- The 'onLogout' function definition ends here. Notice there's no brace closing the entire component.

  const authLinks = (
    <>
      <span className="navbar-text me-3">Welcome, {user?.username}!</span>
      <li className="nav-item"><Link className="nav-link" to="/my-collection">My Collection</Link></li>
      <li className="nav-item"><Link className="nav-link" to="/add-book">Add Book</Link></li>
      <li className="nav-item"><button onClick={onLogout} className="btn btn-outline-light btn-sm">Logout</button></li>
    </>
  );

  const guestLinks = (
    <>
      <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
      <li className="nav-item"><Link className="nav-link" to="/register">Register</Link></li>
    </>
  );

  // The main return statement for the Navbar component's JSX
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold" to="/">The Book Club</Link>
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
                <Link className="nav-link" to="/community">Community Reviews</Link>
            </li>
        </ul>
        <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
          {isAuthenticated ? authLinks : guestLinks}
        </ul>
      </div>
    </nav>
  );
}; // <-- This is the correct closing brace for the entire 'Navbar' component

export default Navbar;