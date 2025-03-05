import React from 'react';
import { Link } from 'react-router'
import MyButton from '../../ui/MyButton/MyButton'

const Header: React.FC = () => {
  return (
    <header>
      <Link to='/'>
        <MyButton text='About us' />
      </Link>
      <Link to='/login'>
        <MyButton text='Sign in' />
      </Link>
    </header>
  );
};

export default Header;