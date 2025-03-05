import React, { MouseEventHandler } from 'react';
import MyInput from '../../components/ui/MyInput/MyInput'
import classes from './LoginPage.module.scss'
import { postUserData } from '../../api/postUserData/postUserData'

const LoginPage: React.FC = () => {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  const handleSubmit: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault()
    const response = await postUserData({ email, password })
  }

  return (
    <div>
      <form className={classes.userForm}>
        <MyInput 
          inputPlaceholder='Enter email'
          title='Email address'
          inputValue={email}
          hint="We'll never share your email with anyone else."
          changeValue={setEmail}
        />
        <MyInput 
          inputPlaceholder='Password'
          title='Password'
          inputValue={password}
          changeValue={setPassword}
        />
        <button 
          className={classes.btn}
          onClick={handleSubmit}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default LoginPage;