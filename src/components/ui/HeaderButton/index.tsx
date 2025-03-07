import React, { MouseEventHandler } from 'react';
import classes from './HeaderButton.module.scss'

interface Props {
  text: string
  onClick?: MouseEventHandler<HTMLButtonElement>,
}

const HeaderButton: React.FC<Props> = ({ text, onClick }) => {
  return (
    <button 
      className={classes.myBtn}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default HeaderButton;