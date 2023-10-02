import React from 'react';
import './login.scss';

export default function LoginPage() {
  return (
    <div className='login-wrapper p-3 my-5 d-flex flex-column w-50'>
      <ul className='nav-tabs nav'>
        <li class='nav-item'>
          <a
            class='nav-link active'
            aria-current='page'
            href='#logina'
            data-bs-toggle='tab'>
            Login
          </a>
        </li>
        <li class='nav-item'>
          <a
            class='nav-link'
            aria-current='page'
            href='#signup'
            data-bs-toggle='tab'>
            Sign Up
          </a>
        </li>
      </ul>
      <div class='tab-content'>
        <div class='tab-pane fade show active' id='logina'>
          <p>Login tab content ...</p>
        </div>
        <div class='tab-pane fade' id='signup'>
          <p>SignUp tab content ...</p>
        </div>
      </div>
    </div>
  );
}
