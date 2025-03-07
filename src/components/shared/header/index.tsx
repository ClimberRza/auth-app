import React from 'react';
import { Link, useNavigate } from 'react-router'
import HeaderButton from '../../ui/HeaderButton';
import classes from './Header.module.scss'
import { appContext } from '../../../App'

const Header: React.FC = () => {
  const { isLoggedIn, setIsLoggedIn } = React.useContext(appContext)

  const handleLoguotClick = () => {
    setIsLoggedIn(false)
  }

  return (
    <header className={classes.header}>
      <Link to='/info'>
        <HeaderButton text='About us' />
      </Link>
      <Link to='/login'>
        <HeaderButton text='Sign in' />
      </Link>
      {isLoggedIn && (
        <Link to='/logout'>
          <HeaderButton 
            text='Sign out'
            onClick={handleLoguotClick}
          />
        </Link>
      )}
    </header>
  );
};

export default Header;