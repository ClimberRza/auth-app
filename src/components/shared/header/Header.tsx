import React from 'react';
import { Link } from 'react-router'
import HeaderButton from '../../ui/HeaderButton/HeaderButton';
import classes from './Header.module.scss'
import { appContext } from '../../../App'

const Header: React.FC = () => {
  const { isLoggedIn, setIsLoggedIn } = React.useContext(appContext)



  return (
    <header className={classes.header}>
      <Link to='/info'>
        <HeaderButton text='About us' />
      </Link>
      <Link to='/login'>
        <HeaderButton text='Sign in' />
      </Link>
      {isLoggedIn && (
        <Link to='/info'>
          <HeaderButton 
            text='Sign out'
            onClick={() => {
              setIsLoggedIn(false)
              sessionStorage.removeItem('userToken')
            }}
          />
        </Link>
      )}
    </header>
  );
};

export default Header;