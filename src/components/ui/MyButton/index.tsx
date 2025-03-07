import React, { MouseEventHandler } from 'react';
import classes from './MyButton.module.scss'

interface Props {
  text: string
  onClick?: MouseEventHandler<HTMLButtonElement>,
  style?: Object
}

const MyButton: React.FC<Props> = ({ text, onClick, style }) => {
  return (
    <button
      className={classes.btn}
      onClick={onClick}
      style={style}
    >
      {text}
    </button>
  );
};

export default MyButton;