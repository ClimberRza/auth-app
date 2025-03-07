import React from 'react';
import classes from './MyInput.module.scss'

interface Props {
  title: string
  inputValue: string
  inputPlaceholder: string
  changeValue: React.Dispatch<React.SetStateAction<string>>
  hint?: string
}

const MyInput: React.FC<Props> = ({title, inputValue, inputPlaceholder, hint, changeValue}) => {
  return (
    <div className={classes.wrap}>
      <p className={classes.title}>{title}</p>
      <input
        className={classes.inp}
        onChange={(e) => changeValue(e.target.value)}
        placeholder={inputPlaceholder}
        value={inputValue}
      />
      {hint && <p className={classes.hint}>{hint}</p>}
    </div>
  );
};

export default MyInput;