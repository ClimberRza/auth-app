import React, { MouseEventHandler } from 'react';
import classes from './MyButton.module.scss'

interface Props {
  text: string
  whereTo?: string
}

const MyButton: React.FC<Props> = ({text, whereTo}) => {
  return (
    <button 
      className={classes.myBtn}
    >
      {text}
    </button>
  );
};

export default MyButton;