import React from 'react';
import logo from '../images/logo.png';

const imgStyles = {
  'font-size': '40px',
  'font-weight': 'bold',
  'margin-left': '20px',
  'margin-top': '20px',
};

function Logo() {
  return (
    <a className='navbar-brand' href='/' style={imgStyles}>
      <img src={logo} width={70} height={70} alt='HSA' />
      HSA
    </a>
  );
}

export default Logo;
