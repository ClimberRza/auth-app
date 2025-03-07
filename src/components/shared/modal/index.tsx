import React from 'react';
import classes from './Modal.module.scss'
import MyButton from '../../ui/MyButton'

interface Props {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  isQuoteLoading: boolean
  isAuthorLoading: boolean
  setIsQuoteLoading: React.Dispatch<React.SetStateAction<boolean>>
  setIsAuthorLoading: React.Dispatch<React.SetStateAction<boolean>>
  controllerStack: AbortController[]
}

const Modal: React.FC<Props> = ({ 
  open,
  setOpen,
  isAuthorLoading,
  isQuoteLoading,
  setIsAuthorLoading,
  setIsQuoteLoading,
  controllerStack
}) => {
  const resultClasses = [classes.backdrop]

  const handleCancelClick = () => {
    controllerStack[0].abort()
    setIsAuthorLoading(false)
    setIsQuoteLoading(false)
    setOpen(false)
  }

  if (open) {
    resultClasses.push(classes.open)
  }

  return (
    <div
      className={resultClasses.join(' ')}
    >
      <div
        className={classes.modal}
      >
        <h1>Requesting the quote</h1>
        <div className="result">
          <p>Step 1: Requesting author... {!isAuthorLoading && 'Completed'}</p>
          <p>Step 2: Requesting quote... {!isQuoteLoading && 'Completed'}</p>
        </div>
        <MyButton 
          text='Cancel'
          onClick={handleCancelClick}
        />
      </div>
    </div>
  );
};

export default Modal;