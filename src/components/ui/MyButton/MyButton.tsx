import React from 'react';
import classes from './MyButton.module.scss'

interface Props {
  text: string
}

const MyButton: React.FC<Props> = ({text}) => {
  return (
    <button 
      className={classes.myBtn}
    >
      {text}
    </button>
  );
};

export default MyButton;