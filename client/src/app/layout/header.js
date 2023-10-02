import React from 'react';
import Logo from './logo';
import { Link } from 'react-router-dom';
import { FaSearchLocation } from 'react-icons/fa';
function Header() {
  return (
    <div className='header'>
      <div className='container-fluid'>
        <nav className='navbar navbar-expand-lg fs-3'>
          <Logo />
          <div className='container-fluid d-flex justify-content-center'>
            <div id='navbarNav'>
              <ul className='navbar-nav'>
                <li className='nav-item'>
                  <Link
                    className='nav-link active'
                    aria-current='page'
                    to='/men'>
                    Men
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link className='nav-link' to='/women'>
                    Women
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link className='nav-link' to='/aboutUs'>
                    About us
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <button type='button' className='btn btn-secondary  text-nowrap '>
            Select City
          </button>
          <a
            className='btn btn-secondary'
            href='login'
            style={{ marginLeft: '10px' }}>
            Login
          </a>
        </nav>
      </div>
    </div>
  );
}

export default Header;
