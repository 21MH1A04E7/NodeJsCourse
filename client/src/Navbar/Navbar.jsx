import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
      <div className='box'>
        <div className='box1'>Voting App</div>
        <div className='box2'>
          <ul className='nav-items'>
            <li>
              <Link to='/home'>Home</Link>
            </li>
            <li>
              <Link to='/about'>About</Link>
            </li>
            <li>
              <Link to='/singup'>Signup</Link>
            </li>
            <li>
              <Link to='/login'>Login</Link>
            </li>
          </ul>
        </div>
      </div>
  );
};

export default Navbar;
